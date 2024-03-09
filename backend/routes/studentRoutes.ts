import * as express from 'express';
import { addStudent, getAllStudents, getStudentById, deleteStudent } from '../controllers/studentController';

const studentRoutes = express.Router();

studentRoutes.post('/students', addStudent);
studentRoutes.get('/students', getAllStudents);
studentRoutes.get('/students/:id', getStudentById);
studentRoutes.delete('/students/:id', deleteStudent);

export default studentRoutes;
