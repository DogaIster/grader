import { Request, Response } from 'express';
import { addCourseToDB, getAllCoursesFromDB, deleteCourseFromDB } from '../db/courseDatabase';

// Add a new course
export const addCourse = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;

        // Basic validation
        if (!name) {
            return res.status(400).json({ error: 'Course name is required' });
        }

        // Call the function to add a new course to the database
        await addCourseToDB(name);

        res.status(201).json({ message: 'Course added successfully' });
    } catch (error) {
        console.error('Error adding course:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all courses
export const getAllCourses = async (req: Request, res: Response) => {
    try {
        // Call the function to retrieve all courses from the database
        const courses = await getAllCoursesFromDB();

        res.json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a course by ID
export const deleteCourse = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Call the function to delete the course from the database
        await deleteCourseFromDB(parseInt(id));

        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
