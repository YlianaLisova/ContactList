import {Pipe, PipeTransform} from '@angular/core';
import {IContact} from "../models/IContact";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(value: IContact[], inputValue: string = ''): IContact[] {
    return value.filter(con => con.name.trim().toLowerCase().includes(inputValue)
      ||
      con.lastName.trim().toLowerCase().includes(inputValue)
      ||
      `${con.name}${con.lastName}`.trim().toLowerCase().includes(inputValue.split(' ').filter(vel => vel).join(''))
    )
  }

}
