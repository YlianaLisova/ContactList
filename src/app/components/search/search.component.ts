import {Component, OnInit} from '@angular/core';
import {Contact} from "../../models/Contact";
import {SearchService} from "../../services/search.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {

  public inputValue: string;
  public contacts: Contact[] = [];
  constructor(private searchMenusService: SearchService) {
  }

  ngOnInit(): void {
  }

  public onSearch(inputValue:string): void {
    this.searchMenusService.nextOnSearch(inputValue);
  }

}

