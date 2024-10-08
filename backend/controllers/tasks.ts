import { Request, Response } from 'express';

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

export const postTask = (req: Request, res: Response) => {
  const { body } = req;

  res.json({
    msg: 'postTask',
    body,
  });
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
