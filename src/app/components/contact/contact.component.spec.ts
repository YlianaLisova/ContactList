import {MockBuilder, MockInstance, MockRender} from "ng-mocks";
import {AppModule} from "../../app.module";
import {ActivatedRoute} from "@angular/router";
import {Contact} from "../../models/Contact";
import {ContactComponent} from "./contact.component";
import {of} from "rxjs";

describe('ContactComponent', () => {
  beforeEach(MockInstance.remember);
  afterEach(MockInstance.restore);

  beforeEach(() => {
    const mockActivatedRoute = {
      params: of({id: '1'}),
    };
    return MockBuilder(ContactComponent, AppModule)
      .provide({
        provide: ActivatedRoute,
        useValue: mockActivatedRoute
      })
  })

  it('should create component', () => {
    expect(() => MockRender(ContactComponent).point.componentInstance).not.toThrow();
  });

  it('should get the contact from local storage', () => {
    const fixture = MockRender(ContactComponent);
    const component = fixture.point.componentInstance;

    localStorage.setItem('contacts', JSON.stringify(contactsArray));
    component.ngOnInit();

    expect(component.localstorageContacts).toEqual(contactsArray);
    expect(component.contact).toEqual(contactsArray[0]);
  });

  it('should not get the contact from local storage if there are no contacts', () => {
    const fixture = MockRender(ContactComponent);
    const component = fixture.point.componentInstance;

    localStorage.removeItem('contacts');
    component.ngOnInit();

    expect(component.localstorageContacts).toEqual([]);
    expect(component.contact).toBeUndefined();
  });
})

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
