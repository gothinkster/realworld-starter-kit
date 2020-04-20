package io.realworld.core;

import com.google.common.collect.Sets;
import io.realworld.api.request.NewArticle;
import io.realworld.api.request.UpdatedArticle;
import io.realworld.api.response.Article;
import io.realworld.api.response.ArticleList;
import io.realworld.db.ArticleRepository;
import io.realworld.db.CommentRepository;
import io.realworld.db.TagRepository;
import io.realworld.db.UserRepository;
import io.realworld.db.mapper.ArticleTagsMapper;
import io.realworld.exceptions.ApplicationException;
import org.jdbi.v3.sqlobject.transaction.Transaction;

import java.util.*;

import static io.realworld.exceptions.ErrorCode.FORBIDDEN;
import static io.realworld.exceptions.ErrorCode.NOT_FOUND;
import static java.util.stream.Collectors.*;

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

    public Article findBySlug(final String username, final String slug) {
        final Article article = articleRepository.findArticle(slug);
        fillAdditionalData(List.of(article), username);
        return article;
    }

    @Transaction
    public Article createArticle(final String username, final NewArticle newArticle) {
        final Long authorId = userRepository.findUserIdByUsername(username);
        final Long articleId = articleRepository.saveArticle(authorId,
                generateSlug(newArticle.getTitle()),
                newArticle.getTitle(),
                newArticle.getDescription(),
                newArticle.getBody());

        if (newArticle.getTagList() != null) {
            updateArticleTags(articleId, newArticle.getTagList());
        }

        return findFullDetailsArticle(username, articleId);
    }

    @Transaction
    public Article updateArticle(final String username, final String slug, final UpdatedArticle update) {
        final Article old = findArticle(slug);
        final Long articleId = old.getId();

        if (!Objects.equals(old.getAuthor().getUsername(), username)) {
            throw new ApplicationException(FORBIDDEN, "User is not allowed to update article [" + slug + "]");
        }

        articleRepository.updateArticle(articleId,
                update.getTitle() != null && !Objects.equals(update.getTitle(), old.getTitle()) ? generateSlug(update.getTitle()) : old.getSlug(),
                update.getTitle() != null ? update.getTitle() : old.getTitle(),
                update.getDescription() != null ? update.getDescription() : old.getDescription(),
                update.getBody() != null ? update.getBody() : old.getBody());


        if (update.getTagList() != null) {
            tagRepository.deleteArticleTags(articleId);
            updateArticleTags(articleId, update.getTagList());
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
    public Article addArticleToFavourites(final String username, final String slug) {
        final Long userId = userRepository.findUserIdByUsername(username);
        final Long articleId = findArticleId(slug);

        articleRepository.addToFavorites(userId, articleId);
        articleRepository.incrementFavoritesCount(articleId);
        return findFullDetailsArticle(username, articleId);
    }

    @Transaction
    public Article removeArticleFromFavourites(final String username, final String slug) {
        final Long userId = userRepository.findUserIdByUsername(username);
        final Long articleId = findArticleId(slug);

        articleRepository.removeFromFavorites(userId, articleId);
        articleRepository.decrementFavoritesCount(articleId);
        return findFullDetailsArticle(username, articleId);
    }

    public ArticleList findFeed(final String username, final int offset, final int limit) {
        final int count = articleRepository.countFeedSize(username);
        final List<Article> articles = articleRepository.findArticlesOfAuthors(username, offset, limit);
        fillAdditionalData(articles, username);
        return articleList(articles, count);
    }

    public ArticleList findArticles(final String username,
                                    final String author,
                                    final String tag,
                                    final String favorited,
                                    final Integer offset,
                                    final int limit) {
        final Long favoritedBy = favorited != null ? userRepository.findUserIdByUsername(favorited) : null;
        final int count = articleRepository.countArticles(author, tag, favoritedBy);
        final List<Article> articles = articleRepository.findArticles(author, tag, favoritedBy, offset, limit);
        fillAdditionalData(articles, username);
        return articleList(articles, count);
    }

    private Article findFullDetailsArticle(final String username, final Long articleId) {
        final Article article = articleRepository.findArticleById(articleId);
        fillAdditionalData(List.of(article), username);
        return article;
    }

    private void fillAdditionalData(final List<Article> articleList, final String username) {
        final Set<Long> articleIds = articleList.stream().map(Article::getId).collect(toSet());
        final Set<String> authors = articleList.stream().map(e -> e.getAuthor().getUsername()).collect(toSet());
        fillTags(articleList, articleIds);
        fillFavoritesFlags(articleList, username, articleIds);
        fillFollowing(articleList, username, authors);
    }

    private void fillFollowing(final List<Article> articleList, final String username, final Set<String> authors) {
        if (username != null && authors != null && !authors.isEmpty()) {
            final Set<String> usernames = userRepository.findFollowedAuthorUsernames(authors, username);
            for (final Article article : articleList) {
                article.getAuthor().setFollowing(usernames.contains(article.getAuthor().getUsername()));
            }
        }
    }

    private void fillFavoritesFlags(final List<Article> articleList, final String username, final Set<Long> articleIds) {
        if (username != null && articleIds != null && !articleIds.isEmpty()) {
            final Set<Long> favoriteArticleIds = articleRepository.findFavoriteArticles(username, articleIds);
            for (final Article article : articleList) {
                article.setFavorited(favoriteArticleIds.contains(article.getId()));
            }
        }
    }

    private void fillTags(final List<Article> articleList, final Set<Long> articleIds) {
        final Map<Long, Set<String>> articleTags = findArticlesTags(articleIds);
        for (final Article article : articleList) {
            article.setTagList(articleTags.get(article.getId()));
        }
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

    private Map<Long, Set<String>> findArticlesTags(final Collection<Long> articleIds) {
        if (articleIds == null || articleIds.isEmpty()) {
            return Collections.emptyMap();
        }

        final List<ArticleTagsMapper.ArticleIdTag> articleTags = tagRepository.findArticlesTags(articleIds);
        return articleTags
                .stream()
                .collect(groupingBy(
                        ArticleTagsMapper.ArticleIdTag::getArticleId,
                        mapping(ArticleTagsMapper.ArticleIdTag::getTag, toSet())
                ));
    }

    private ArticleList articleList(final List<Article> articles, final int count) {
        final ArticleList articleList = new ArticleList();
        articleList.setArticles(articles);
        articleList.setArticlesCount(count);
        return articleList;
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
}
