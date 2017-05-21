/*CREATE ROLE omis;*/

--CREATE DATABASE omis;

create table if not exists users(
    id uuid,
    role_id uuid,
    created TIMESTAMP NOT NULL
);

ALTER TABLE users ADD CONSTRAINT user_id PRIMARY KEY(id);

create table if not exists roles (
    id uuid,
    description varchar(2048) NOT NULL,
    created timestamp NOT NULL
);
ALTER TABLE roles ADD CONSTRAINT role_id PRIMARY KEY(id);

ALTER TABLE users ADD CONSTRAINT user_role_fk
    FOREIGN KEY(role_id) REFERENCES roles(id) ON DELETE CASCADE ON UPDATE CASCADE;


create table if not exists password_info (
    user_id uuid,
    provider varchar(64) NOT NULL,
    key varchar(2048) NOT NULL,
    hasher varchar(64) NOT NULL,
    password varchar(256) NOT NULL,
    salt varchar(256),
    created timestamp NOT NULL,
    PRIMARY KEY (provider, key)
);


ALTER TABLE password_info ADD CONSTRAINT password_info_user_fk FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE CASCADE;

