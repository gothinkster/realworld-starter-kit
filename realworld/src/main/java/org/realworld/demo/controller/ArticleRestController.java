package org.realworld.demo.controller;

import org.realworld.demo.controller.dto.ArticleDto.ArticleCreateRequest;
import org.realworld.demo.controller.dto.ArticleDto.ArticleResponse;
import org.realworld.demo.controller.dto.ArticleDto.ArticleUpdateRequest;
import org.realworld.demo.domain.Article;
import org.realworld.demo.domain.User;
import org.realworld.demo.service.ArticleService;
import org.realworld.demo.service.FollowStateService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/articles")
public class ArticleRestController {

    private final ArticleService articleService;

    private final FollowStateService followStateService;

    public ArticleRestController(ArticleService articleService, FollowStateService followStateService) {
        this.articleService = articleService;
        this.followStateService = followStateService;
    }

    @GetMapping("/{slug}")
    public ArticleResponse getArticle(@PathVariable String slug){
        Article article = articleService.getArticle(slug);

        boolean following = followStateService.getFollowing(null, article.getAuthor());

        return new ArticleResponse(article, following);
    }

    @PostMapping
    public ArticleResponse createArticle(@RequestBody ArticleCreateRequest request, @AuthenticationPrincipal Object principal){
        User loginUser = (User) principal;

        Article article = articleService.createArticle(loginUser, request.getTitle(), request.getDescription(), request.getBody(), request.getTags());

        boolean following = followStateService.getFollowing(loginUser, article.getAuthor());

        return new ArticleResponse(article, following);
    }

    @PutMapping("/{slug}")
    public ArticleResponse updateArticle(
            @PathVariable String slug,
            @RequestBody ArticleUpdateRequest request,
            @AuthenticationPrincipal Object principal
    ){
        User loginUser = (User) principal;

        Article updatedArticle = articleService.updateArticle(slug, request.getTitle(), request.getDescription(), request.getBody());

        boolean following = followStateService.getFollowing(loginUser, updatedArticle.getAuthor());

        return new ArticleResponse(updatedArticle, following);
    }

    @DeleteMapping("/{slug}")
    public ResponseEntity<Object> deleteArticle(@PathVariable String slug){
        articleService.deleteArticle(slug);

        return ResponseEntity.noContent().build();
    }

}
