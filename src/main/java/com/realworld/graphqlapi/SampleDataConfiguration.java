package com.realworld.graphqlapi;

import com.realworld.graphqlapi.repository.ArticleRepository;
import com.realworld.graphqlapi.repository.AuthorRepository;
import com.realworld.graphqlapi.repository.DummyArticleRepository;
import com.realworld.graphqlapi.repository.DummyAuthorRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SampleDataConfiguration {
    @Bean
    ArticleRepository articleRepository(AuthorRepository authors) {
        return new DummyArticleRepository(authors);
    }

    @Bean
    AuthorRepository authorRepository() {
        return new DummyAuthorRepository();
    }
}
