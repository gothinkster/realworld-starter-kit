package org.realworld.demo.domain;

import com.google.common.base.Preconditions;
import org.springframework.util.StringUtils;

import javax.persistence.Entity;

import static com.google.common.base.Preconditions.checkArgument;

@Entity
public class User extends BaseEntity{
    private String email;

    private String password;

    private String userName;

    private String bio;

    private String image;

    /* for table row -> object mapping */
    protected User(){}

    public User(String email, String password, String userName, String bio, String image){
        checkArgument(StringUtils.hasText(email));
        checkArgument(StringUtils.hasText(password));
        checkArgument(StringUtils.hasText(userName));
        checkArgument(StringUtils.hasText(bio));
        checkArgument(StringUtils.hasText(image));

        this.email = email;
        this.password = password;
        this.userName = userName;
        this.bio = bio;
        this.image = image;
    }
}
