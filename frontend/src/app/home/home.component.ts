import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title: string = "Welcome to Grader";
  description: string = "A one page application for Studen Result Management System that uses Angular 14, NodeJS in TS and SQLite";

  constructor() { }

  ngOnInit(): void {
  }

  scrollToSection(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
