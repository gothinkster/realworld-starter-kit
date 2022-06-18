package org.realworld.demo.domain;

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

    public String getName(){
        return name;
    }

    public Tag(String name){
        checkArgument(StringUtils.hasText(name));
        this.name = name;
    }
}
