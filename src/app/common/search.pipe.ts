import {Pipe, PipeTransform} from '@angular/core';
import {Contact} from "../models/Contact";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(value: Contact[], inputValue: string = ''): Contact[] {
    return value.filter(contact => contact.name.trim().toLowerCase().includes(inputValue)
      ||
      contact.lastName.trim().toLowerCase().includes(inputValue)
      ||
      `${contact.name}${contact.lastName}`.trim().toLowerCase().includes(inputValue.split(' ').filter(value => value).join(''))
      ||
      contact.number.toString().trim().toLowerCase().includes(inputValue.split(' ').filter(value => value).join(''))
    )
  }

}
