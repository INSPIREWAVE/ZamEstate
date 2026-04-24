# Zam Estate 🏠

A property rental platform where clients browse listings and agents/landlords post properties. Built with React, Node.js/Express, PostgreSQL, and JWT authentication.

## Project Structure

```
ZamEstate/
├── backend/
│   ├── src/
│   │   ├── config/db.js
│   │   ├── controllers/authController.js
│   │   ├── models/userModel.js
│   │   ├── routes/authRoutes.js
│   │   ├── middleware/authMiddleware.js
│   │   └── server.js
│   ├── .env
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── public/index.html
    ├── src/
    │   ├── pages/Login.js
    │   ├── pages/Register.js
    │   ├── App.js
    │   └── index.js
    ├── .env
    ├── .env.example
    └── package.json
```

## Prerequisites

- Node.js v18+
- PostgreSQL (running locally or remote)
- npm

## Setup & Running

### 1. Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE zamestate;
```

The `users` table is created automatically on backend startup.

### 2. Backend

```bash
cd backend
npm install
```

Copy and edit the environment file:

```bash
cp .env.example .env
# Edit .env with your PostgreSQL credentials and a strong JWT secret
```

Run in development mode (with auto-reload):

```bash
npm run dev
```

Or run normally:

```bash
npm start
```

The API will be available at `http://localhost:5000`.

### 3. Frontend

```bash
cd frontend
npm install
```

Copy the environment file (edit if your backend runs on a different URL):

```bash
cp .env.example .env
```

Start the React app:

```bash
npm start
```

The frontend will be available at `http://localhost:3000`.

## API Endpoints

| Method | Endpoint              | Description          | Auth Required |
|--------|-----------------------|----------------------|---------------|
| GET    | /api/health           | Health check         | No            |
| POST   | /api/auth/register    | Register a new user  | No            |
| POST   | /api/auth/login       | Login and get token  | No            |

### Register

**POST** `/api/auth/register`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123",
  "role": "client"
}
```

Response:
```json
{
  "message": "User registered successfully",
  "user": { "id": 1, "name": "John Doe", "email": "john@example.com", "role": "client", "created_at": "..." }
}
```

### Login

**POST** `/api/auth/login`

```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

Response:
```json
{
  "message": "Login successful",
  "token": "<jwt_token>",
  "user": { "id": 1, "name": "John Doe", "email": "john@example.com", "role": "client", "created_at": "..." }
}
```

## Environment Variables

### Backend (`backend/.env`)

| Variable       | Description                          | Example                                           |
|----------------|--------------------------------------|---------------------------------------------------|
| PORT           | Port for the Express server          | `5000`                                            |
| DATABASE_URL   | PostgreSQL connection string         | `postgresql://postgres:pass@localhost:5432/zamestate` |
| JWT_SECRET     | Secret key for signing JWTs          | `change_this_to_a_random_string`                  |

### Frontend (`frontend/.env`)

| Variable             | Description                | Example                    |
|----------------------|----------------------------|----------------------------|
| REACT_APP_API_URL    | Backend API base URL       | `http://localhost:5000`    |

## Tech Stack

- **Frontend:** React 18, React Router v6, Axios
- **Backend:** Node.js, Express 4, CORS, dotenv
- **Database:** PostgreSQL with `pg` connection pool
- **Auth:** JWT (`jsonwebtoken`), bcrypt for password hashing
