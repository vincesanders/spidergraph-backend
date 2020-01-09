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
  
## User Endpoints
  
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
## Graph Endpoints

### GET /api/graphs/:id

  - INPUT - none
  
  - OUTPUT - an object with a matching ID containing a 'id','name','owner','theme','axis' array,'layer'array, and a 2D 'data' array
  ```
  {
    "id":2,
    "name":"test2",
    "owner":1,
    "theme":1,
    "axis":["axis1","axis2","axis3","axis4"],
    "layer":["layer1","layer2","layer3","layer4"],
    "data":[
      [11,12,13,14],
      [21,22,23,24],
      [31,32,33,34],
      [41,42,43,44]
    ]
  }
  ```
### POST /api/graphs/

  - INPUT - an object containing a 'name','owner','theme','axis' array,'layer'array, and a 2D 'data' array
  ```
  {
    "name":"test2",
    "owner":1,
    "theme":1,
    "axis":["axis1","axis2","axis3","axis4"],
    "layer":["layer1","layer2","layer3","layer4"],
    "data":[
      [11,12,13,14],
      [21,22,23,24],
      [31,32,33,34],
      [41,42,43,44]
    ]
  }
  ```
  - OUTPUT - the new object containing a 'id','name','owner','theme','axis' array,'layer'array, and a 2D 'data' array
  ```
  {
    "id":2,
    "name":"test2",
    "owner":1,
    "theme":1,
    "axis":["axis1","axis2","axis3","axis4"],
    "layer":["layer1","layer2","layer3","layer4"],
    "data":[
      [11,12,13,14],
      [21,22,23,24],
      [31,32,33,34],
      [41,42,43,44]
    ]
  }
  ```
### PUT /api/graphs/:id

  - INPUT - an object containing a 'name','owner','theme','axis' array, 'layer' array, and a 2D 'data' array
  ```
  {
    "name": "put2",
    "owner": 1,
    "theme": 1,
    "axis": ["axis5","axis6","axis7","axis8"],
    "layer": ["layerA","layerB","layerC","layerD"],
    "data": [
      [511,512,513,514],
      [611,612,613,614],
      [711,712,713,714],
      [811,812,813,814]
    ]
  }
  ```
  - OUTPUT - an updated object with a matching ID containing a 'id','name','owner','theme','axis' array,'layer'array, and a 2D 'data' array
  ```
  {
    "id": 1,
    "name": "put2",
    "owner": 1,
    "theme": 1,
    "axis": ["axis5","axis6","axis7","axis8"],
    "layer": ["layerA","layerB","layerC","layerD"],
    "data": [
      [511,512,513,514],
      [611,612,613,614],
      [711,712,713,714],
      [811,812,813,814]
    ]
  }
  ```
### DELETE /api/graphs/:id

  - INPUT - none
  
  - OUTPUT - a message showing the matching graph was removed
  ```
  {
    "message": "Graph 1 removed."
  }
  ```
