import * as sqlite3 from 'sqlite3';
import { Student } from '../models/studentModel';

// Initialize the SQLite database
const db = new sqlite3.Database(':memory:');

// Create a table for students
db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY, first_name TEXT, last_name TEXT, dob TEXT, email TEXT)');
});

// Function to add a new student to the database
export const addStudentToDB = async (student: Student): Promise<Student> => {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO students (first_name, last_name, dob, email) VALUES (?, ?, ?, ?)',
            [student.first_name, student.last_name, student.dob, student.email], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        id: this.lastID,
                        first_name: student.first_name,
                        last_name: student.last_name,
                        dob: student.dob,
                        email: student.email
                    });
                }
            });
    });
};

// Function to retrieve all students from the database
export const getAllStudentsFromDB = async (): Promise<Student[]> => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM students', (err: Error | null, rows: any[]) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

// Function to retrieve a student by ID from the database
export const getStudentByIdFromDB = async (id: number): Promise<Student | undefined> => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM students WHERE id = ?', [id], (err, row: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

// Function to delete a student by ID from the database
export const deleteStudentFromDB = async (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM students WHERE id = ?', [id], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};
