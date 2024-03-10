import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {AddNewCoursesComponent} from "./add-new-courses.component";
import {BrowserModule} from "@angular/platform-browser";
import {NotificationModule} from "../shared/notification/notification.module";

@NgModule({
  declarations: [AddNewCoursesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    NotificationModule
  ],
  exports: [AddNewCoursesComponent]
})
export class AddNewCoursesModule {
}
