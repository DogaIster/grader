import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddNewStudentsComponent } from './add-new-students/add-new-students.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { AddNewCoursesComponent } from './add-new-courses/add-new-courses.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { AddNewResultsComponent } from './add-new-results/add-new-results.component';
import { ResultsListComponent } from './results-list/results-list.component';
import {HttpClientModule} from "@angular/common/http";
import {AddNewStudentsModule} from "./add-new-students/add-new-students.module";
import {NotificationComponent} from "./shared/notification/notification.component";
import {AddNewCoursesModule} from "./add-new-courses/add-new-courses.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StudentsListComponent,
    CoursesListComponent,
    AddNewResultsComponent,
    ResultsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AddNewStudentsModule,
    AddNewCoursesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
