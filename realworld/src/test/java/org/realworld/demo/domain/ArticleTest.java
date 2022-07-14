package org.realworld.demo.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class ArticleTest {

  @Test
  @DisplayName("게시글 생성 테스트[한글]")
  void test1() {
    User user = new User("example@jake.jake", "jakejake", "Jacob", "", "");
    Article article = new Article.Builder(user, "처음 써보는 게시글", "Hello 안녕~~").build();
    System.out.println(article.getSlug());
  }

  @Test
  @DisplayName("게시글 생성 테스트[영어]")
  void test2() {
    User user = new User("example@jake.jake", "jakejake", "Jacob", "", "");
    Article article = new Article.Builder(user, "first writing~! !", "Hello 안녕~~").build();
    System.out.println(article.getSlug());
  }
}