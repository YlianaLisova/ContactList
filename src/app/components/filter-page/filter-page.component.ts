import {Component, OnDestroy, OnInit} from '@angular/core';
import {ContactsComponent} from "../contacts/contacts.component";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {BehaviorSubject, Subscription} from "rxjs";
import {SearchService} from "../../services/search.service";
import {Contact} from "../../models/Contact";
import {LocalStorageService} from "../../services/local-storage.service";

@Component({
  selector: 'app-filter-page',
  templateUrl: './filter-page.component.html',
  styleUrls: ['./filter-page.component.sass']
})
export class FilterPageComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public storageGenders = new BehaviorSubject<string>('');
  public localStorageContacts: Contact[];
  public contacts: Contact[];
  private subscriptions: Subscription = new Subscription();

  constructor(private localStorageService: LocalStorageService, private searchMenusService: SearchService,public contactsComponent: ContactsComponent, private formBuilder: FormBuilder) {
    this.formCreator();
  }

  public gendersArray: string[] = this.contactsComponent.genders;

  ngOnInit(): void {
    this.localStorageContacts = this.localStorageService.getContacts();
    this.contacts = this.localStorageContacts
  }

  public search() {
    this.storageGenders.next(this.form.value.gendersSelected.join(','))
    this.contacts = this.localStorageContacts.filter(value => this.storageGenders.value.includes(value.gender))
    if (this.storageGenders.value === '') this.contacts = this.localStorageContacts
  }

  formCreator(): void {
    this.form = this.formBuilder.group({
      gendersSelected: new FormArray([])
    })
  }


  checkbox(event: any) {
     let gendersSelected = (this.form.controls['gendersSelected'] as FormArray)
    if (event.target.checked){
      gendersSelected.push(new FormControl(event.target.value))
    }else {
      let i = gendersSelected.controls.findIndex(index=> index.value === event.target.value);
      gendersSelected.removeAt(i)
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
