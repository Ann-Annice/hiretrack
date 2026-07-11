# HireTrack – Recruitment Management System

## Product Name

**HireTrack – Recruitment Management System**

A full-stack web application for managing the recruitment process, including jobs, candidates, interviews, and user authentication.

---

# Features

### Authentication
- User Registration
- Secure Login
- Logout
- JWT Authentication
- Protected Routes

### Dashboard
- Recruitment Statistics
- Recent Jobs
- Recent Candidates
- Upcoming Interviews

### Job Management
- Add Job
- Edit Job
- Delete Job
- Search Jobs
- Filter by Status

### Candidate Management
- Add Candidate
- Edit Candidate
- Delete Candidate
- Search Candidates
- Filter by Status
- Candidate Profile

### Interview Management
- Schedule Interview
- Edit Interview
- Delete Interview
- Search Interviews
- Filter by Interview Type

---

# Tech Stack

## Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

## Backend
- Next.js API Routes

## Database
- PostgreSQL (Supabase)

## ORM
- Prisma

## Authentication
- JWT
- bcryptjs

---

# Quick Start

## Clone Repository

```bash
git clone https://github.com/Ann-Annice/hiretrack.git
```

## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

Create a `.env` file:

```env
DATABASE_URL=your_database_url
DIRECT_URL=your_direct_database_url
AUTH_SECRET=your_secret_key
```

## Generate Prisma Client

```bash
npx prisma generate
```

## Run Migrations

```bash
npx prisma migrate dev
```

## Start Development Server

```bash
npm run dev
```

Visit:

```
http://localhost:3000
```

---

# Environment Variables

| Variable | Description |
|----------|-------------|
| DATABASE_URL | PostgreSQL database connection |
| DIRECT_URL | Prisma direct connection |
| AUTH_SECRET | JWT secret key |

---

# Architecture

```
Authentication
        │
        ▼
 Dashboard
 ├── Jobs
 ├── Candidates
 └── Interviews
```

---

# Testing

The following features were tested successfully:

- User Registration
- User Login
- Logout
- Dashboard
- Job CRUD
- Candidate CRUD
- Interview CRUD
- Search
- Filters
- Protected Routes

---

# Roadmap

## Completed

- Authentication
- Dashboard
- Job Management
- Candidate Management
- Interview Management
- Search and Filters

## Future Improvements

- Resume Upload
- Email Notifications
- Calendar View
- Reports
- Analytics Dashboard

---

# Screenshots

Add screenshots here after uploading them to GitHub.

Example:

```markdown
## Login

![Login](screenshots/login.png)

## Dashboard

![Dashboard](screenshots/dashboard.png)

## Jobs

![Jobs](screenshots/jobs.png)

## Candidates

![Candidates](screenshots/candidates.png)

## Interviews

![Interviews](screenshots/interviews.png)
```

---

# Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Administrator | admin@example.com | admin123 |

Replace these with your own demo credentials before submitting.

---

# License

This project was developed for academic purposes.

---

# Author

**Ann Annice**

GitHub: https://github.com/Ann-Annice