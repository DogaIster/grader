import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student.model';
import { StudentService } from '../services/student.service';
import {StudentUpdateService} from "../shared/services/student-update.service";

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {
  students: Student[] = [];

  constructor(private studentService: StudentService, private studentUpdateService: StudentUpdateService) { }

  ngOnInit(): void {
    this.getStudents();
    this.studentUpdateService.studentAdded().subscribe(() => {
      this.getStudents();
    });
  }

  getStudents(): void {
    this.studentService.getAllStudents().subscribe(data => {
      // Map the received data to match the expected property names with the BE
      this.students = data.map((student: any) => ({
        id: student.id,
        firstName: student.first_name,
        lastName: student.last_name,
        dob: student.dob,
        email: student.email
      }));
    });
  }

  deleteStudent(id: number): void {
    this.studentService.deleteStudent(id).subscribe(
      () => {
        // Remove the deleted student from the array
        this.students = this.students.filter(student => student.id !== id);
        console.log('Student deleted successfully.');
      },
      (error) => {
        console.error('Error deleting student:', error);
      }
    );
  }
}
