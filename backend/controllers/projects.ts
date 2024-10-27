import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma';
import { projectSchema, updateProjectSchema } from '../schema/projectSchema';
import { z, ZodError } from 'zod';

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        status: 1,
      },
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

export const getProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const projectId = Number(id);

    if (isNaN(projectId)) {
      res.status(400).json({ message: 'Invalid project ID' });
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId, status: 1 },
      include: {
        users: true,
        tasks: true,
      },
    });

    if (!project) {
      res.status(404).json({ message: 'Project not found or inactive' });
    }

    res.status(200).json({ project });
  } catch (error) {
    next(error);
  }
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

export const putProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    const validateData = projectSchema
      .omit({ tasks: true, users: true })
      .parse(req.body);

    const existingProject = await prisma.project.findUnique({
      where: { id: parseInt(id), status: 1 },
    });
    if (!existingProject) {
      res.status(404).json({ message: 'Project not found or inactive' });
      return;
    }

    const updatedProject = await prisma.project.update({
      where: { id: parseInt(id) },
      data: {
        name: validateData.name,
        description: validateData.description,
        start_date: new Date(validateData.start_date),
        end_date: new Date(validateData.end_date),
      },
    });

    res.status(200).json({
      message: 'Project updated successfully',
      project: updatedProject,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        message: 'Validation failed',
        errors: error.errors.map((err) => ({
          path: err.path,
          message: err.message,
        })),
      });
    }
    next(error);
  }
};

export const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const existingProject = await prisma.project.findUnique({
      where: { id: parseInt(id), status: 1 },
    });

    if (!existingProject) {
      res
        .status(404)
        .json({ message: 'Project not found or already inactive' });
      return;
    }

    const updatedProject = await prisma.project.update({
      where: { id: parseInt(id) },
      data: { status: 0 },
    });

    res.status(200).json({
      message: 'Project marked as inactive successfully',
      project: updatedProject,
    });
  } catch (error) {
    next(error);
  }
};
