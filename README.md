1. Instala las dependencias:
   ```bash
   pnpm install
2. Crea un archivo .env en la raíz del proyecto backend/.env y añade la URL de conexión a tu base de datos:
   ```bash
Local Host
PORT=8000

# This was inserted by `prisma init`:
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="postgresql://usuario:password@localhost:5432/projectsdb?schema=public"
   ```
