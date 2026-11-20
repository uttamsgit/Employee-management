
# Employee Center

A responsive 3-tier Employee Management System built with React, Express, Prisma, and PostgreSQL.

## Features
- Dashboard with employee, active, department and payroll summary cards
- Employee directory with search and status filtering
- Create, view, edit, archive and permanently delete employee records
- Employee profiles with contact, job, salary and employment dates
- Department management
- Salary details and employment lifecycle status
- JWT login with seeded administrator
- Password hashing, validation, parameterized ORM access and protected API routes
- Docker Compose for PostgreSQL, API and frontend
- Prisma migrations/schema and seed data

## Quick start (Docker)

Requirements: Docker Desktop / Docker Engine with Compose.

1. Extract this ZIP.
2. From the project directory, copy `.env.example` to `.env`.
3. Start everything:

```bash
docker compose up --build
```

4. Open:
   - Frontend: http://localhost:5173
   - API health: http://localhost:4000/api/health

Default login:
- Email: `admin@employeecenter.local`
- Password: `Admin@12345`

Change `JWT_SECRET` and the seeded admin password before using this outside local development.

## Local development (without Docker)

Requirements: Node.js 20+, PostgreSQL 15+.

### Database
Create a database named `employee_center`, then set `DATABASE_URL` in `backend/.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/employee_center?schema=public"
JWT_SECRET="replace-with-a-long-random-secret"
PORT=4000
ADMIN_EMAIL="admin@employeecenter.local"
ADMIN_PASSWORD="Admin@12345"
```

### .env file
POSTGRES_DB=employee_center
POSTGRES_USER=employee_admin
POSTGRES_PASSWORD=change_this_db_password
JWT_SECRET=change_this_to_a_long_random_secret
ADMIN_EMAIL=admin@employeecenter.local
ADMIN_PASSWORD=Admin@12345

### Backend

```bash
cd backend
npm install
npx prisma migrate dev --name init
npm run seed
npm run dev
```

### Frontend

In another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at http://localhost:5173 and proxies `/api` to http://localhost:4000.

## Project structure

```text
employee-center/
├── backend/
│   ├── prisma/schema.prisma
│   ├── src/
│   │   ├── middleware/auth.js
│   │   ├── routes/
│   │   ├── lib/prisma.js
│   │   ├── server.js
│   │   └── seed.js
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── Dockerfile
└── docker-compose.yml
```

## API overview

All endpoints except `/api/auth/login` and `/api/health` require `Authorization: Bearer <token>`.

- `POST /api/auth/login`
- `GET /api/dashboard`
- `GET /api/employees?search=&status=`
- `POST /api/employees`
- `GET /api/employees/:id`
- `PUT /api/employees/:id`
- `DELETE /api/employees/:id` (archives employee)
- `DELETE /api/employees/:id/permanent` (permanent delete)
- `GET /api/departments`
- `POST /api/departments`
- `PUT /api/departments/:id`
- `DELETE /api/departments/:id`

## Notes
- Employee delete from the UI is a soft delete (status becomes `INACTIVE`) to preserve HR history.
- Permanent deletion is available in the API but should be restricted further before production.
- This is a strong learning-project baseline, not a legally compliant payroll/HR product. Add audit logging, backups, MFA, fine-grained permissions, secrets management, rate limiting, HTTPS and formal security review before production use.
