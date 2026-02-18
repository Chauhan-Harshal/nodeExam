# 📝 Blog Management System (Node.js Exam Project)

A Full Stack Blog Application built with:

- Backend: Node.js, Express, MongoDB
- Frontend: React (Vite)
- Authentication: JWT + Cookies
- Role-Based Access: User & Admin
- Multi-user Support
- Article & Comment Management
- EJS + React Hybrid Structure

---

# 📂 Project Structure

Node js Exam/
│
├── backand/        → Express Backend (API + EJS Views)
└── blog-frontend/  → React Frontend (Vite)

---

# 🚀 Backend Overview

Path: `/backand`

## 📁 Folder Structure


---

## ⚙️ Backend Features

✔ User Registration & Login  
✔ JWT Authentication (Cookie-based)  
✔ Role-Based Access (Admin/User)  
✔ Create / Edit / Delete Articles  
✔ Comment System  
✔ MongoDB Population (Article → Author → Comments)  
✔ Protected Routes Middleware  
✔ EJS Server Side Rendering  

---

## 🛠 Backend Installation

```bash
cd backand
npm install
npm start
\Node js Exam/
│
├── backand/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── articleController.js
│   │   ├── authController.js
│   │   └── commentController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── article.js
│   │   ├── comment.js
│   │   ├── mongo.js
│   │   ├── user.js
│   │   └── userModel.js
│   │
│   ├── routes/
│   │   ├── articles.js
│   │   ├── auth.js
│   │   └── comments.js
│   │
│   ├── utils/
│   │   ├── articles.js
│   │   ├── comments.js
│   │   └── users.js
│   │
│   ├── views/
│   │   ├── article.ejs
│   │   ├── articleForm.ejs
│   │   ├── articleItem.ejs
│   │   

