# Backend
```
=====================================================================================================
|| POST   | /api/auth/login/       | - Gives back token if username and password are valid         ||
|| POST   | /api/auth/register/    | - Same as above but creates account instead of logging in     ||
||~~~~~~~~|~~~~~~~~~~~~~~~~~~~~~~~~|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~||
||------------------------------------------TOKEN REQUIRED-----------------------------------------||
||~~~~~~~~|~~~~~~~~~~~~~~~~~~~~~~~~|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~||
|| GET    | /api/users/            | - Returns list of all users (Shouldn't be used in production) ||
|| GET    | /api/users/:id/        | - Returns info of a single user                               ||
|| GET    | /api/users/:id/graphs/ | - Returns the graphs of a single user                         ||
||~~~~~~~~|~~~~~~~~~~~~~~~~~~~~~~~~|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~||
|| GET    | /api/graphs/:id/       | - Gives info on requested graph                               ||
|| POST   | /api/graphs/           | - Creates entry for given graph in database                   ||
|| PUT    | /api/graphs/:id/       | - Updates given graph in the database                         ||
|| DELETE | /api/graphs/:id/       | - Removes chosen graph from the database                      ||
=====================================================================================================
```

## Auth Endpoints

### POST /api/auth/login

  - INPUT - an object containing a 'username' & 'password'
  ```
  {
    username:"user",
    password:"pass"
  }
  ```
  - OUTPUT - an object containing a 'username','email' & 'token'
  ```
  {
    username:"user",
    email:"user@email.com",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
  }
  ```
### POST /api/auth/register

  - INPUT - an object containing a 'username','email' & 'password'
  ```
  {
    username:"user",
    password:"pass",
    email:"user@email.com"
  }
  ```
  - OUTPUT - an object containing a 'user' that has a 'username','email' & 'token'
  ```
  {
    username:"user",
    email:"user@email.com",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
  }
  ```
### GET /api/users/

  - INPUT - none
  - OUTPUT - a list of all users with their 'id', 'username', and 'email'
  ```
  [
    {
      "id": 1,
      "username": "user1",
      "email": "user1@email.com"
    },
    {
      "id": 2,
      "username": "user2",
      "email": "user2@email.com"
    }
  ]
  ```
### GET /api/users/:id

  - INPUT - none
  - OUTPUT - the 'username', and 'email' of the user with ':id'
  ```
  {
    "username": "user1",
    "email": "user1@email.com"
  }
  ```
### GET /api/users/:id/graphs

  - INPUT - none
  - OUTPUT - a list of all user:id's graphs with their 'id' and 'name'
  ```
  [
    {
      "id": 1,
      "name": "test2"
    },
    {
      "id": 2,
      "name": "test2"
    },
    {
      "id": 3,
      "name": "test2"
    }
  ]
  ```
  
  EOF
