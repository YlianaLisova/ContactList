import {Component, OnInit} from '@angular/core';
import {SearchService} from "./services/search.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  constructor(public searchService: SearchService) {
  }

  ngOnInit() {
    if (localStorage.getItem('contacts')) {
    } else {
      localStorage.setItem('contacts', '[{"id": "1", "name": "Ihor", "lastName": "Lisovyi","number": "380985784256","email": "lisovyi@gmail.com", "dateOfBirth": "1968-03-18", "gender": "Male"},{"id": "2", "name": "Uliana", "lastName": "Lisova","number": "380985784256","email": "lisova@gmail.com", "dateOfBirth": "2004-03-16", "gender": "Female"},{"id": "3", "name": "Lidiya", "lastName": "Lisova","number": "380985784256","email": "lisova2@gmail.com", "dateOfBirth": "1998-06-05", "gender": "Female"},{"id": "4", "name": "Ivan", "lastName": "Tkach","number": "380985784256","email": "lisova2@gmail.com", "dateOfBirth": "1998-06-05", "gender": "Male"},{"id": "5", "name": "Petro", "lastName": "Gritsiv","number": "380985784256","email": "lisova2@gmail.com", "dateOfBirth": "1998-06-05", "gender": "Male"}]')
    }
    this.searchService.onSearch(100)
  }

  title = 'Contact List';
}
