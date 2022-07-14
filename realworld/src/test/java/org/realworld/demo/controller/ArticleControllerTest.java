package org.realworld.demo.controller;

import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.realworld.demo.domain.Article;
import org.realworld.demo.domain.Tag;
import org.realworld.demo.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
class ArticleControllerTest extends ControllerTest{

    @Autowired
    private ArticleRepository articleRepository;

    private final Article article = new Article.Builder(user, "first writing~! !", "Hello 안녕~~")
            .description("처음 써보는 글인데 괜찮을지")
            .tags(List.of(new Tag("Spring"), new Tag("dragons"))).build();

    private final Article newArticle = new Article.Builder(user, "second writing~! !", "두 번째 글이니 만나서 반가워")
            .description("이젠 두번째야")
            .tags(List.of(new Tag("Spring"), new Tag("dragons"))).build();


    @BeforeEach
    void setup(){
        userRepository.save(user);
        articleRepository.save(article);
    }

    @Test
    @DisplayName("POST /api/articles")
    void test1() throws Exception {
        //Given
        ObjectNode node = objectMapper.createObjectNode();
        ObjectNode articleNode = node.putObject("article");
        articleNode.put("title", newArticle.getTitle());
        articleNode.put("description", newArticle.getDescription());
        articleNode.put("body", newArticle.getBody());
        ArrayNode tagList = articleNode.putArray("tagList");
        for(Tag tag : newArticle.getTags())
            tagList.add(tag.getName());

        String token = jwtUtil.createToken(user.getEmail());

        // When
        // Then
        mvc.perform(post("/api/articles")
                        .content(node.toString())
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.article.title").value(newArticle.getTitle()))
                .andExpect(jsonPath("$.article.slug").value(newArticle.getSlug()))
                .andExpect(jsonPath("$.article.description").value(newArticle.getDescription()))
                .andExpect(jsonPath("$.article.body").value(newArticle.getBody()))
                .andExpect(jsonPath("$.article.tagList").isArray())
                .andExpect(jsonPath("$.article.tagList[0]").value(newArticle.getTags().get(0).getName()))
                .andExpect(jsonPath("$.article.tagList[1]").value(newArticle.getTags().get(1).getName()))
                .andDo(print());
    }


    @Test
    @DisplayName("GET /api/articles/{slug}")
    void test2() throws Exception {
        //Given

        // When
        // Then
        mvc.perform(get("/api/articles/{slug}", article.getSlug()))
                .andExpect(jsonPath("$.article.title").value(article.getTitle()))
                .andExpect(jsonPath("$.article.slug").value(article.getSlug()))
                .andExpect(jsonPath("$.article.body").value(article.getBody()))
                .andExpect(jsonPath("$.article.description").value(article.getDescription()))
                .andExpect(jsonPath("$.article.tagList").isArray())
                .andDo(print());
    }

    @Test
    @DisplayName("PUT /api/articles/{slug}")
    void test3() throws Exception {
        //Given
        Article updatedArticle = newArticle;

        ObjectNode node = objectMapper.createObjectNode();
        ObjectNode articleNode = node.putObject("article");
        articleNode.put("title", updatedArticle.getTitle());
        articleNode.put("description", updatedArticle.getDescription());
        articleNode.put("body", updatedArticle.getBody());

        String token = jwtUtil.createToken(user.getEmail());

        // When
        // Then
        mvc.perform(put("/api/articles/{slug}", article.getSlug())
                        .content(node.toString())
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.article.title").value(updatedArticle.getTitle()))
                .andExpect(jsonPath("$.article.slug").value(updatedArticle.getSlug()))
                .andExpect(jsonPath("$.article.description").value(updatedArticle.getDescription()))
                .andExpect(jsonPath("$.article.body").value(updatedArticle.getBody()))
                .andDo(print());
    }
    @Test
    @DisplayName("DELETE /api/articles/{slug}")
    void test4() throws Exception {
        //Given
        String token = jwtUtil.createToken(user.getEmail());

        // When
        mvc.perform(delete("/api/articles/{slug}", article.getSlug())
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());
        Optional<Article> articleOptional = articleRepository.findBySlug(article.getSlug());

        // Then
        assertThat(articleOptional).isEmpty();
    }


}