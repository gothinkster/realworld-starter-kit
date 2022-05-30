package org.realworld.demo.domain;

import com.google.common.base.Preconditions;
import org.springframework.util.StringUtils;

import javax.persistence.Entity;

import static com.google.common.base.Preconditions.checkArgument;

@Entity
public class Tag extends BaseEntity{

    private String name;

    @Override
    public String toString() {
        return "Tag{" +
                "name='" + name + '\'' +
                '}';
    }

    protected Tag(){}

    public Tag(String name){
        checkArgument(StringUtils.hasText(name));
        this.name = name;
    }
}
