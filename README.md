# 🎓 EduManage | Advanced Student Management System

[![GitHub License](https://img.shields.io/github/license/poojaspy9730/internship-project-SDM-)](https://github.com/poojaspy9730/internship-project-SDM-/blob/main/LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/poojaspy9730/internship-project-SDM-)](https://github.com/poojaspy9730/internship-project-SDM-/stargazers)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2014.0.0-brightgreen)](https://nodejs.org/)

**EduManage** is a modern, enterprise-grade Student Management System designed to streamline academic administration. Built with a robust Node.js backend and a sleek, responsive frontend, it offers a seamless experience for managing student records, monitoring enrollments, and interacting via an integrated AI chatbot.

---

## 🏗️ System Architecture

Our architecture follows a clean MVC (Model-View-Controller) pattern to ensure scalability and maintainability.

![System Architecture](docs/system_architecture.png)

> **Backend:** Node.js & Express.js  
> **Frontend:** Semantic HTML5, CSS3 (Glassmorphism UI), Vanilla JavaScript  
> **Database:** SQLite (Relational)  

---

## 🔄 User Workflow

Understanding how users interact with EduManage.

![User Flowchart](docs/user_flowchart.png)

1. **Dashboard Access:** Real-time overview of student statistics.
2. **Student Directory:** Comprehensive CRUD operations (Create, Read, Update, Delete).
3. **Smart Search:** Dynamic filtering by name, email, or major.
4. **AI Assistance:** Integrated chatbot for quick navigation and support.

---

## ✨ Key Features

- **🚀 Performance-Driven UI:** Ultra-fast, glassmorphic dashboard interface.
- **📁 Student Lifecycle Management:** Track students from enrollment to graduation.
- **🤖 Intelligent Chatbot:** Interactive assistant to help users manage records.
- **🔍 Advanced Search & Sort:** Find and organize data instantly.
- **🛡️ Data Integrity:** Secure SQLite storage with robust validation.
- **📱 Fully Responsive:** Works perfectly on Desktops, Tablets, and Mobile.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | HTML5, CSS3, JavaScript (ES6+) |
| **Backend** | Node.js, Express.js |
| **Database** | SQLite3 |
| **Icons & Fonts** | FontAwesome 6, Google Fonts (Inter) |
| **Styling** | Modern Vanilla CSS (No Framework dependencies) |

---

## 🚀 Getting Started

Follow these steps to set up EduManage on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) installed (v14 or higher)
- [Git](https://git-scm.com/) installed

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/poojaspy9730/internship-project-SDM-
   cd internship-project-SDM-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Initialize the database** (Optional if `database.sqlite` is already present)
   ```bash
   node init_db.js
   node seed_db.js
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Open in Browser**
   Navigate to `http://localhost:3000`

---

## 📂 Project Structure

```text
├── config/             # Database configurations
├── controllers/        # Business logic for API endpoints
├── models/             # Database schemas and models
├── public/             # Static files (HTML, CSS, JS)
│   ├── css/            # Stylesheets
│   ├── js/             # Frontend logic (Dashboard, Chatbot)
│   └── assets/         # Images and icons
├── routes/             # Express API routes
├── server.js           # Main application entry point
└── database.sqlite     # SQLite database file
```

---

## 🏷️ Tags
`#StudentManagement` `#NodeJS` `#ExpressJS` `#SQLite` `#WebDevelopment` `#EducationTech` `#Javascript` `#FullStack`

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

Developed with ❤️ by [Pooja](https://github.com/poojaspy9730)
