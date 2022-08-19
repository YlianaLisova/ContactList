import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IContact} from "../../models/IContact";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent implements OnInit {

  localstorageContacts: IContact[];
  contact: IContact;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {
        this.localstorageContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
        const contactFromLS = this.localstorageContacts.find(con => con.id === id);
        this.contact = contactFromLS as IContact;
    })
  }

}
