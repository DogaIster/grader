import * as sqlite3 from 'sqlite3';
import {Course} from "../models/courseModel";

// Initialize the SQLite database
const db = new sqlite3.Database(':memory:');

// Create a table for courses
db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS courses (id INTEGER PRIMARY KEY, name TEXT)');
});

// Function to add a new course to the database
export const addCourseToDB = async (name: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO courses (name) VALUES (?)', [name], function(err: Error | null) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

// Function to retrieve all courses from the database
export const getAllCoursesFromDB = async (): Promise<Course[]> => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM courses', (err: Error | null, rows: any[]) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

// Function to delete a course by ID from the database
export const deleteCourseFromDB = async (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM courses WHERE id = ?', [id], function(err: Error | null) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};
