# 🤖 Prompts.md

# TechoVerse Authentication System
## Sprint 14 – AI Development Log

**Internship:** Prodesk IT  
**Track:** Full Stack Development  
**Sprint:** Sprint 14

---

# Prompt 1 – Project Planning

### Prompt

```
How should I structure a secure authentication module for a MERN Stack Project Management application?
```

### Outcome

- Planned backend and frontend architecture.
- Decided to use JWT authentication.
- Selected bcryptjs for password hashing.
- Chose MongoDB Atlas as the database.

---

# Prompt 2 – MongoDB User Schema

### Prompt

```
How should I design a User schema using Mongoose with name, email, password, role, and timestamps?
```

### Outcome

- Created User model.
- Added unique email validation.
- Added timestamps.
- Added default user role.

---

# Prompt 3 – Password Security

### Prompt

```
Why should passwords never be stored in plain text? How do I hash passwords using bcryptjs before saving users into MongoDB?
```

### Outcome

- Implemented bcryptjs.
- Used bcrypt.genSalt().
- Used bcrypt.hash().
- Passwords are securely stored as hashed values.

---

# Prompt 4 – Duplicate User Validation

### Prompt

```
How can I prevent duplicate email registrations using MongoDB and Mongoose?
```

### Outcome

- Checked existing email before registration.
- Returned proper error message if user already exists.

---

# Prompt 5 – JWT Authentication

### Prompt

```
How do I generate a JWT token after successful login and set an expiration time?
```

### Outcome

- Generated JWT token.
- Configured 7-day expiration.
- Returned token after successful login.

---

# Prompt 6 – JWT Middleware

### Prompt

```
How can I create Express middleware that verifies JWT tokens from the Authorization header and protects API routes?
```

### Outcome

- Implemented authentication middleware.
- Verified Bearer Token.
- Restricted unauthorized access.

---

# Prompt 7 – React Authentication Flow

### Prompt

```
What is the best way to connect a React login page with a Node.js authentication API using Axios?
```

### Outcome

- Created Axios authentication service.
- Connected Login API.
- Connected Register API.

---

# Prompt 8 – Local Storage Authentication

### Prompt

```
How should I store JWT tokens after login and keep users logged in even after refreshing the page?
```

### Outcome

- Stored JWT token in Local Storage.
- Stored logged-in user information.
- Implemented persistent authentication.

---

# Prompt 9 – React Context API

### Prompt

```
How can I manage authentication globally using React Context API?
```

### Outcome

- Created AuthContext.
- Implemented login().
- Implemented logout().
- Shared authentication state across the application.

---

# Prompt 10 – Protected Routes

### Prompt

```
How do I restrict users from accessing the dashboard unless they are authenticated?
```

### Outcome

- Created ProtectedRoute component.
- Redirected unauthenticated users to Login page.

---

# Prompt 11 – Password Visibility

### Prompt

```
How can I implement Show/Hide Password functionality using React Icons?
```

### Outcome

- Added password visibility toggle.
- Improved user experience.

---

# Prompt 12 – Loading State

### Prompt

```
How can I disable the login button and show a loading state while the authentication request is in progress?
```

### Outcome

- Added loading state.
- Disabled buttons during API requests.

---

# Prompt 13 – Error Handling

### Prompt

```
How should I display backend authentication errors such as invalid credentials or duplicate email in React?
```

### Outcome

- Displayed API error messages.
- Improved validation feedback.

---

# Prompt 14 – MongoDB Connection Issue

### Prompt

```
Why is my Express server unable to connect to MongoDB Atlas, and how do I verify my connection string?
```

### Outcome

- Verified environment variables.
- Fixed MongoDB connection issues.
- Successfully connected Atlas database.

---

# Prompt 15 – JWT Verification Error

### Prompt

```
Why am I getting "Invalid Token" while accessing protected routes, and how can I fix JWT verification?
```

### Outcome

- Verified Authorization header.
- Corrected JWT verification.
- Successfully accessed protected endpoints.

---

# Prompt 16 – Password Hash Verification

### Prompt

```
How can I verify that bcrypt is hashing passwords correctly inside MongoDB Atlas?
```

### Outcome

- Confirmed passwords are stored as hashed values.
- Verified no plain-text passwords exist.

---

# Prompt 17 – Routing Logic

### Prompt

```
How should I configure React Router so that the default route redirects to Login and unknown routes display a 404 page?
```

### Outcome

- Added default redirect.
- Added protected dashboard route.
- Added 404 page.

---

# Prompt 18 – API Testing

### Prompt

```
How can I test Register, Login, and Protected APIs using Postman and Thunder Client?
```

### Outcome

- Successfully tested all authentication APIs.
- Verified JWT authentication.

---

# Prompt 19 – Deployment Preparation

### Prompt

```
What changes should I make before deploying the React frontend to Vercel and Node.js backend to Render?
```

### Outcome

- Planned deployment.
- Prepared environment variables.
- Configured API URLs.

---

# Prompt 20 – Documentation

### Prompt

```
How can I write a professional README.md for my authentication project that accurately reflects my implementation?
```

### Outcome

- Created complete project documentation.
- Added installation steps.
- Added API documentation.
- Added folder structure.
- Added authentication workflow.

---

# Technologies Used

- React.js
- React Router DOM
- Axios
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- bcryptjs
- JSON Web Token (JWT)

---

# Sprint Outcome

Successfully implemented:

- Secure User Registration
- User Login
- Password Hashing
- JWT Authentication
- Protected Routes
- React Context Authentication
- Local Storage Session Management
- MongoDB Atlas Integration
- REST API Authentication

---

# Author

**Anantha Lakshmi**

**Internship:** Prodesk IT

**Track:** Full Stack Development

**Sprint:** Sprint 14

**Project:** TechoVerse Authentication System