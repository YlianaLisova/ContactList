import {FilterPageComponent} from "./filter-page.component";
import {LocalStorageService} from "../../services/local-storage.service";
import {Contact} from "../../models/Contact";
import {BehaviorSubject} from "rxjs";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {FormArray, FormBuilder, FormControl} from "@angular/forms";
import {ContactsComponent} from "../contacts/contacts.component";

describe('FilterPageComponent', () => {
  let component: FilterPageComponent;
  let fixture: ComponentFixture<FilterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterPageComponent],
      providers: [
        ContactsComponent,
        FormBuilder,
        {
          provide: LocalStorageService, useValue: {
            getContacts: () => mockLocalStorageContacts
          }
        },
        {
          provide: FilterPageComponent, useValue: {
            localStorageContacts: () => mockLocalStorageContacts,
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

  it('should initialize the contacts and localStorageContacts properties with the value returned by LocalStorageService', () => {
    component.ngOnInit()

    expect(component.contacts).toEqual(mockLocalStorageContacts);
    expect(component.localStorageContacts).toEqual(mockLocalStorageContacts);
  });

  it('should filter contacts based on storageGenders value', () => {
    component.localStorageContacts = mockLocalStorageContacts;
    component.form.value.gendersSelected = ['Male'];

    component.search();

    expect(component.contacts.length).toBe(3);
  });

  it('should set contacts to localStorageContacts when storageGenders value is empty', () => {
    component.localStorageContacts = mockLocalStorageContacts;
    component.form.value.gendersSelected = [''];

    component.search();

    expect(component.contacts).toEqual(mockLocalStorageContacts);
  });

  it('should create a form with gendersSelected FormArray', () => {
    component.formCreator();

    expect(component.form.contains('gendersSelected')).toBe(true);
    expect(component.form.get('gendersSelected')).toBeInstanceOf(FormArray);
  });

  it('should add a new FormControl to gendersSelected FormArray when checkbox is checked', () => {
    const checkboxValue = 'male';
    const checkboxEvent = { target: { checked: true, value: checkboxValue } };
    const gendersSelected = new FormArray([]);

    component.form.setControl('gendersSelected', gendersSelected);
    component.checkbox(checkboxEvent);

    expect(gendersSelected.length).toEqual(1);
    expect(gendersSelected.at(0).value).toEqual(checkboxValue);
  });

  it('should remove an existing FormControl from gendersSelected FormArray when checkbox is unchecked', () => {
    const checkboxEvent = { target: { checked: false, value: 'female' } };
    const gendersSelected = new FormArray([
      new FormControl('male'),
      new FormControl('female'),
    ]);

    component.form.setControl('gendersSelected', gendersSelected);
    component.checkbox(checkboxEvent);

    expect(gendersSelected.length).toEqual(1);
    expect(gendersSelected.at(0).value).toEqual('male');
  });
});

const mockLocalStorageContacts: Contact[] = [{
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
}];
