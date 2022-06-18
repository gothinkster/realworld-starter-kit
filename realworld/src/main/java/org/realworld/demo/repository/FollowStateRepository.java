package org.realworld.demo.repository;

import org.realworld.demo.domain.FollowState;
import org.realworld.demo.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FollowStateRepository extends JpaRepository<FollowState, Long> {

    List<FollowState> findByFollower(User follower);

    List<FollowState> findByFollowee(User followee);

    Optional<FollowState> findByFollowerAndFollowee(User follower, User followee);
}
