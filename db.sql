-- database conduit_fsharp

create extension if not exist "uuid-ossp";

create table if not exists users
(
    id                  bigserial
    primary key,
    username            varchar(255)                    not null
    unique,
    password            varchar(255)                    not null,
    email               varchar(255)                    not null
    unique,
    bio                 text,
    image               text,
    salt                uuid default uuid_generate_v4() not null,
    token               uuid,
    utc_token_expire_at timestamp
    );

alter table users
    add primary key (id);

alter table users
    add unique (username);

alter table users
    add unique (email);

create unique index if not exists users_pkey
    on users (id);

create unique index if not exists users_username_key
    on users (username);

create unique index if not exists users_email_key
    on users (email);
