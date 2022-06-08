package org.realworld.demo.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import static com.google.common.base.Preconditions.checkArgument;
import static org.springframework.util.StringUtils.hasText;

@Entity
@Table(name="users")
public class User extends BaseEntity{

    @Column(unique = true)
    private String email;

    private String password;

    private String username;

    private String bio;

    private String image;

    /* for table row -> object mapping */
    protected User(){}

    public User(String email, String password, String username, String bio, String image){
        checkArgument(hasText(email));
        checkArgument(hasText(password));
        checkArgument(hasText(username));

        this.email = email;
        this.password = password;
        this.username = username;
        this.bio = bio;
        this.image = image;
    }

    public User update(String password, String username, String bio, String image){
        if(hasText(password))
            this.password = password;
        if(hasText(username))
            this.username = username;
        if(hasText(bio))
            this.bio = bio;
        if(hasText(image))
            this.image = image;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getUsername() {
        return username;
    }

    public String getBio() {
        return bio;
    }

    public String getImage() {
        return image;
    }
}
