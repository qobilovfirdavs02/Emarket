# E-Commerce Project

This is a simple e-commerce project built with FastAPI for the backend, Next.js for the frontend, and PostgreSQL as the database.

## Project Structure
- **Backend**: FastAPI (Python)
- **Frontend**: Next.js (React)
- **Database**: PostgreSQL 15+

## Setup and Installation

### 1. Create a Virtual Environment for FastAPI

```bash
python -m venv .venv
source .venv/bin/activate  # On Windows use `.venv\Scripts\activate`
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Start the Application Using Docker Compose

Ensure Docker is installed and running, then execute:

```bash
docker-compose up -d
```

### 4. Access the Application

- Open the frontend in your browser: [http://localhost:3000](http://localhost:3000)
- Test API endpoints using Swagger UI: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

### 5. Database Migration

If there are database errors, ensure tables are created according to the models in `backend/models.py`. If necessary, stop Docker Compose and restart it.

```bash
docker-compose down
docker-compose up -d
```

This should resolve any database issues and create the necessary tables automatically.

---

Enjoy building your e-commerce application! 🚀

