# 🚀 TechoVerse Authentication System

> **Sprint 14 | Prodesk IT Full Stack Development Internship**

A secure Authentication Module for the **TechoVerse AI Powered Project Management Platform**, built using **React.js, Node.js, Express.js, MongoDB Atlas, bcryptjs, and JWT Authentication**.

---

# 📌 Project Overview

The TechoVerse Authentication System is the first phase of the AI Powered Project Management Platform.

This module enables users to:

- Register securely
- Login using email and password
- Store encrypted passwords
- Authenticate users using JWT
- Access protected routes
- Maintain user sessions using React Context API and Local Storage

---

# 🎯 Sprint Objective

Implement a secure authentication system following industry-standard practices.

---

# ✨ Features

## Backend

- User Registration
- User Login
- MongoDB Atlas Integration
- Password Hashing using bcryptjs
- JWT Token Generation
- JWT Authentication Middleware
- Protected Profile API
- Duplicate Email Validation
- Required Field Validation
- 404 Route Handling

---

## Frontend

- React Router DOM
- Login Page
- Register Page
- Protected Dashboard
- React Context Authentication
- Local Storage Session Management
- Password Show / Hide
- Loading State
- Success & Error Messages
- Automatic Login Redirect

---

# 🛠 Technology Stack

## Frontend

- React.js
- React Router DOM
- Axios
- React Icons

---

## Backend

- Node.js
- Express.js

---

## Database

- MongoDB Atlas
- Mongoose

---

## Authentication

- bcryptjs
- JSON Web Token (JWT)

---

## Deployment

- Frontend : Vercel (techo-verse-fg99.vercel.app)
- Backend : Render (https://techoverse-fpcd.onrender.com)

---

## 📸 Screenshots

### Register Page
![Register Page](./assets/register.png)

### Login Page
![Login Page](./assets/login.png)

### Dashboard
![Dashboard](./assets/dashboard.png)





# 📂 Project Folder Structure

```text
TechoVerse/

│── client/
│
├── public/
│
├── src/
│   │
│   ├── api/
│   │
│   ├── assets/
│   │
│   ├── components/
│   │     ├── Navbar.jsx
│   │     └── ProtectedRoute.jsx
│   │
│   ├── context/
│   │     └── AuthContext.jsx
│   │
│   ├── pages/
│   │     ├── Dashboard.jsx
│   │     ├── Login.jsx
│   │     └── Register.jsx
│   │
│   ├── services/
│   │     └── authService.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js


│── server/

├── config/
│     └── db.js

├── controllers/
│     └── authController.js

├── middleware/
│     └── authMiddleware.js

├── models/
│     └── User.js

├── routes/
│     └── authRoutes.js

├── node_modules/

├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── testConnection.js
```

---

# 👤 User Schema

| Field | Type | Description |
|--------|------|-------------|
| name | String | User Name |
| email | String | Unique Email Address |
| password | String | Hashed Password |
| role | String | Default: user |
| createdAt | Date | Auto Generated |
| updatedAt | Date | Auto Generated |

---

# 🔐 Authentication Flow

## User Registration

- User enters Name, Email and Password.
- Required fields are validated.
- Existing email is checked.
- Password is hashed using bcryptjs.
- User is stored in MongoDB Atlas.
- Registration success response is returned.

---

## User Login

- User enters Email and Password.
- Email is verified.
- Password is compared using bcrypt.compare().
- JWT token is generated.
- User data and token are returned.
- Token is stored in Local Storage.
- User is redirected to Dashboard.

---

# 🔒 Password Security

Passwords are securely hashed before storing them in MongoDB Atlas.

Example Stored Password

```
$2b$10$Q6KXB0t4FagMei5DpA.q.QecIK...
```

Passwords are never stored in plain text.

---

# 🔑 JWT Authentication

After successful login:

- JWT Token is generated
- Token validity: **7 Days**
- Stored in browser Local Storage
- Required for accessing protected APIs

Authorization Header

```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

# 🛡 Protected Route

Protected Endpoint

```
GET /api/auth/profile
```

If Token Exists

```json
{
  "success": true,
  "message": "Welcome to TechoVerse Dashboard",
  "user": {
    "id": "USER_ID"
  }
}
```

If Token Missing

```json
{
  "success": false,
  "message": "Not Authorized. Token Missing."
}
```

If Token Invalid

```json
{
  "success": false,
  "message": "Not Authorized. Invalid Token."
}
```

---

# 📡 REST API Endpoints

## Register User

```
POST /api/auth/register
```

Request

```json
{
"name":"Anantha Lakshmi",
"email":"user@gmail.com",
"password":"Password123"
}
```

---

## Login User

```
POST /api/auth/login
```

Request

```json
{
"email":"user@gmail.com",
"password":"Password123"
}
```

Response

```json
{
"success":true,
"message":"Login Successful",
"token":"JWT_TOKEN",
"user":{
"id":"USER_ID",
"name":"Anantha Lakshmi",
"email":"user@gmail.com"
}
}
```

---

## Protected Profile

```
GET /api/auth/profile
```

Headers

```
Authorization: Bearer JWT_TOKEN
```

---

# ⚙ Environment Variables

Create a `.env` file inside the **server** folder.

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_ATLAS_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY
```

---

# ▶ Installation

## Clone Repository

```bash
git clone [https://github.com/anucodeverse/TechoVerse]
```

---

## Backend

```bash
cd server

npm install

npm run dev
```

---

## Frontend

```bash
cd client

npm install

npm run dev
```

---

# 🧪 Testing

Authentication APIs can be tested using:

- Postman
- Thunder Client

Test Cases

- Register New User
- Register Existing User
- Login Successfully
- Invalid Login
- Protected Route with JWT
- Protected Route without JWT

---

# 📊 MongoDB Verification

User passwords are successfully stored as **bcrypt hashed values**.

Example Database Fields

```
_id
name
email
password (hashed)
role
createdAt
updatedAt
```

---

# 🚀 Sprint 14 Completion Status

| Feature | Status |
|----------|--------|
| User Registration | ✅ |
| User Login | ✅ |
| MongoDB Atlas | ✅ |
| Mongoose Schema | ✅ |
| bcrypt Password Hashing | ✅ |
| JWT Authentication | ✅ |
| Protected Middleware | ✅ |
| Protected Dashboard | ✅ |
| React Context API | ✅ |
| Local Storage Authentication | ✅ |
| Axios API Integration | ✅ |
| Password Show / Hide | ✅ |
| Error Handling | ✅ |

---

# 📈 Future Enhancements

- Password Strength Meter
- Forgot Password
- Reset Password
- Email Verification
- Role-Based Authorization
- Refresh Tokens
- Multi-Factor Authentication
- AI Authentication Assistant

---

# 👩‍💻 Author

**Name:** Anantha Lakshmi

**Internship:** Prodesk IT

**Track:** Full Stack Development

**Sprint:** Sprint 14

**Project:** TechoVerse Authentication System

---

# 📄 License

This project is developed for educational and internship purposes as part of the **Prodesk IT Full Stack Development Internship Program**.
