import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddNewStudentsComponent} from './add-new-students.component';
import {BrowserModule} from "@angular/platform-browser";
import {NotificationModule} from "../shared/notification/notification.module";

@NgModule({
  declarations: [AddNewStudentsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    NotificationModule
  ],
  exports: [AddNewStudentsComponent]
})
export class AddNewStudentsModule {
}
