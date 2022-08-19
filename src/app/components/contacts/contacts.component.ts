import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as uuid from 'uuid';

import {RegEx} from "../../constants/regex";
import {IContact} from "../../models/IContact";


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.sass']
})


export class ContactsComponent implements OnInit {
  contacts = [
    {"id": 1, "name": "Ihor", "lastName": "Cool","number": "0985784256","email": "lisovyi@gmail.com", "dateOfBirth": "18.03.1968"},
    {"id": 2, "name": "Uliana", "lastName": "Good","number": "0985784256","email": "lisova@gmail.com", "dateOfBirth": "16.03.2004"},
    {"id": 3, "name": "Lidiya", "lastName": "Beautiful","number": "0985784256","email": "lisova2@gmail.com", "dateOfBirth": "05.06.1998"},
    {"id": 4, "name": "Ivan", "lastName": "Tkach","number": "0985784256","email": "lisova2@gmail.com", "dateOfBirth": "05.06.1998"},
    {"id": 5, "name": "Petro", "lastName": "Gritsiv","number": "0985784256","email": "lisova2@gmail.com", "dateOfBirth": "05.06.1998"},
  ];
  localStorageContacts: IContact[];
  form: FormGroup;
  contactForUpdate: IContact | null;

  constructor() {
    this._createForm()
    localStorage.setItem('contacts', JSON.stringify([]))
    let con = JSON.parse(localStorage.getItem('contacts') || '[]')
    this.localStorageContacts = con;
    this.contacts = con;
  }

  ngOnInit(): void {
  }

  save(value: IContact): void {
    if (!this.contactForUpdate) {
    const id = uuid.v4();
    const contactReady = {id, ...this.form.value}
    this.contacts.push(contactReady)
    localStorage.setItem("contacts", JSON.stringify(this.contacts));
    this.form.reset()
    } else {
      let index = this.localStorageContacts.findIndex(contact => contact.id === this.contactForUpdate?.id);
      this.localStorageContacts[index].number = value.number;
      this.localStorageContacts[index].name = value.name;
      this.localStorageContacts[index].lastName = value.lastName;
      this.localStorageContacts[index].email = value.email;
      localStorage.setItem('contacts', JSON.stringify(this.localStorageContacts))
      this.contactForUpdate = null;
      this.form.reset();
    }
  }

  _createForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.pattern(RegEx.name), Validators.required]),
      lastName: new FormControl(null, [Validators.pattern(RegEx.lastName), Validators.required]),
      number: new FormControl(null, [Validators.pattern(RegEx.number), Validators.required]),
      email: new FormControl(null, [Validators.pattern(RegEx.email), Validators.required]),
      dateOfBirth: new FormControl(null),
    })
  }

  delete(id: number): void {
    const index = this.localStorageContacts.findIndex(a => a.id === id);
    this.localStorageContacts.splice(index,1);
    localStorage.setItem('contacts', JSON.stringify(this.localStorageContacts))
  }

  update(contact: IContact): void {
    this.contactForUpdate = contact;
    this.form.setValue({name: contact.name, lastName: contact.lastName, number: contact.number, email: contact.email, dateOfBirth: contact.dateOfBirth})
  }
}
