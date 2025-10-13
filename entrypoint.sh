#!/usr/bin/env bash
set -e

# default values
DB_HOST=${DB_HOST:-localhost}
DB_PORT=${DB_PORT:-3306}

echo "Waiting for DB ${DB_HOST}:${DB_PORT}..."

# wait for mysql to be reachable (netcat must be available in image)
until nc -z "$DB_HOST" "$DB_PORT"; do
  >&2 echo "DB is unavailable - sleeping"
  sleep 1
done

echo "DB is up - running migrations"
python manage.py migrate --noinput

# collect static in production-like mode (toggle with env)
if [ "${DJANGO_COLLECTSTATIC:-0}" = "1" ] || [ "${DJANGO_ENV:-}" = "production" ]; then
  echo "Collecting static files"
  python manage.py collectstatic --noinput
fi

# create superuser if env vars present (optional)
if [ -n "${DJANGO_SUPERUSER_USERNAME:-}" ] && [ -n "${DJANGO_SUPERUSER_EMAIL:-}" ] && [ -n "${DJANGO_SUPERUSER_PASSWORD:-}" ]; then
  echo "Creating superuser (if not exists)"
  python manage.py createsuperuser --no-input || true
fi

exec "$@"
