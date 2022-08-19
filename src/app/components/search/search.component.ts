import {Component, OnInit} from '@angular/core';
import {IContact} from "../../models/IContact";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {

  contactName: string;
  contacts: IContact[] = [];
  constructor() {
    // const localstorageContacts: IContact[] = JSON.parse(localStorage.getItem('contacts') || '');
    // this.contacts = localstorageContacts;
    // console.log(localstorageContacts);
  }

  ngOnInit(): void {
  }


  getContacts(contactName: string) {
    const localstorageContacts: IContact[] = JSON.parse(localStorage.getItem('contacts') || '');
    this.contacts = localstorageContacts;
    console.log(localstorageContacts);
    let filteredContacts = this.contacts.filter(con => con.name === contactName);
    this.contacts = filteredContacts;
    console.log(filteredContacts)
  }
}

