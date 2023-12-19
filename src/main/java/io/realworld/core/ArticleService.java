package io.realworld.core;

import com.google.common.collect.Sets;
import io.realworld.api.request.NewArticleDto;
import io.realworld.api.request.UpdatedArticleDto;
import io.realworld.api.response.ArticleDto;
import io.realworld.api.response.ArticleListDto;
import io.realworld.api.response.ProfileDto;
import io.realworld.core.model.Article;
import io.realworld.core.model.ArticleIdTag;
import io.realworld.core.model.Profile;
import io.realworld.db.ArticleRepository;
import io.realworld.db.CommentRepository;
import io.realworld.db.TagRepository;
import io.realworld.db.UserRepository;
import io.realworld.exceptions.ApplicationException;
import org.jdbi.v3.sqlobject.transaction.Transaction;

import java.util.*;

import static io.realworld.exceptions.ErrorCode.FORBIDDEN;
import static io.realworld.exceptions.ErrorCode.NOT_FOUND;
import static java.util.Collections.emptyList;
import static java.util.Collections.emptySet;
import static java.util.stream.Collectors.toSet;

public class ArticleService {
    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final TagRepository tagRepository;

    public ArticleService(final ArticleRepository articleRepository,
                          final UserRepository userRepository,
                          final CommentRepository commentRepository, final TagRepository tagRepository) {
        this.articleRepository = articleRepository;
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
        this.tagRepository = tagRepository;
    }

    public ArticleDto findBySlug(final String username, final String slug) {
        final Article article = articleRepository.findArticle(slug);
        if (article == null) {
            throw new ApplicationException(NOT_FOUND, "Article [" + slug + "] not found");
        }
        final List<ArticleIdTag> articlesTags = tagRepository.findArticlesTags(Set.of(article.id()));
        final Set<Long> favoriteArticles = articleRepository.findFavoriteArticles(username, Set.of(article.id()));
        final Set<String> followedAuthors = userRepository.findFollowedAuthorUsernames(Set.of(article.author().username()), username);

        return toDto(article, favoriteArticles, articlesTags, followedAuthors);
    }

    @Transaction
    public ArticleDto createArticle(final String username, final NewArticleDto newArticle) {
        final Long authorId = userRepository.findUserIdByUsername(username);
        final Long articleId = articleRepository.saveArticle(authorId,
                generateSlug(newArticle.title()),
                newArticle.title(),
                newArticle.description(),
                newArticle.body());

        if (newArticle.tagList() != null) {
            updateArticleTags(articleId, newArticle.tagList());
        }

        return findFullDetailsArticle(username, articleId);
    }

    @Transaction
    public ArticleDto updateArticle(final String username, final String slug, final UpdatedArticleDto update) {
        final var old = findArticle(slug);
        final Long articleId = old.id();

        if (!Objects.equals(old.author().username(), username)) {
            throw new ApplicationException(FORBIDDEN, "User is not allowed to update article [" + slug + "]");
        }

        articleRepository.updateArticle(articleId,
                update.title() != null && !Objects.equals(update.title(), old.title()) ? generateSlug(update.title()) : old.slug(),
                update.title() != null ? update.title() : old.title(),
                update.description() != null ? update.description() : old.description(),
                update.body() != null ? update.body() : old.body());


        if (update.tagList() != null) {
            tagRepository.deleteArticleTags(articleId);
            updateArticleTags(articleId, update.tagList());
        }

        return findFullDetailsArticle(username, articleId);
    }

    @Transaction
    public void deleteArticle(final String slug) {
        tagRepository.deleteArticleTags(slug);
        commentRepository.deleteArticleComments(slug);
        articleRepository.deleteArticle(slug);
    }

    @Transaction
    public ArticleDto addArticleToFavourites(final String username, final String slug) {
        final Long userId = userRepository.findUserIdByUsername(username);
        final Long articleId = findArticleId(slug);

        articleRepository.addToFavorites(userId, articleId);
        articleRepository.incrementFavoritesCount(articleId);
        return findFullDetailsArticle(username, articleId);
    }

    @Transaction
    public ArticleDto removeArticleFromFavourites(final String username, final String slug) {
        final Long userId = userRepository.findUserIdByUsername(username);
        final Long articleId = findArticleId(slug);

        articleRepository.removeFromFavorites(userId, articleId);
        articleRepository.decrementFavoritesCount(articleId);
        return findFullDetailsArticle(username, articleId);
    }

