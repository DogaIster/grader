import * as sqlite3 from 'sqlite3';
import { Result } from "../models/resultModel";

// Define database file paths
const resultDBPath = './resultDatabase.db';
const studentDBPath = './studentDatabase.db';
const courseDBPath = './courseDatabase.db';

// Initialize the databases
const resultDB = new sqlite3.Database(resultDBPath);
const studentDB = new sqlite3.Database(studentDBPath);
const courseDB = new sqlite3.Database(courseDBPath);

// Initialize the results database
resultDB.serialize(() => {
    resultDB.run(`
        CREATE TABLE IF NOT EXISTS results (
            id INTEGER PRIMARY KEY,
            student_id INTEGER,
            course_id INTEGER,
            score TEXT,
            FOREIGN KEY (student_id) REFERENCES students(id),
            FOREIGN KEY (course_id) REFERENCES courses(id)
        )
    `);
});

// Initialize the students database
studentDB.serialize(() => {
    studentDB.run(`
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY,
            first_name TEXT,
            last_name TEXT,
            dob TEXT,
            email TEXT
        )
    `);
});

// Initialize the courses database
courseDB.serialize(() => {
    courseDB.run(`
        CREATE TABLE IF NOT EXISTS courses (
            id INTEGER PRIMARY KEY,
            name TEXT
        )
    `);
});

// Function to add a new result to the database
export const addResultToDB = async (studentId: number, courseId: number, score: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        resultDB.run('INSERT INTO results (student_id, course_id, score) VALUES (?, ?, ?)', [studentId, courseId, score], function(err: Error | null) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

// Function to retrieve all results from the database
export const getAllResultsFromDB = async (): Promise<Result[]> => {
    return new Promise<Result[]>((resolve, reject) => {
        resultDB.all(`
            SELECT *
            FROM results
        `, (err: Error | null, rows: any[]) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

// Function to delete results associated with a specific student
export const deleteResultsByStudentIdFromDB = async (studentId: number): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        resultDB.run('DELETE FROM results WHERE student_id = ?', [studentId], function(err: Error | null) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

// Function to delete results associated with a specific course
export const deleteResultsByCourseIdFromDB = async (courseId: number): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        resultDB.run('DELETE FROM results WHERE course_id = ?', [courseId], function(err: Error | null) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};
