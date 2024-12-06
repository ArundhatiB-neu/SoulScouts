import express from 'express';
import { verifyToken } from '../middlewares/auth.middleware';
const { addProgram, getPrograms, updateProgram, deleteProgram } = require('./controllers/program.controllers');


const programRouter = express.Router();

programRouter.post('/', verifyToken, getPrograms);
programRouter.post('/', verifyToken, addProgram);
programRouter.put('/:id', verifyToken, updateProgram);
programRouter.delete('/:id', verifyToken, deleteProgram);


export default programRouter;