import { Request, Response } from 'express';

export const getProjects = (req: Request, res: Response) => {
  res.json({
    msg: 'getProjects',
  });
};

export const getProject = (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({
    msg: 'getProject',
    id,
  });
};

export const postProject = (req: Request, res: Response) => {
  const { body } = req;

  res.json({
    msg: 'postProject',
    body,
  });
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
