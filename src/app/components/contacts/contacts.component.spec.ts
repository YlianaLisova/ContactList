import {MockBuilder, MockInstance, MockRender, ngMocks} from "ng-mocks";
import {ContactsComponent} from "./contacts.component";
import {AppModule} from "../../app.module";
import {SearchService} from "../../services/search.service";
import {of, Subject} from "rxjs";
import {LocalStorageService} from "../../services/local-storage.service";
import {Contact} from "../../models/Contact";
import * as uuid from 'uuid';
import {FormGroup} from "@angular/forms";

describe('ContactsComponent', () => {
  beforeEach(MockInstance.remember);
  afterEach(MockInstance.restore);

  beforeEach(() => {
    return MockBuilder(ContactsComponent, AppModule)
      .mock(SearchService, {
        onSearch: () => of('test')
      })
      .mock(LocalStorageService, {
        getContacts: () => contactsArray,
        saveContact: () => contactsArrayForAdd
      })
  })

  it('should create component', () => {
    expect(() => MockRender(ContactsComponent).point.componentInstance).not.toThrow();
  });

  it('should set contacts and localStorageContacts on ngOnInit', () => {
    const fixture = MockRender(ContactsComponent);
    const component = fixture.point.componentInstance;
    expect(component.contacts).toEqual(contactsArray);
    expect(component.localStorageContacts).toEqual(contactsArray);
  });

  it('should update the users list and info', () => {
    const fixture = MockRender(ContactsComponent);
    const component = fixture.point.componentInstance;
    const localStorageService = ngMocks.get(LocalStorageService);
    jest.spyOn(localStorageService, 'getContacts');

    component['updateUsersListAndInfo']();

    expect(localStorageService.getContacts).toHaveBeenCalled();
    expect(component.localStorageContacts).toEqual(contactsArray);
  });

  it('should update the input value when a search is triggered', () => {
    const fixture = MockRender(ContactsComponent);
    const component = fixture.point.componentInstance;
    const searchService = ngMocks.get(SearchService);
    const searchSubject = new Subject<string>();
    const searchObservable = searchSubject.asObservable();
    const searchValue = 'test';
    jest.spyOn(searchService, "onSearch").mockReturnValue(searchObservable);

    component.searchTrigger();

    expect(component.inputValue).toEqual(searchValue.trim().toLowerCase());
  });

  it('should add subscription to the subscriptions', () => {
    const fixture = MockRender(ContactsComponent);
    const component = fixture.point.componentInstance;
    const searchObservable = of('test');
    const searchService = ngMocks.get(SearchService);
    jest.spyOn(searchService, 'onSearch').mockReturnValue(searchObservable);
    jest.spyOn(component['subscriptions'], 'add');

    component.searchTrigger();

    expect(component['subscriptions'].add).toHaveBeenCalled();
  });

  it('should update the contact and reset the form if a contactForUpdate will be true', () => {
    const fixture = MockRender(ContactsComponent);
    const component = fixture.point.componentInstance;
    const localStorageService = ngMocks.get(LocalStorageService);
    const contactForUpdate = {
      id: '1',
      name: "Ihor",
      lastName: "L",
      number: "380985784256",
      email: "lisovyi@gmail.com",
      dateOfBirth: "1968-03-18",
      gender: "Male"
    };
    const oneContactInArray: Contact = {
      id: '1',
      name: "Ihor",
      lastName: "Lisovyi",
      number: "380985784256",
      email: "lisovyi@gmail.com",
      dateOfBirth: "1968-03-18",
      gender: "Male"
    };
    jest.spyOn(component.form, 'reset');
    jest.spyOn(localStorageService, 'updateContact');

    component.contactForUpdate = contactForUpdate;
    component.save(contactForUpdate);

    expect(component.localStorageContacts.length).toBe(2);
    expect(component.localStorageContacts[0]).toEqual({...oneContactInArray, ...contactForUpdate});
    expect(localStorageService.updateContact).toHaveBeenCalledWith(component.localStorageContacts);
    expect(component.form.reset).toHaveBeenCalled();
  });

  it('should delete contact', () => {
    const fixture = MockRender(ContactsComponent);
    const component = fixture.point.componentInstance;
    const localeStorageService = ngMocks.get(LocalStorageService);
    jest.spyOn(localeStorageService, 'deleteContact');

    component.delete('1');

    expect(localeStorageService.deleteContact).toHaveBeenCalledWith([contactsArray[0]]);
    expect(component.localStorageContacts).toEqual([contactsArray[0]]);
  });

  it('should add a new contact to the list and reset the form if no contact is being updated', () => {
    const fixture = MockRender(ContactsComponent);
    const component = fixture.point.componentInstance;
    const localStorageService = ngMocks.get(LocalStorageService);
    const id = 'abcd1234';
    const contact: Contact = {
      id: '1',
      name: 'Jane',
      lastName: 'test',
      dateOfBirth: '2004-03-16',
      email: 'jane.test@example.com',
      gender: 'female',
      number: '98765432000001'
    };
    const formValue = {
      name: contact.name,
      lastName: contact.lastName,
      email: contact.email,
      dateOfBirth: contact.dateOfBirth,
      gender: contact.gender,
      number: contact.number
    };
    jest.spyOn(uuid, 'v4').mockReturnValue(id);
    jest.spyOn(component.form, 'reset');
    jest.spyOn(localStorageService, 'saveContact');

    component.contacts = contactsArrayForAdd;
    component.form.setValue(formValue);
    component.save({id, ...formValue});

    expect(component.contacts.length).toBe(3);
    expect(component.contacts[2]).toEqual({id, ...formValue});
    expect(localStorageService.saveContact).toHaveBeenCalledWith(component.contacts);
    expect(component.form.reset).toHaveBeenCalled();
  });

  it('should create the form', () => {
    const fixture = MockRender(ContactsComponent);
    const component = fixture.point.componentInstance;

    component._createForm();

    expect(component.form).toBeInstanceOf(FormGroup);
    expect(component.form).toBeDefined();
  });

  it('should have a name control validators', () => {
    const fixture = MockRender(ContactsComponent);
    const component = fixture.point.componentInstance;
    const nameControl = component.form.controls['name'];

    component._createForm();

    nameControl.setValue('Uliana')
    expect(nameControl.valid).toBeTruthy();

    nameControl.setValue('Уляна');
    expect(nameControl.valid).toBeFalsy();
  });

  it('should have a lastName control validators', () => {
    const fixture = MockRender(ContactsComponent);
    const component = fixture.point.componentInstance;
    const lastNameControl = component.form.controls['lastName'];

    component._createForm();

    lastNameControl.setValue('Lisova')
    expect(lastNameControl.valid).toBeTruthy();

    lastNameControl.setValue('Лісова');
    expect(lastNameControl.valid).toBeFalsy();
  });

  it('should have a number control validators', () => {
    const fixture = MockRender(ContactsComponent);
    const component = fixture.point.componentInstance;
    const numberControl = component.form.controls['number'];

    component._createForm();

    numberControl.setValue('380996787654')
    expect(numberControl.valid).toBeTruthy();

    numberControl.setValue('456789908');
    expect(numberControl.valid).toBeFalsy();
  });

  it('should have a email control validators', () => {
    const fixture = MockRender(ContactsComponent);
    const component = fixture.point.componentInstance;
    const emailControl = component.form.controls['email'];

    component._createForm();

    emailControl.setValue('good@gmail.com')
    expect(emailControl.valid).toBeTruthy();

    emailControl.setValue('goodcom');
    expect(emailControl.valid).toBeFalsy();
  });

  it('should delete contact', () => {
    const fixture = MockRender(ContactsComponent);
    const component = fixture.point.componentInstance;
    jest.spyOn(component, 'delete');

  });
});


const contactsArray: Contact[] = [
  {
    id: '1',
    name: "Ihor",
    lastName: "Lisovyi",
    number: "380985784256",
    email: "lisovyi@gmail.com",
    dateOfBirth: "1968-03-18",
    gender: "Male"
  },
  {
    id: "2",
    name: "Uliana",
    lastName: "Lisova",
    number: "380985784256",
    email: "lisova@gmail.com",
    dateOfBirth: "2004-03-16",
    gender: "Female"
  }
];

const contactsArrayForAdd: Contact[] = [
  {
    id: '1',
    name: "Ihor",
    lastName: "Lisovyi",
    number: "380985784256",
    email: "lisovyi@gmail.com",
    dateOfBirth: "1968-03-18",
    gender: "Male"
  },
  {
    id: "2",
    name: "Uliana",
    lastName: "Lisova",
    number: "380985784256",
    email: "lisova@gmail.com",
    dateOfBirth: "2004-03-16",
    gender: "Female"
  }
];
