import { Request, Response } from 'express';
import { addResultToDB, getAllResultsFromDB, deleteResultsByStudentIdFromDB, deleteResultsByCourseIdFromDB } from '../db/resultDatabase';

// Controller logic for result routes

// Add a new result
export const addResult = async (req: Request, res: Response) => {
    try {
        const { studentId, courseId, score } = req.body;

        // Basic validation
        if (!studentId || !courseId || !score) {
            return res.status(400).json({ error: 'Student ID, course ID, and score are required' });
        }

        // Call the function to add a new result to the database
        await addResultToDB(studentId, courseId, score);

        res.status(201).json({ message: 'Result added successfully' });
    } catch (error) {
        console.error('Error adding result:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all results
export const getAllResults = async (req: Request, res: Response) => {
    try {
        // Call the function to retrieve all results from the database
        const results = await getAllResultsFromDB();

        res.json(results);
    } catch (error) {
        console.error('Error fetching results:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete results by student ID
export const deleteResultsByStudentId = async (req: Request, res: Response) => {
    try {
        const { studentId } = req.params;

        // Call the function to delete results associated with the student from the database
        await deleteResultsByStudentIdFromDB(parseInt(studentId));

        res.json({ message: 'Results deleted successfully' });
    } catch (error) {
        console.error('Error deleting results by student ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete results by course ID
export const deleteResultsByCourseId = async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params;

        // Call the function to delete results associated with the course from the database
        await deleteResultsByCourseIdFromDB(parseInt(courseId));

        res.json({ message: 'Results deleted successfully' });
    } catch (error) {
        console.error('Error deleting results by course ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
