"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchTask = exports.postTask = exports.getTask = void 0;
const getTask = (req, res) => {
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
exports.getTask = getTask;
const postTask = (req, res) => {
    const { body } = req;
    res.json({
        msg: 'postTask',
        body,
    });
};
exports.postTask = postTask;
const patchTask = (req, res) => {
    const { id } = req.params;
    const { body } = req;
    res.json({
        msg: 'patchTask',
        id,
        body,
    });
};
exports.patchTask = patchTask;
//# sourceMappingURL=tasks.js.map