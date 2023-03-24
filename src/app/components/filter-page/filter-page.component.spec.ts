import {FilterPageComponent} from "./filter-page.component";
import {LocalStorageService} from "../../services/local-storage.service";
import {Contact} from "../../models/Contact";
import {BehaviorSubject} from "rxjs";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {FormBuilder} from "@angular/forms";
import {ContactsComponent} from "../contacts/contacts.component";

describe('FilterPageComponent', () => {
  let component: FilterPageComponent;
  let fixture: ComponentFixture<FilterPageComponent>;
  const MockLocalStorageContacts: Contact[] = [{
    id: "1",
    name: "Ihor",
    lastName: "Lisovyi",
    number: "380985784256",
    email: "lisovyi@gmail.com",
    dateOfBirth: "1968-03-18",
    gender: "Male"
  }, {
    id: "2",
    name: "Uliana",
    lastName: "Lisova",
    number: "380985784256",
    email: "lisova@gmail.com",
    dateOfBirth: "2004-03-16",
    gender: "Female"
  }, {
    id: "3",
    name: "Lidiya",
    lastName: "Lisova",
    number: "380985784256",
    email: "lisova2@gmail.com",
    dateOfBirth: "1998-06-05",
    gender: "Female"
  }, {
    id: "4",
    name: "Ivan",
    lastName: "Tkach",
    number: "380985784256",
    email: "lisova2@gmail.com",
    dateOfBirth: "1998-06-05",
    gender: "Male"
  }, {
    id: "5",
    name: "Petro",
    lastName: "Gritsiv",
    number: "380985784256",
    email: "lisova2@gmail.com",
    dateOfBirth: "1998-06-05",
    gender: "Male"
  }]
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterPageComponent],
      providers: [
        ContactsComponent,
        FormBuilder,
        {
          provide: LocalStorageService, useValue: {
            getContacts: () => MockLocalStorageContacts
          }
        },
        {
          provide: FilterPageComponent, useValue: {
            localStorageContacts: () => MockLocalStorageContacts,
            storageGenders: () => new BehaviorSubject('')
          },
        }]
    });
    fixture = TestBed.createComponent(FilterPageComponent);
    component = fixture.componentInstance;
  });


  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should initialize the contacts property with the value returned by LocalStorageService', () => {
    component.ngOnInit()

    expect(component.contacts).toEqual(MockLocalStorageContacts);
  });
});
