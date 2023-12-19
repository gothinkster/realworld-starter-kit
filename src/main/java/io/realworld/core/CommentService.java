package io.realworld.core;

import io.realworld.api.request.NewCommentDto;
import io.realworld.api.response.CommentDto;
import io.realworld.api.response.ProfileDto;
import io.realworld.core.model.Article;
import io.realworld.core.model.Comment;
import io.realworld.core.model.Profile;
import io.realworld.db.ArticleRepository;
import io.realworld.db.CommentRepository;
import io.realworld.db.UserRepository;
import io.realworld.exceptions.ApplicationException;
import io.realworld.exceptions.ErrorCode;

import java.util.List;
import java.util.Objects;

import static io.realworld.exceptions.ErrorCode.NOT_FOUND;

public class CommentService {
    private final CommentRepository commentRepository;
    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;

    public CommentService(final CommentRepository commentRepository,
                          final ArticleRepository articleRepository,
                          final UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.articleRepository = articleRepository;
        this.userRepository = userRepository;
    }

    public CommentDto saveComment(final String username, final String slug, final NewCommentDto newComment) {
        final Long articleId = articleRepository.findArticleIdBySlug(slug);
        if (articleId == null) {
            throw new ApplicationException(NOT_FOUND, "Could not find article [" + slug + "]");
        }
        final Long userId = userRepository.findUserIdByUsername(username);
        final long newCommentId = commentRepository.saveComment(userId, articleId, newComment.body());

        Comment commentById = commentRepository.findCommentById(newCommentId);
        return toDto(commentById);
    }

    public void deleteComment(final String username, final String slug, final long commentId) {
        final CommentDto comment = findComment(commentId);
        final Article article = articleRepository.findArticle(slug);

        final boolean isCommentAuthor = Objects.equals(comment.author().username(), username);
        final boolean isArticleAuthor = article != null && Objects.equals(article.author().username(), username);
        final boolean isAuthorizedToDeleteComment = isCommentAuthor || isArticleAuthor;
        if (!isAuthorizedToDeleteComment) {
            throw new ApplicationException(ErrorCode.FORBIDDEN, "Not allowed to delete comment with id [" + commentId + "]");
        }
        commentRepository.deleteComment(slug, commentId);
    }

    public List<CommentDto> findArticleComments(final String slug) {
        return commentRepository.findArticleComments(slug)
                .stream()
                .map(this::toDto)
                .toList();
    }

    private CommentDto findComment(final long commentId) {
        final var comment = commentRepository.findCommentById(commentId);

        if (comment == null) {
            throw new ApplicationException(NOT_FOUND, "Comment with id [" + commentId + "] not found");
        }
        return toDto(comment);
    }

    private CommentDto toDto(Comment comment) {
        return new CommentDto(comment.id(),
                comment.body(),
                comment.createdAt(),
                comment.updatedAt(),
                toDto(comment.author()));
    }

    private ProfileDto toDto(Profile profile) {
        return new ProfileDto(profile.username(),
                profile.bio(),
                profile.image(),
                null);
    }
}
