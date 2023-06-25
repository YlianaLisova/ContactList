import {LocalStorageService} from "./local-storage.service";
import {Contact} from "../models/Contact";

describe('LocalStorage', () => {
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    localStorage.clear();
    localStorageService = new LocalStorageService();
  })

  it('should return an array of contacts from localStorage', () => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
    const result = localStorageService.getContacts();

    expect(result).toEqual(contacts);
  });

  it('should save an array of contacts to localStorage', () => {
    localStorageService.saveContact(contacts);
    const result = JSON.parse(localStorage.getItem('contacts') || '[]');

    expect(result).toEqual(contacts);
  });

  it('should update the array of contacts in localStorage', () => {
    const updatedContacts: Contact[] = [
      {
        id: '1',
        name: 'Alice',
        lastName: 'Johnson',
        number: '5555555555',
        email: 'alice.johnson@example.com',
        dateOfBirth: '1985-01-01',
        gender: 'Female'
      },
      {
        id: '2',
        name: 'Bob',
        lastName: 'Anderson',
        number: '9999999999',
        email: 'bob.anderson@example.com',
        dateOfBirth: '1975-01-01',
        gender: 'Male'
      }
    ];

    localStorage.setItem('contacts', JSON.stringify(contacts));
    localStorageService.updateContact(updatedContacts);
    const result = JSON.parse(localStorage.getItem('contacts') || '[]')

    expect(result).toEqual(updatedContacts);
  });

  it('should delete the array of contacts from localStorage', () => {
    const withoutDeletedContact: Contact[] = [{
      id: '1',
      name: 'Ira',
      lastName: 'Test',
      number: '380456789040',
      email: 'ira.test@example.com',
      dateOfBirth: '1990-01-01',
      gender: 'Female'
    }]

    localStorage.setItem('contacts', JSON.stringify(contacts));
    localStorageService.deleteContact(withoutDeletedContact);
    const result = JSON.parse(localStorage.getItem('contacts') || '[]');

    expect(result).toEqual([contacts[0]])
  })
})
const contacts: Contact[] = [
  {
    id: '1',
    name: 'Ira',
    lastName: 'Test',
    number: '380456789040',
    email: 'ira.test@example.com',
    dateOfBirth: '1990-01-01',
    gender: 'Female'
  },
  {
    id: '2',
    name: 'Max',
    lastName: 'Test',
    number: '380456789040',
    email: 'max.test@example.com',
    dateOfBirth: '1995-01-01',
    gender: 'Male'
  }
];
