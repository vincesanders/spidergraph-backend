# Backend
```=====================================================================================================
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
=====================================================================================================```

## Auth Endpoints

### POST /api/auth/login

  - INPUT - an object containing a 'username' & 'password'
  `{
    username:"user",
    password:"pass"
  }`
  - OUTPUT - an object containing a 'username','email' & 'token'
  `{
    username:"user",
    email:"user@email.com",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
  }`
### POST /api/auth/login

  - INPUT - an object containing a 'username','email' & 'password'
  `{
    username:"user",
    password:"pass",
    email:"user@email.com"
  }`
  - OUTPUT - an object containing a 'user' that has a 'username','email' & 'token'
  `{
    username:"user",
    email:"user@email.com",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
  }`
  
  EOF
