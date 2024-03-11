import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { ResultsListComponent } from './results-list/results-list.component';
import {HttpClientModule} from "@angular/common/http";
import {AddNewStudentsModule} from "./add-new-students/add-new-students.module";
import {AddNewCoursesModule} from "./add-new-courses/add-new-courses.module";
import {AddNewResultsModule} from "./add-new-results/add-new-results.module";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StudentsListComponent,
    CoursesListComponent,
    ResultsListComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AddNewStudentsModule,
    AddNewCoursesModule,
    AddNewResultsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
