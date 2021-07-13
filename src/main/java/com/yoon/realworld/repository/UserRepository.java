package com.yoon.realworld.repository;

import com.yoon.realworld.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
