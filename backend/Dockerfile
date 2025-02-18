# Base image
FROM python:3.9

RUN apt-get update && apt-get install -y postgresql-client

WORKDIR /backend

# Kerakli kutubxonalarni o‘rnatish
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Barcha kodlarni konteynerga ko‘chirish
COPY . .

# `entrypoint.sh` fayliga ruxsat berish
RUN chmod +x /backend/entrypoint.sh

# Portni ochish
EXPOSE 8000

# Skript orqali backendni ishga tushirish
CMD ["/backend/entrypoint.sh"]
