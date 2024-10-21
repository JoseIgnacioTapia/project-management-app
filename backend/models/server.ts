import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import projectRoutes from '../routes/project';
import taskRoutes from '../routes/task';
import authRoutes from '../routes/auth';

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    projects: '/projects',
    tasks: '/tasks',
    auth: '/auth',
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8000';

    this.middlewares();
    this.routes();
    this.handleErrors();
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
    this.app.use(this.apiPaths.auth, authRoutes);
  }

  handleErrors() {
    // Route Not Found Hangled Error
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404).json({
        message: 'Resource not found',
      });
    });

    // General Server Errors
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(err);
        res.status(500).json({
          message: 'Internal Server Error!',
        });
      }
    );
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en puerto ', this.port);
    });
  }
}

export default Server;
