## Backend
1. Instala las dependencias:
   ```bash
   pnpm install

2. Levantar servidor
   ```bash
   npx nodemon dist/app.js
3. Compilar Typescript
   ```bash
   npx tsc --watch
2. Crea un archivo .env en la raíz del proyecto backend/.env y añade la URL de conexión a tu base de datos:
   ```bash
    Local Host
    PORT=8000

    DATABASE_URL="postgresql://usuario:password@localhost:5432/projectsdb?schema=public"
