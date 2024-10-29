import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma';
import { taskSchema } from '../schema/taskSchema';
import { ZodError } from 'zod';

export const getTask = (req: Request, res: Response) => {
  const { project_id } = req.query;

  //   if (!project_id) {
  //     return res.status(400).json({
  //       msg: 'Project ID is required to filter tasks',
  //     });
  //   }

  // La lógica para obtener las tareas por project_id desde la base de datos.

  res.json({
    msg: 'getTask',
    project_id,
    // Las tareas filtradas:
    tasks: [], // Array de las tareas filtradas por project_id
  });
};

export const postTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validatedData = taskSchema.parse(req.body);

    const { title, description, state, project_id, assigned_to } =
      validatedData;

    const projectExists = await prisma.project.findUnique({
      where: { id: project_id },
    });

    if (!projectExists) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }

    const userExists = await prisma.user.findUnique({
      where: { id: assigned_to },
    });

    if (!userExists) {
      res.status(404).json({ message: 'Assigned user not found' });
      return;
    }

    // Check if a task with the same title already exists in the project
    const existingTask = await prisma.task.findFirst({
      where: {
        title,
        project_id,
      },
    });

    if (existingTask) {
      res.status(409).json({
        message: 'A task with the same title already exists in this project',
      });
      return;
    }

    // Create task
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        state,
        project: { connect: { id: project_id } },
        user: { connect: { id: assigned_to } },
      },
    });

    res
      .status(201)
      .json({ message: 'Task created succesfully', task: newTask });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        message: 'Validation failed',
        errors: error.errors.map((err) => ({
          path: err.path,
          message: err.message,
        })),
      });
    } else {
      next(error);
    }
  }
};

export const patchTask = (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  res.json({
    msg: 'patchTask',
    id,
    body,
  });
};
