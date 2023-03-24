import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as uuid from 'uuid';

import {RegEx} from "../../constants/regex";
import {Contact} from "../../models/Contact";
import {Subscription} from "rxjs";
import {SearchService} from "../../services/search.service";
import {LocalStorageService} from "../../services/local-storage.service";
import {formatDate} from "@angular/common";


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.sass']
})


export class ContactsComponent implements OnInit, OnDestroy {
  public genders: string[] = [ 'Female', 'Male', 'Attack Helicopter', 'Transgender female', 'Transgender male'];
  public contacts: Contact[];
  public localStorageContacts: Contact[];
  public form: FormGroup;
  public contactForUpdate: Contact | null;
  private subscriptions: Subscription = new Subscription();
  public inputValue: string;
  public maxDate: string = formatDate(new Date(), 'yyyy-MM-dd', 'en')


  constructor(private searchService: SearchService, private localStorageService: LocalStorageService) {
    this._createForm();
  }

  ngOnInit(): void {
    let contactsFromLocalStorage = this.localStorageService.getContacts()
    this.contacts = contactsFromLocalStorage;
    this.localStorageContacts = contactsFromLocalStorage;
    this.searchTrigger();
  }

  private updateUsersListAndInfo(): void {
    this.localStorageContacts = this.localStorageService.getContacts()
  }

  public searchTrigger() {
    const $ = this.searchService.onSearch(100).subscribe(value => {
      this.inputValue = value.trim().toLowerCase()
    });
    this.subscriptions.add($)
  }

  public save(value: Contact): void {
    if (!this.contactForUpdate) {
      const id = uuid.v4();
      const contactReady = {id, ...this.form.value};
      this.contacts.push(contactReady);
      this.localStorageService.saveContact(this.contacts);
      this.form.reset();
    } else {
      let index = this.localStorageContacts.findIndex(contact => contact.id === this.contactForUpdate?.id);
      this.localStorageContacts[index].number = value.number;
      this.localStorageContacts[index].name = value.name;
      this.localStorageContacts[index].lastName = value.lastName;
      this.localStorageContacts[index].email = value.email;
      this.localStorageContacts[index].gender = value.gender;
      this.localStorageService.updateContact(this.localStorageContacts);
      this.contactForUpdate = null;
      this.form.reset();
    }
    this.updateUsersListAndInfo();
  }

  _createForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.pattern(RegEx.name), Validators.required]),
      lastName: new FormControl(null, [Validators.pattern(RegEx.lastName), Validators.required]),
      number: new FormControl(null, [Validators.pattern(RegEx.number), Validators.required]),
      email: new FormControl(null, [Validators.pattern(RegEx.email), Validators.required]),
      dateOfBirth: new FormControl(null),
      gender: new FormControl(null)
    })
  }

  public delete(id: string): void {
    const index = this.localStorageContacts.findIndex(contact => contact.id === id);
    this.localStorageContacts.splice(index, 1);
    this.localStorageService.deleteContact(this.localStorageContacts);
    this.updateUsersListAndInfo();
  }


  public update(contact: Contact): void {
    this.contactForUpdate = contact;
    console.log(this.contactForUpdate, 'dsfsdf')
    this.form.setValue({
      name: contact.name,
      lastName: contact.lastName,
      number: contact.number,
      email: contact.email,
      dateOfBirth: contact.dateOfBirth,
      gender: contact.gender
    })
    this.updateUsersListAndInfo();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
