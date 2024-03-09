import * as express from 'express';
import { addCourse, getAllCourses, deleteCourse } from '../controllers/courseController';

const courseRouter = express.Router();

// Define routes
courseRouter.post('/courses', addCourse);
courseRouter.get('/courses', getAllCourses);
courseRouter.delete('/courses/:id', deleteCourse);

export default courseRouter;
