import * as express from 'express';
import { addResult, getAllResults, deleteResultsByStudentId, deleteResultsByCourseId } from '../controllers/resultController';

const resultRouter = express.Router();

// Define routes
resultRouter.post('/results', addResult);
resultRouter.get('/results', getAllResults);
resultRouter.delete('/results/student/:studentId', deleteResultsByStudentId);
resultRouter.delete('/results/course/:courseId', deleteResultsByCourseId);

export default resultRouter;
