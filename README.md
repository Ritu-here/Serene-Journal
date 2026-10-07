# 🌿 Serene Journal

### A quiet place for your thoughts.

Serene Journal is a full-stack journaling web application built with the MERN stack.  
It provides a calm and simple digital space where users can write, manage, and reflect on their daily thoughts and experiences.

The goal of this project is to combine useful journaling features with a clean, peaceful, and distraction-free user experience.

---

## 🌐 Live Demo

🔗 **Live Website:** [Serene Journal](https://serene-journal-cm8b.vercel.app/)

Try the live application and explore the journaling experience.

---

## 📌 About The Project

Serene Journal allows users to maintain their personal journal digitally.

Users can:

- Create an account
- Log in securely
- Create journal entries
- Add a title and content
- Select their mood
- View their previous journals
- Read individual journal entries
- Edit existing journals
- Delete journals
- Track their journaling streak
- Manage their profile
- Change their password
- Reset their password through email
- Log out securely

The application is designed with a calm and minimal interface to make journaling feel simple and comfortable.

---

## ✨ Features

### 🔐 Authentication

- User Registration
- User Login
- JWT-based authentication
- Protected routes
- Secure password handling
- Forgot Password
- Password Reset through email
- Change Password
- Logout functionality

### 📝 Journal Management

- Create new journal entries
- Edit existing journals
- View journal details
- Delete journals
- Journal title and content
- Mood selection
- Journal creation date

### 🔥 Journaling Streak

Serene Journal tracks the user's journaling activity and calculates their journaling streak.

This encourages users to build a consistent journaling habit.

### 👤 User Profile

Users can manage their account through the profile section.

Profile features include:

- View account information
- Change password
- Manage account securely

### 🎨 Calm & Responsive UI

The interface is designed around a peaceful journaling experience.

- Clean and minimal design
- Soft green color palette
- Responsive layout
- Mobile-friendly interface
- Simple navigation
- User-friendly forms
- Calm visual experience

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- React Router
- Axios
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Nodemailer

### Database

- MongoDB Atlas

### Deployment

- Vercel

---

## 🏗️ Project Architecture

```text
Serene-Journal/
│
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── app.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/                 # Node.js + Express Backend
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md



#How It Works

#The application follows a client-server architecture.

              ┌─────────────────────┐
              │      User           │
              └──────────┬──────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │   React Frontend    │
              │       Vite          │
              └──────────┬──────────┘
                         │
                    REST API
                         │
                         ▼
              ┌─────────────────────┐
              │   Express Backend   │
              │      Node.js        │
              └──────────┬──────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │    MongoDB Atlas    │
              └─────────────────────┘

Authentication Flow

Register
   │
   ▼
User Account Created
   │
   ▼
Password Hashed
   │
   ▼
JWT Authentication
   │
   ▼
Protected Dashboard
