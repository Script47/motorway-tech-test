FROM postgres:14-alpine as motorway-test-backend
WORKDIR /app
COPY init.sh /docker-entrypoint-initdb.d
COPY dump.sql ./scripts/motorway-test-backend/dump.sql
