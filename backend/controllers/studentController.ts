import { Request, Response } from 'express';
import { Student } from '../models/studentModel';
import { addStudentToDB, getAllStudentsFromDB, getStudentByIdFromDB, deleteStudentFromDB } from '../db/studentDatabase';

export const addStudent = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, dob, email } = req.body;

        // Basic validation
        if (!firstName || !lastName || !dob || !email) {
            return res.status(400).json({ error: 'To add a student all the fields are required' });
        }

        // Call the function to add a new student to the database
        const newStudent: Student = await addStudentToDB({ firstName, lastName, dob, email });

        res.status(201).json(newStudent);
    } catch (error) {
        console.error('Error adding student:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getAllStudents = async (req: Request, res: Response) => {
    try {
        // Call the function to retrieve all students from the database
        const students: Student[] = await getAllStudentsFromDB();

        res.json(students);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getStudentById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);

        // Call the function to retrieve a student by ID from the database
        const student: Student | undefined = await getStudentByIdFromDB(id);

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json(student);
    } catch (error) {
        console.error('Error fetching student:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteStudent = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);

        // Call the function to delete a student by ID from the database
        await deleteStudentFromDB(id);

        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
