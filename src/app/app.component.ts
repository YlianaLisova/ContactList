import {Component, OnInit} from '@angular/core';
import {SearchService} from "./services/search.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  constructor(public searchService: SearchService) {
  }

  ngOnInit() {
    this.searchService.onSearch(100)
  }

  title = 'Contact List';
}
