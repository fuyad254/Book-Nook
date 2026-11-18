# 📚 Book Nook

\<p align="center">
&#x20; \<strong>A community-powered library to discover, share, borrow, and return books.\</strong>
\</p>

\<p align="center">
&#x20; \<a href="[https://book-nook-seven.vercel.app/](https://book-nook-seven.vercel.app/)">
&#x20;   \<img src="[https://img.shields.io/badge/LIVE-DEMO-2E7D32?style=for-the-badge&logo=vercel&logoColor=white](https://img.shields.io/badge/LIVE-DEMO-2E7D32?style=for-the-badge\&logo=vercel\&logoColor=white)" alt="Live Demo" />
&#x20; \</a>
&#x20; \<a href="[https://github.com/fuyad254/Book-Nook](https://github.com/fuyad254/Book-Nook)">
&#x20;   \<img src="[https://img.shields.io/badge/FRONTEND-GITHUB-181717?style=for-the-badge&logo=github&logoColor=white](https://img.shields.io/badge/FRONTEND-GITHUB-181717?style=for-the-badge\&logo=github\&logoColor=white)" alt="Frontend Repository" />
&#x20; \</a>
&#x20; \<a href="[https://github.com/fuyad254/Book-Nook-Server](https://github.com/fuyad254/Book-Nook-Server)">
&#x20;   \<img src="[https://img.shields.io/badge/BACKEND-GITHUB-181717?style=for-the-badge&logo=github&logoColor=white](https://img.shields.io/badge/BACKEND-GITHUB-181717?style=for-the-badge\&logo=github\&logoColor=white)" alt="Backend Repository" />
&#x20; \</a>
\</p>

---

## 🌟 About The Project

**Book Nook** is a full-stack book-sharing platform designed for book lovers. It provides a place where readers can discover books, share their own collections, borrow books from others, and manage their personal listings.

With a clean interface, secure authentication, and responsive design, Book Nook makes book sharing simple and enjoyable.

## ✨ Features

- 📖 Browse and discover books from the community library
- 🔍 Explore book details and availability
- ➕ Add new books to the library
- ✏️ Edit and delete your own book listings
- 🤝 Borrow books and return borrowed titles
- 🔐 Email and password authentication
- 🌐 Google authentication
- 👤 Manage personal profiles
- 🛡️ Protected routes and secure API requests
- 🔔 Interactive toast notifications
- 📱 Fully responsive across mobile, tablet, and desktop

## 🔗 Project Links

| Resource               | Link                                                             |
| ---------------------- | ---------------------------------------------------------------- |
| 🚀 Live Website        | [Visit Book Nook](https://book-nook-seven.vercel.app/)           |
| 💻 Frontend Repository | [Book Nook Client](https://github.com/fuyad254/Book-Nook)        |
| ⚙️ Backend Repository  | [Book Nook Server](https://github.com/fuyad254/Book-Nook-Server) |

## 🛠️ Technologies Used

### Frontend

\<p>   \<img src="[https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white](https://img.shields.io/badge/Next.js-000000?style=for-the-badge\&logo=next.js\&logoColor=white)" />   \<img src="[https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB)" />   \<img src="[https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)" />   \<img src="[https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge\&logo=tailwindcss\&logoColor=white)" /> \</p>

### Backend & Authentication

\<p>   \<img src="[https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=node.js\&logoColor=white)" />   \<img src="[https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white](https://img.shields.io/badge/Express.js-000000?style=for-the-badge\&logo=express\&logoColor=white)" />   \<img src="[https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge\&logo=mongodb\&logoColor=white)" />   \<img src="[https://img.shields.io/badge/Better_Auth-5A67D8?style=for-the-badge](https://img.shields.io/badge/Better_Auth-5A67D8?style=for-the-badge)" /> \</p>

- **Authentication:** Better Auth, Google OAuth, JWT
- **Database:** MongoDB
- **API Security:** JWT verification with JWKS
- **Libraries:** Swiper, React Icons, react-hot-toast

## 📄 Application Pages

| Page            | Route           | Access        |
| --------------- | --------------- | ------------- |
| 🏠 Home         | `/`             | Public        |
| 📚 All Books    | `/all-books`    | Public        |
| 📘 Book Details | `/book/[slug]`  | Authenticated |
| ➕ Add Book      | `/add-book`     | Authenticated |
| 🗂️ My Books    | `/my-books`     | Authenticated |
| 📥 My Borrows   | `/my-borrows`   | Authenticated |
| 👤 Profile      | `/profile`      | Authenticated |
| 🔑 Login        | `/login`        | Guest         |
| 📝 Registration | `/registration` | Guest         |

## 🏗️ Project Architecture

\`\`\`mermaid
flowchart TD
A[👤 User / Browser] --> B[⚛️ Next.js Frontend]
B --> C[🔐 Better Auth]
B -->|JWT Bearer Token| D[🚀 Express REST API]
D --> E[🛡️ JWT Verification]
E --> F[(🍃 MongoDB Database)]
\`\`\`

## 🚀 Getting Started

Follow these steps to run Book Nook locally.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/) v20 or later
- npm
- MongoDB database
- Google OAuth credentials (for Google login)

### 1️⃣ Clone the repositories

**Frontend:**

\`\`\`bash
git clone [https://github.com/fuyad254/Book-Nook.git](https://github.com/fuyad254/Book-Nook.git)
\`\`\`

**Backend:**

\`\`\`bash
git clone [https://github.com/fuyad254/Book-Nook-Server.git](https://github.com/fuyad254/Book-Nook-Server.git)
\`\`\`

### 2️⃣ Install dependencies

**Frontend:**

\`\`\`bash
cd Book-Nook
npm install
\`\`\`

**Backend** (open a separate terminal):

\`\`\`bash
cd Book-Nook-Server
npm install
\`\`\`

### 3️⃣ Configure environment variables

Create a `.env` file in the frontend root directory:

\`\`\`env
BETTER_AUTH_SECRET=your-long-random-secret
BETTER_AUTH_URL=[http://localhost:3000](http://localhost:3000)
MONGODB_CONNECT_URI=your-mongodb-connection-string

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

NEXT_PUBLIC_BETTER_AUTH_URL=[http://localhost:3000](http://localhost:3000)
NEXT_PUBLIC_API_URL=[http://localhost:5000](http://localhost:5000)
\`\`\`

Configure the backend `.env` file with the required database connection and client origin settings.

> ⚠️ Never commit your real credentials, API keys, or environment variables to GitHub.

### 4️⃣ Run the application

Start the backend server:

\`\`\`bash
cd Book-Nook-Server
npx nodemon index.js
\`\`\`

Start the frontend in another terminal:

\`\`\`bash
cd Book-Nook
npm run dev
\`\`\`

Open your browser and visit:

[**http://localhost:3000**](http://localhost:3000)

## 📜 Available Scripts

| Command         | Description                      |
| --------------- | -------------------------------- |
| `npm run dev`   | Start the development server     |
| `npm run build` | Build the project for production |
| `npm start`     | Run the production build         |
| `npm run lint`  | Run ESLint                       |

## 🔐 Security

- Better Auth handles authentication and sessions.
- Google OAuth is supported.
- JWT tokens are used for protected API requests.
- The Express server validates tokens through the Better Auth JWKS endpoint.
- Private routes require authenticated access.
- Sensitive environment variables should remain private.

---

## 👨‍💻 Author

**Fuyad**
Frontend Developer

\<p align="center">
&#x20; ⭐ If you like Book Nook, don't forget to star the repository!
\</p>
