import {Component, OnInit} from '@angular/core';
import {IContact} from "../../models/IContact";
import {SearchService} from "../../common/search.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {

  contactName: string;
  contacts: IContact[] = [];
  constructor(private searchMenusService: SearchService) {
  }

  ngOnInit(): void {
  }

  public onSearch(inputVal:string): void {
    this.searchMenusService.nextOnSearch(inputVal);
  }

}

