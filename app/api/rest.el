# -*- restclient -*-
#

:domain = http://localhost:8080/api
:token = eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXlsb2FkIjp7ImlkIjo1NywiZW1haWwiOiJ2bGFkQHZsYWQuY29tIiwidXNlcm5hbWUiOiJ1c2VybmFtZSIsImJpbyI6IiIsImltYWdlIjoiIn0sImV4cCI6MTYzNTYxMjkxNywiaWF0IjoxNjM1MjUyOTE3fQ.DTF-UtXP9JuY_r0Ln42m-2ovokjR4lH0TYGfRl38bEE

# register use
POST :domain/users
Content-Type: application/json
Authorization: Bearer :token
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
Authorization: Bearer :token
{
  "user": {
    "email": "vlad@vlad.com",
    "password": "pass"
  }
}


# get user details
GET :domain/user
Content-Type: application/json
Authorization: Bearer :token


# get not found
GET :domain/article
Content-Type: application/json
Authorization: Bearer :token
