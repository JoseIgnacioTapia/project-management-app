import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma';
import { taskSchema } from '../schema/taskSchema';
import { ZodError } from 'zod';

export const getTasksByProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { project_id } = req.query;

    const projectId = parseInt(project_id as string);
    if (isNaN(projectId)) {
      res.status(400).json({ message: 'Invalid project ID' });
      return;
    }

    const projectExists = await prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!projectExists) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }

    // Get Tasks by Project
    const tasks = await prisma.task.findMany({
      where: { project_id: projectId },
      include: {
        user: true,
      },
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks', error);
    next(error);
  }
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

    // Update the ProjectUser table to reflect the user's assignment to the project
    await prisma.projectUser.upsert({
      where: {
        user_id_project_id: {
          user_id: assigned_to,
          project_id: project_id,
        },
      },
      update: {},
      create: {
        user_id: assigned_to,
        project_id: project_id,
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
