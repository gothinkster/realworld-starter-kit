package com.example.realworld.web.article;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ArticleController {

    @GetMapping("/article")
    public String article() {
        return "pages/article/article.html";
    }

    @GetMapping("/editor")
    public String editArticle() {
        return "pages/article/editArticle.html";
    }
}
