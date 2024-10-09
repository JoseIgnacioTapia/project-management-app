-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,
    "rol" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proyecto" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "fecha_finalizacion" TIMESTAMP(3) NOT NULL,
    "usuario_id" INTEGER NOT NULL,

    CONSTRAINT "Proyecto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tarea" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "proyecto_id" INTEGER NOT NULL,
    "asignada_a" INTEGER NOT NULL,

    CONSTRAINT "Tarea_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Proyecto" ADD CONSTRAINT "Proyecto_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarea" ADD CONSTRAINT "Tarea_proyecto_id_fkey" FOREIGN KEY ("proyecto_id") REFERENCES "Proyecto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarea" ADD CONSTRAINT "Tarea_asignada_a_fkey" FOREIGN KEY ("asignada_a") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
