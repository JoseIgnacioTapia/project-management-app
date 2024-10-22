import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma';
import { projectSchema } from '../schema/projectSchema';
import { z } from 'zod';

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        users: true,
        tasks: true,
      },
    });

    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({
      message: 'Error fetching projects',
    });
  }
};

export const getProject = (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({
    msg: 'getProject',
    id,
  });
};

export const postProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validatedData = projectSchema.parse(req.body);

    const { name, description, start_date, end_date, users, tasks } =
      validatedData;

    const existingProject = await prisma.project.findFirst({
      where: { name },
    });

    if (existingProject) {
      res.status(409).json({ message: 'Name Project is already registered' });
      return;
    }

    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        users: {
          create:
            users?.map((userId: string) => ({
              user: { connect: { id: userId } },
            })) || [],
        },
        tasks: {
          create:
            tasks?.map((task: any) => ({
              title: task.title,
              description: task.decription,
              state: task.state || 'PENDING',
              assigned_to: task.assigned_to,
            })) || [],
        },
      },
      include: {
        users: true,
      },
    });

    res
      .status(201)
      .json({ message: 'Project created successfully', project: newProject });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        message: 'Validation failed',
        errors: error.errors.map((e) => ({
          field: e.path[0],
          message: e.message,
        })),
      });
    }

    next(error);
  }
};

export const putProject = (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  res.json({
    msg: 'putProject',
    id,
    body,
  });
};

export const deleteProject = (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({
    msg: 'deleteProject',
    id,
  });
};
