import express, { Application } from 'express';
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

    this.routes();
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
