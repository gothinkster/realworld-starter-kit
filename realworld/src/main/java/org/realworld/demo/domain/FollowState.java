package org.realworld.demo.domain;

import javax.persistence.Entity;
import javax.persistence.OneToOne;

import static com.google.common.base.Preconditions.checkArgument;

@Entity
public class FollowState extends BaseEntity{

    @OneToOne
    private User follower;

    @OneToOne
    private User followee;

    /* for table row -> object mapping */
    protected FollowState(){}

    public FollowState(User follower, User followee){
        checkArgument(followee != null);
        checkArgument(follower != null);

        this.follower = follower;
        this.followee = followee;
    }

}
