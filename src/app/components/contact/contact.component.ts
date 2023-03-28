import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Contact} from "../../models/Contact";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent implements OnInit {

  public localstorageContacts: Contact[];
  public contact: Contact;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {
      this.localstorageContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
      const contactFromLocalStorage = this.localstorageContacts.find(contact => contact.id === id);
      this.contact = contactFromLocalStorage as Contact;
    })
  }
}
