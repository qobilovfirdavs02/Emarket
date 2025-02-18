#!/bin/sh

echo "Waiting for PostgreSQL to be ready..."
while ! pg_isready -h db -p 5432 -U eshop_user; do
  sleep 2
done

echo "PostgreSQL is ready, starting FastAPI..."

exec uvicorn main:app --host 0.0.0.0 --port 8000 --reload
