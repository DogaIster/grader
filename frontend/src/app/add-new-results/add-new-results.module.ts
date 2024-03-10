import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {AddNewResultsComponent} from "./add-new-results.component";
import {BrowserModule} from "@angular/platform-browser";
import {NotificationModule} from "../shared/notification/notification.module";

@NgModule({
  declarations: [AddNewResultsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    NotificationModule
  ],
  exports: [AddNewResultsComponent]
})
export class AddNewResultsModule {
}