    public ArticleListDto findFeed(final String username, final int offset, final int limit) {
        final int count = articleRepository.countFeedSize(username);
        final List<Article> articles = articleRepository.findArticlesOfAuthors(username, offset, limit);
        return articleList(articles, count, username);
    }

    public ArticleListDto findArticles(final String username,
                                       final String author,
                                       final String tag,
                                       final String favorite,
                                       final Integer offset,
                                       final int limit) {
        final Long favoriteBy = favorite != null ? userRepository.findUserIdByUsername(favorite) : null;
        final int count = articleRepository.countArticles(author, tag, favoriteBy);
        final List<Article> articles = articleRepository.findArticles(author, tag, favoriteBy, offset, limit);
        return articleList(articles, count, username);
    }

    private ArticleDto findFullDetailsArticle(final String username, final Long articleId) {
        final Article article = articleRepository.findArticleById(articleId);
        if (article == null) {
            throw new ApplicationException(NOT_FOUND, "Article [" + articleId + "] not found");
        }
        final List<ArticleIdTag> articlesTags = tagRepository.findArticlesTags(Set.of(article.id()));
        final Set<Long> favoriteArticles = articleRepository.findFavoriteArticles(username, Set.of(article.id()));
        final Set<String> followedAuthors = userRepository.findFollowedAuthorUsernames(Set.of(article.author().username()), username);

        return toDto(article, favoriteArticles, articlesTags, followedAuthors);
    }


    private Article findArticle(final String slug) {
        final Article article = articleRepository.findArticle(slug);
        if (article == null) {
            throw new ApplicationException(NOT_FOUND, "Article [" + slug + "] not found");
        }
        return article;
    }

    private Long findArticleId(final String slug) {
        final Long articleId = articleRepository.findArticleIdBySlug(slug);
        if (articleId == null) {
            throw new ApplicationException(NOT_FOUND, "Article [" + slug + "] not found");
        }
        return articleId;
    }

    private void updateArticleTags(final long articleId, final Set<String> tags) {
        final Set<String> existingTags = tagRepository.findTags(tags);
        final Set<String> missingTags = Sets.difference(tags, existingTags);
        tagRepository.saveTags(missingTags);
        tagRepository.addTagsToArticle(Collections.nCopies(tags.size(), articleId), tags);
    }

    private ArticleListDto articleList(final List<Article> articles, final int count, String username) {
        final Set<Long> articleIds = articles.stream().map(Article::id).collect(toSet());
        final Set<String> authors = articles.stream().map(e -> e.author().username()).collect(toSet());
        final List<ArticleIdTag> articlesTags = !articleIds.isEmpty() ? tagRepository.findArticlesTags(articleIds) : emptyList();
        final Set<Long> favoriteArticles = !articleIds.isEmpty() ? articleRepository.findFavoriteArticles(username, articleIds) : emptySet();
        final Set<String> followedAuthors = !authors.isEmpty() ? userRepository.findFollowedAuthorUsernames(authors, username) : emptySet();

        final var articleList = articles.stream()
                .map(article -> toDto(article, favoriteArticles, articlesTags, followedAuthors))
                .toList();

        return new ArticleListDto(articleList, count);
    }

    private String generateSlug(final String title) {
        final String slug = title.strip()
                .replaceAll("[^\\p{IsAlphabetic}^\\p{IsDigit}]+", "-")
                .toLowerCase();

        return isSlugUnique(slug) ? slug : UUID.randomUUID().toString();
    }

    private boolean isSlugUnique(final String slug) {
        return articleRepository.findArticleIdBySlug(slug) == null;
    }


    private ArticleDto toDto(Article article,
                             Set<Long> favoriteArticles,
                             List<ArticleIdTag> articlesTags,
                             Set<String> followedAuthors) {
        return new ArticleDto(article.slug(),
                article.title(),
                article.description(),
                article.body(),
                favoriteArticles.contains(article.id()),
                article.favoritesCount(),
                article.createdAt(),
                article.updatedAt(),
                articlesTags.stream().map(ArticleIdTag::tag).collect(toSet()),
                toDto(article.author(), followedAuthors.contains(article.author().username())));
    }

    private ProfileDto toDto(Profile profile, Boolean following) {
        return new ProfileDto(profile.username(),
                profile.bio(),
                profile.image(),
                following);
    }

}
