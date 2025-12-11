# MERN Job Portal

A full-stack Job Portal application built with the MERN stack (MongoDB, Express.js, React, Node.js). This project allows users to register as job seekers or recruiters, apply for jobs, manage companies, and more.

---

⚠️ Note: Backend is hosted on a free Render tier.  
It may take 30–60 seconds to wake up after inactivity.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Backend API Routes](#backend-api-routes)
  - [User Routes](#user-routes)
  - [Company Routes](#company-routes)
  - [Job Routes](#job-routes)
  - [Application Routes](#application-routes)
- [Environment Variables](#environment-variables)
- [License](#license)

---

## Features

- User authentication (register, login, logout)
- Role-based access (student/job-seeker, recruiter)
- Company management (create, update, view)
- Job posting and management
- Job application and applicant tracking
- Profile management with file uploads (profile photo, resume)
- Admin dashboard for recruiters

---

## Project Structure

```
backend/
  controllers/
  middlewares/
  models/
  routes/
  utils/
  .env
  index.js
  package.json
frontend/
  public/
  src/
  package.json
  tailwind.config.js
  ...
```

---

## Backend Setup

1. Install dependencies:
   ```sh
   cd backend
   npm install
   ```
2. Create a `.env` file with your MongoDB URI, Cloudinary credentials, and JWT secret.
3. Start the backend server:
   ```sh
   npm run dev
   ```
   The backend runs on `http://localhost:8000`.

---

## Frontend Setup

1. Install dependencies:
   ```sh
   cd frontend
   npm install
   ```
2. Start the frontend server:
   ```sh
   npm run dev
   ```
   The frontend runs on `http://localhost:5173`.

---

## Backend API Routes

All backend routes are prefixed with `/auth`.

### User Routes

| Method | Endpoint                              | Description                                 | Auth Required | Body/Form Data                |
|--------|---------------------------------------|---------------------------------------------|---------------|-------------------------------|
| POST   | `/auth/user/register-user`            | Register a new user (with profile photo)    | No            | fullname, email, phoneNumber, password, role, file (profile photo) |
| POST   | `/auth/user/login-user`               | Login user                                  | No            | email, password, role         |
| POST   | `/auth/user/logout`                   | Logout user                                 | Yes           | -                             |
| POST   | `/auth/user/profile/update-user`      | Update user profile (with file upload)      | Yes           | fullname, email, phoneNumber, bio, skills, file (resume/profile photo) |

### Company Routes

| Method | Endpoint                              | Description                                 | Auth Required | Body/Form Data                |
|--------|---------------------------------------|---------------------------------------------|---------------|-------------------------------|
| POST   | `/auth/company/registercompany`       | Register a new company                      | Yes           | companyName                   |
| GET    | `/auth/company/Company`               | Get all companies for the recruiter         | Yes           | -                             |
| GET    | `/auth/company/Company/:id`           | Get company by ID                           | Yes           | -                             |
| PUT    | `/auth/company/updatecompany/:id`     | Update company info (with logo upload)      | Yes           | name, description, website, location, file (logo) |

### Job Routes

| Method | Endpoint                              | Description                                 | Auth Required | Body/Form Data                |
|--------|---------------------------------------|---------------------------------------------|---------------|-------------------------------|
| POST   | `/auth/job/register`                  | Post a new job                              | Yes           | title, description, requirements, salary, location, jobType, experience, position, companyId |
| GET    | `/auth/job/alljob`                    | Get all jobs (with optional search)         | Yes           | -                             |
| GET    | `/auth/job/alljob/:id`                | Get job details by ID                       | Yes           | -                             |
| GET    | `/auth/job/adminjobs`                 | Get all jobs posted by the recruiter        | Yes           | -                             |

### Application Routes

| Method | Endpoint                              | Description                                 | Auth Required | Body/Form Data                |
|--------|---------------------------------------|---------------------------------------------|---------------|-------------------------------|
| GET    | `/auth/application/apply-job/:id`     | Apply for a job (by job ID)                 | Yes           | -                             |
| GET    | `/auth/application/applied-jobs`      | Get all jobs applied by the user            | Yes           | -                             |
| GET    | `/auth/application/:id/applicants`    | Get all applicants for a job (by job ID)    | Yes           | -                             |
| POST   | `/auth/application/update-status/:id/update` | Update application status (accept/reject) | Yes           | status                        |

---

## Environment Variables

Create a `.env` file in the backend directory with the following:

```
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
SALT=10
```

---

## License

This project is for educational purposes.

---

## Notes

- All file uploads (profile photo, company logo, resume) are handled via Cloudinary.
- Authentication is managed using JWT and cookies.
- Role-based access is enforced for recruiter/admin routes.
- For more details, see the code in the [backend/controllers](backend/controllers/) and [backend/routes](backend/routes/) folders.

---
