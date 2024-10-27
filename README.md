## Backend

### 1. Instala las dependencias:

```bash
pnpm install

```

### 2. Levantar servidor

```bash
npx nodemon dist/app.js
```

### 3. Compilar Typescript

```bash
npx tsc --watch
```

### 4. Crea un archivo .env en la raíz del proyecto backend/.env y añade la URL de conexión a tu base de datos:

```bash
 Local Host
 PORT=8000

 DATABASE_URL="postgresql://usuario:password@localhost:5432/projectsdb?schema=public"
```

### 5. After making changes to the Prisma model

```bash
npx prisma migrate dev --name <migrate_name>
npx prisma studio
npx prisma generate
```
