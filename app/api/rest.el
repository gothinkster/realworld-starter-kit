# -*- restclient -*-
#

:domain = http://localhost:8080/api
:token = eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXlsb2FkIjp7ImlkIjo1OCwiZW1haWwiOiJ2bGFkQHZsYWQzLmNvbSIsInVzZXJuYW1lIjoidXNlcm5hbWUiLCJiaW8iOiIiLCJpbWFnZSI6IiJ9LCJleHAiOjE2MzU4NzU0NDUsImlhdCI6MTYzNTUxNTQ0NX0.ioWBFheduLPuAqjMPORydisb5HJOhIhlqMwMn0eU7X4

# register use
POST :domain/users
Content-Type: application/json
Authorization: :token
{
  "user": {
    "username": "username",
    "email": "vlad@vlad3.com",
    "password": "pass3"
  }
}

# login user
POST :domain/users/login
Content-Type: application/json
Authorization: :token
{
  "user": {
    "email": "vlad@vlad3.com",
    "password": "pass3"
  }
}


# get user details
GET :domain/user
Content-Type: application/json
Authorization: :token


# update user
PUT :domain/user
Content-Type: application/json
Authorization: :token
{
  "user": {
    "username": "changed2",
    "bio": "new bio",
    "image": "new image"
  }
}


# get not found
GET :domain/article
Content-Type: application/json
Authorization: :token
