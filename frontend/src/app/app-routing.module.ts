import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AddNewStudentsComponent} from "./add-new-students/add-new-students.component";
import {StudentsListComponent} from "./students-list/students-list.component";
import {AddNewCoursesComponent} from "./add-new-courses/add-new-courses.component";
import {CoursesListComponent} from "./courses-list/courses-list.component";
import {AddNewResultsComponent} from "./add-new-results/add-new-results.component";
import {ResultsListComponent} from "./results-list/results-list.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add-new-students', component: AddNewStudentsComponent },
  { path: 'students-list', component: StudentsListComponent },
  { path: 'add-new-courses', component: AddNewCoursesComponent },
  { path: 'courses-list', component: CoursesListComponent },
  { path: 'add-new-results', component: AddNewResultsComponent },
  { path: 'results-list', component: ResultsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
