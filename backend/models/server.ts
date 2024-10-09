import express, { Application } from 'express';
import cors from 'cors';
import projectRoutes from '../routes/project';
import taskRoutes from '../routes/task';

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    projects: '/projects',
    tasks: '/tasks',
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8000';

    this.middlewares();
    this.routes();
  }

  middlewares() {
    // CORS
    this.app.use(cors());
    // Lectura del body
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.apiPaths.projects, projectRoutes);
    this.app.use(this.apiPaths.tasks, taskRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en puerto ', this.port);
    });
  }
}

export default Server;
