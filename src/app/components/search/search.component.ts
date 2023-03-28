import {Component, OnInit} from '@angular/core';
import {Contact} from "../../models/Contact";
import {SearchService} from "../../services/search.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {

  public inputValue: string;
  public contacts: Contact[] = [];
  constructor(private searchService: SearchService, private router: Router) {
  }

  ngOnInit(): void {
  }

  isContactsPage() {
    return this.router.url === '/contacts'
  }

  public onSearch(inputValue:string): void {
    this.searchService.nextOnSearch(inputValue);
  }

}

