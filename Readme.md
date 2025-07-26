# This is the backend API of the Student Management System built using Node.js, Express.js, and MongoDB. It provides secure, RESTful endpoints to manage authentication, students, staff, and role-based permissions.

## 🌐 Live API Base URL
🔗 [https://student-management-system-backend.onrender.com](https://student-management-system-backend-s7ll.onrender.com)
(Replace with your actual Render URL if different)

## 📘 API Documentation (Postman)
🔗 [https://documenter.getpostman.com/view/8886902/2sB3B7MYaU](https://documenter.getpostman.com/view/8886902/2sB3B7MYaU)
Includes all endpoints for:

✅ Auth (Register/Login)

✅ Student CRUD

✅ Staff CRUD

✅ Permissions 

✅ Role-based access

## 🛠️ Tech Stack
Node.js

Express.js

MongoDB + Mongoose

JWT for authentication

bcryptjs for password hashing

dotenv for environment configuration

CORS for security


## 📦 Installation

 Clone the repository
git clone [https://github.com/yourusername/student-management-backend.git](https://github.com/RaisanJMR/student-management-system-backend/)
cd student-management-backend
mongodb cloud or local instance
## Install dependencies
npm install
🔑 Environment Configuration
Create a .env file in the root directory:

PORT=8080
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
## ▶️ Running the Server

npm run server


## 📁 API Endpoints Overview
🔐 Auth Routes
POST ```/api/users/register```

POST ```/api/users/login```

👤 Student Routes
GET ```/api/students```

POST ```/api/students```

PUT ```/api/students/:id```

DELETE ```/api/students/:id```

⚠️ All routes are protected by JWT and role-based authorization middleware.


## 🚀 Deployment
The backend is deployed using Render.


## 📂 Folder Structure
```
.
├── config/       # db config
├── controllers/       # Request handlers
├── middleware/        # Auth, error middleware
├── models/            # Mongoose schemas
├── routes/            # API routes
├── .env               # Environment config
└── index.js          # Entry point
```
✅ Features
Robust JWT authentication

RBAC: Fine-grained role-based access control

Secure password hashing with bcrypt

Clean modular structure

Compatible with frontend React client
