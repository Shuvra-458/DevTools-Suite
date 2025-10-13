# Dockerfile
FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# system deps for mysqlclient, netcat
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    default-libmysqlclient-dev \
    netcat \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# install pip deps
COPY requirements.txt /app/requirements.txt
RUN pip install --upgrade pip
RUN pip install -r /app/requirements.txt

# copy project
COPY . /app

# ensure entrypoint is executable
RUN chmod +x /app/entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["gunicorn", "devtools_suite.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3", "--log-level", "info"]
