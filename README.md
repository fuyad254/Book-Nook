📚 Book Nook
<p align="center">
<strong>{=html}A community-powered online library to discover, share,
borrow, and return books.`</strong>`{=html}
</p>
<p align="center">
<a href="https://book-nook-seven.vercel.app/">{=html}`<img src="https://img.shields.io/badge/Live_Demo-Visit_Book_Nook-2F855A?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo">`{=html}`</a>`{=html}
<a href="https://github.com/fuyad254/Book-Nook">{=html}`<img src="https://img.shields.io/badge/Frontend-GitHub-181717?style=for-the-badge&logo=github" alt="Frontend repository">`{=html}`</a>`{=html}
<a href="https://github.com/fuyad254/Book-Nook-Server">{=html}`<img src="https://img.shields.io/badge/Backend-GitHub-181717?style=for-the-badge&logo=github" alt="Backend repository">`{=html}`</a>`{=html}
</p>
🌐 Project Links
  🔗 Resource                                                   Description
  🚀 Live Demo       Explore the deployed application

  💻 Frontend                                                Next.js application source code
Repository          
⚙️ Backend                                                 Express API source code
Repository
✨ About the Project
Book Nook is a full-stack book-sharing platform where readers can
explore a community library, share books, borrow titles, and manage
their own book collections. It features authentication, member-only
pages, and a responsive interface.
🚀 Features
- 📖 Browse the complete book collection
- 🔎 View book details and availability
- 📚 Add books to the community library
- ✏️ Manage your listed books (edit and delete)
- 🤝 Borrow books and return borrowed titles
- 🔐 Sign up and sign in with email/password
- 🌐 Google authentication
- 👤 Member profile management
- 🛡️ Protected routes and JWT-secured API requests
- 🔔 Toast notifications for user actions
- 📱 Responsive design for desktop, tablet, and mobile
🧰 Tech Stack
Frontend
<p>
<img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white" alt="Next.js">{=html}
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React">{=html}
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">{=html}
<img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">{=html}
</p>
Backend & Services
<p>
<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js">{=html}
<img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white" alt="Express">{=html}
<img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB">{=html}
<img src="https://img.shields.io/badge/Better_Auth-Authentication-5A67D8?style=flat-square" alt="Better Auth">{=html}
</p>
- Authentication: Better Auth, Google OAuth, JWT
- Libraries: Swiper, React Icons, react-hot-toast
- API security: JWT verification with JWKS
🧭 Application Pages
  Page                  Route                       Access
  🏠 Home               /                         Public
📚 All Books          /all-books                Public
📘 Book Details       /book/[sulg]              Signed-in users
➕ Add Book           /add-book                 Signed-in users
🗂️ My Books           /my-books                 Signed-in users
📥 My Borrows         /my-borrows               Signed-in users
👤 Profile            /profile                  Signed-in users
🔑 Login / Register   /login, /registration   Guests
🏗️ Architecture Overview
                  ┌──────────────────────┐
                  │      Browser        │
                  └──────────┬───────────┘
                             │
                  ┌──────────▼───────────┐
                  │   Next.js Frontend   │
                  │  Better Auth + JWT   │
                  └──────────┬───────────┘
                             │ Bearer Token
                  ┌──────────▼───────────┐
                  │    Express REST API   │
                  │   JWT verification    │
                  └──────────┬───────────┘
                             │
                  ┌──────────▼───────────┐
                  │      MongoDB          │
                  │ Books & Borrow Data   │
                  └──────────────────────┘
⚙️ Getting Started
Prerequisites
- Node.js 20+
- npm
- MongoDB database
- Google OAuth credentials (for Google sign-in)
1️⃣ Clone the repositories
git clone https://github.com/fuyad254/Book-Nook.git
git clone https://github.com/fuyad254/Book-Nook-Server.git
2️⃣ Install dependencies
Frontend:
cd Book-Nook
npm install
Backend (in a second terminal):
cd Book-Nook-Server
npm install
3️⃣ Configure environment variables
Create a .env file in the frontend root:
BETTER_AUTH_SECRET=your-long-random-secret
BETTER_AUTH_URL=http://localhost:3000
MONGODB_CONNECT_URI=your-mongodb-connection-string

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000
Configure the backend's .env file with its MongoDB connection and
frontend client origin as required by the server configuration. Never
commit real credentials or secrets.
4️⃣ Start the application
Start the backend:
npx nodemon index.js
Start the frontend from the frontend project directory:
npm run dev
Open http://localhost:3000 to view the app.
📜 Frontend Scripts
  Command           Description
  npm run dev     Start the development server
npm run build   Build the application for production
npm start       Run the production build
npm run lint    Run ESLint
🔒 Authentication & Security
- Better Auth manages authentication and sessions.
- Google sign-in is supported.
- JWT tokens are sent to protected API routes as Bearer tokens.
- The Express backend verifies tokens using the Better Auth JWKS
  endpoint.
- Member-only routes require an authenticated session.
👨‍💻 Author
Fuyad --- Frontend Developer
<p align="center">
⭐ If you like this project, consider giving it a star!
</p>
