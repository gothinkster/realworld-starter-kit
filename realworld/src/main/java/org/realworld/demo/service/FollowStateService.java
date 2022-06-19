package org.realworld.demo.service;

import org.realworld.demo.domain.FollowState;
import org.realworld.demo.domain.User;
import org.realworld.demo.repository.FollowStateRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
public class FollowStateService {

    private final FollowStateRepository followStateRepository;

    public FollowStateService(FollowStateRepository followStateRepository) {
        this.followStateRepository = followStateRepository;
    }

    public boolean checkFollowing(User follower, User followee){
        if(follower == null)
            return false;

        Optional<FollowState> maybeFollowState = followStateRepository.findByFollowerAndFollowee(follower, followee);
        return maybeFollowState.isPresent();
    }

    public void followUser(User follower, User followee){
        followStateRepository.save(new FollowState(follower, followee));
    }

    public void unfollowUser(User follower, User followee){
        Optional<FollowState> maybeFollowState = followStateRepository.findByFollowerAndFollowee(follower, followee);
        if(maybeFollowState.isEmpty()){
            return;
        }
        followStateRepository.deleteById(maybeFollowState.get().getId());
    }
}
