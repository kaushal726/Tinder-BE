# Express Application API

This is a REST API built with Node.js and Express. It provides functionalities for user authentication, profile management, connection requests, and user feed operations. Below is the detailed guide to help you set up, run, and use the API.

---

## Features

- User Signup, Login, and Logout
- View and Edit User Profiles
- Password Reset Functionality
- Manage Connection Requests
- Retrieve User Feeds and Connections
- Centralized Error Handling

---

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
  - [Authentication Routes](#authentication-routes)
  - [Profile Routes](#profile-routes)
  - [Connection Request Routes](#connection-request-routes)
  - [User Request Routes](#user-request-routes)
- [Postman Collection](#postman-collection)
- [Error Handling](#error-handling)
- [Technologies Used](#technologies-used)
- [License](#license)
- [Author](#author)

---

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install all dependencies:
   ```bash
   npm install
   ```

---

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```plaintext
PORT=7000
DB_CONNECTION_STRING=<your-mongodb-connection-string>
SECRET_KEY=<your-secret-key>
```

---

## Running the Application

1. Ensure MongoDB is running locally or use a cloud MongoDB service.
2. Start the server:
   ```bash
   npm start
   ```
3. The server will run at `http://localhost:7001`.

---

## API Documentation

### Authentication Routes

| Method | Endpoint       | Description         |
| ------ | -------------- | ------------------- |
| POST   | `/auth/login`  | Login a user        |
| POST   | `/auth/signup` | Register a new user |
| POST   | `/auth/logout` | Logout a user       |

### Profile Routes

| Method | Endpoint                   | Description                       |
| ------ | -------------------------- | --------------------------------- |
| GET    | `/profile/view`            | View the logged-in user's profile |
| PATCH  | `/profile/edit`            | Update user profile fields        |
| POST   | `/profile/forgot-password` | Reset the user's password         |

### Connection Request Routes

| Method | Endpoint                          | Description                            |
| ------ | --------------------------------- | -------------------------------------- |
| POST   | `/request/send/:status/:userId`   | Send a connection request              |
| POST   | `/request/review/:status/:userId` | Approve or reject a connection request |

### User Request Routes

| Method | Endpoint                             | Description                      |
| ------ | ------------------------------------ | -------------------------------- |
| GET    | `/request/user/request/recieved`     | Get received connection requests |
| GET    | `/request/user/connections`          | Retrieve user connections        |
| GET    | `/request/user/feed?page=1&limit=10` | Get user feed with pagination    |

---

## Postman Collection

A Postman collection has been included to simplify API testing.

### Steps to Import:

1. Open Postman.
2. Go to **File > Import**.
3. Upload or paste the JSON provided in the `postman_collection.json` file.
4. Use the endpoints by replacing placeholders (e.g., `{{token}}`).

---

## Error Handling

All errors are handled centrally, ensuring consistent error responses. An error response looks like this:

```json
{
  "statusCode": 400,
  "message": "Bad Request",
  "error": "Error stack trace"
}
```

---

## Technologies Used

- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB Object Data Modeling (ODM)
- **JWT**: Secure token-based authentication
- **Bcrypt**: Password hashing
- **Cors**: Enable Cross-Origin Resource Sharing
- **Cookie Parser**: Handle cookies

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Author

Developed with ❤️ by Kaushal Raj.
Feel free to contribute or raise issues
