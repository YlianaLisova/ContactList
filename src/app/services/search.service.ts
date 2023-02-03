import {Injectable} from '@angular/core';
import {debounceTime, distinctUntilChanged, map, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public onSearch$ = new Subject<string>();

  constructor() {
  }

  public nextOnSearch(inputValue: string) {
    this.onSearch$.next(inputValue)
  }

  public onSearch(time: number): Observable<string> {
    return this.onSearch$.pipe(
      map(inputValue => inputValue.toLocaleLowerCase()),
      debounceTime(time),
      distinctUntilChanged()
    )
  }
}
