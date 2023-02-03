import {Injectable} from '@angular/core';
import {Contact} from "../models/Contact";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  public getContacts(): Contact[] {
    return JSON.parse(localStorage.getItem('contacts') || '[{"id": "1", "name": "Ihor", "lastName": "Lisovyi","number": "380985784256","email": "lisovyi@gmail.com", "dateOfBirth": "1968-03-18", "gender": "Male"},{"id": "2", "name": "Uliana", "lastName": "Lisova","number": "380985784256","email": "lisova@gmail.com", "dateOfBirth": "2004-03-16", "gender": "Female"},{"id": "3", "name": "Lidiya", "lastName": "Lisova","number": "380985784256","email": "lisova2@gmail.com", "dateOfBirth": "1998-06-05", "gender": "Female"},{"id": "4", "name": "Ivan", "lastName": "Tkach","number": "380985784256","email": "lisova2@gmail.com", "dateOfBirth": "1998-06-05", "gender": "Male"},{"id": "5", "name": "Petro", "lastName": "Gritsiv","number": "380985784256","email": "lisova2@gmail.com", "dateOfBirth": "1998-06-05", "gender": "Male"}]');
  }

  public saveContact(contact: Contact[]): void {
    localStorage.setItem("contacts", JSON.stringify(contact));
  }

  public updateContact(contact: Contact[]): void {
    localStorage.setItem('contacts', JSON.stringify(contact));
  }

  public deleteContact (contact: Contact[]): void {
    localStorage.setItem('contacts', JSON.stringify(contact));
  }
}
