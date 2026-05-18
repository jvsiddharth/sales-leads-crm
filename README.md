# Smart Leads Dashboard

A production-style full-stack Lead Management CRM built using the MERN stack with TypeScript, RBAC authentication, advanced filtering, pagination, debounced search, Docker support, and a modern responsive UI.

---

# Live Demo

## Frontend
Add deployed frontend URL here.

```txt
https://your-frontend-url.vercel.app
```

## Backend API
Add deployed backend URL here.

```txt
https://your-backend-url.onrender.com
```

---

# GitHub Repository

```txt
https://github.com/jvsiddharth/sales-leads-crm
```

---

# Features

## Authentication & Authorization

- JWT Authentication
- Secure Login & Registration
- Password Hashing using bcrypt
- Protected Routes
- Persistent Authentication
- Role-Based Access Control (RBAC)

### Roles

#### Admin
- Create Leads
- Edit Leads
- Delete Leads
- View Leads
- Export CSV

#### Sales User
- View Leads
- Search & Filter Leads
- Export CSV

---

# Leads Management

Complete CRUD system for leads.

## Lead Fields

- Name
- Email
- Status
  - New
  - Contacted
  - Qualified
  - Lost
- Source
  - Website
  - Instagram
  - Referral
- Created At

---

# Advanced Features

## Filtering

- Filter by Status
- Filter by Source
- Search by Name
- Search by Email
- Combined Filtering

## Sorting

- Latest
- Oldest

## Pagination

- Backend Pagination
- 10 Records Per Page
- Pagination Metadata

## Debounced Search

- Optimized API calls
- Better UX
- Reduced unnecessary renders

## CSV Export

- Export currently filtered leads
- Instant client-side CSV generation

## Dark Mode

- Persistent Theme
- Local Storage Support
- Fully themed UI components

---

# Tech Stack

## Frontend

- React.js
- TypeScript
- TailwindCSS
- React Query
- Zustand
- React Hook Form
- Zod
- Framer Motion
- Axios
- React Hot Toast

## Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT
- bcrypt
- Zod

## DevOps

- Docker
- Docker Compose

---

# Project Architecture

## Frontend Structure

```txt
client/
│
├── src/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── schemas/
│   ├── store/
│   ├── lib/
│   ├── types/
│   └── routes/
```

---

## Backend Structure

```txt
server/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── validators/
│   ├── utils/
│   └── types/
```

---

# Frontend Setup

## Install Dependencies

```bash
cd client

npm install
```

---

## Environment Variables

Create `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Run Frontend

```bash
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

# Backend Setup

## Install Dependencies

```bash
cd server

npm install
```

---

## Environment Variables

Create `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

## Run Backend

```bash
npm run dev
```

Backend runs on:

```txt
http://localhost:5000
```

---

# Docker Setup

## Run Entire Application

From project root:

```bash
docker-compose up --build
```

---

# API Documentation

---

# Authentication APIs

## Register User

### Endpoint

```http
POST /api/auth/register
```

### Request Body

```json
{
  "name": "Siddharth",
  "email": "admin@test.com",
  "password": "password123",
  "role": "admin"
}
```

### Response

```json
{
  "user": {
    "id": "123",
    "name": "Siddharth",
    "email": "admin@test.com",
    "role": "admin"
  },
  "token": "jwt_token"
}
```

---

## Login User

### Endpoint

```http
POST /api/auth/login
```

### Request Body

```json
{
  "email": "admin@test.com",
  "password": "password123"
}
```

---

# Leads APIs

All routes require authentication.

---

## Get Leads

### Endpoint

```http
GET /api/leads
```

### Query Params

| Param | Description |
|---|---|
| page | Pagination |
| search | Name/Email search |
| status | Lead status |
| source | Lead source |
| sort | latest/oldest |

### Example

```http
GET /api/leads?page=1&status=qualified&source=instagram&search=rahul
```

---

## Create Lead

### Endpoint

```http
POST /api/leads
```

### Authorization

Admin Only

### Request Body

```json
{
  "name": "Rahul",
  "email": "rahul@test.com",
  "status": "qualified",
  "source": "instagram"
}
```

---

## Update Lead

### Endpoint

```http
PUT /api/leads/:id
```

---

## Delete Lead

### Endpoint

```http
DELETE /api/leads/:id
```

### Authorization

Admin Only

---

# Validation

The project uses Zod for:
- Request validation
- Form validation
- Type-safe schemas

---

# State Management

## Zustand

Used for:
- Authentication State
- Persistent User Session

---

# Data Fetching

## React Query

Used for:
- API caching
- Background refetching
- Optimistic UI patterns
- Mutation handling

---

# Security Features

- JWT Authentication
- Password Hashing
- Protected APIs
- Role-Based Authorization
- Environment Variables
- Input Validation
- Centralized Error Handling

---

# UI/UX Features

- Responsive Design
- Reusable Components
- Smooth Animations
- Dark Mode
- Loading States
- Error States
- Empty States
- Accessible Forms

---

# Performance Optimizations

- Debounced Search
- Backend Pagination
- Memoization
- Query Caching
- Component Reusability

---

# Demo Credentials

## Admin

```txt
Email: admin@test.com
Password: password123
```

---

## Sales User

```txt
Email: sales@test.com
Password: password123
```

---

# Future Improvements

- Refresh Tokens
- Audit Logs
- Real-time Updates
- Lead Analytics Dashboard
- Unit & Integration Tests
- CI/CD Pipelines
- File Upload Support

---

# Author

## Siddharth
GitHub:
```txt
https://github.com/jvsiddharth
```
