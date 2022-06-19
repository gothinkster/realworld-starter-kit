package org.realworld.demo.service;

import org.realworld.demo.domain.Article;
import org.realworld.demo.domain.Comment;
import org.realworld.demo.domain.User;
import org.realworld.demo.repository.CommentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    private final CommentRepository repository;

    public CommentService(CommentRepository repository) {
        this.repository = repository;
    }

    public Comment registerComment(User author, Article article, String body){
        return repository.save(new Comment(author, article, body));
    }

    public List<Comment> getCommentsFromArticle(Article article){
        return repository.findByArticle(article);
    }

    public void deleteComment(Long id){
        repository.deleteById(id);
    }
}
