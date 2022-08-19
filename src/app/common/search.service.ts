import {Injectable} from '@angular/core';
import {debounceTime, distinctUntilChanged, map, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public onSearch$ = new Subject<string>();

  constructor() {
  }

  public nextOnSearch(inputVel: string) {
    this.onSearch$.next(inputVel)
  }

  public onSearch(time: number): Observable<string> {
    return this.onSearch$.pipe(
      map(inputVel => inputVel.toLocaleLowerCase()),
      debounceTime(time),
      distinctUntilChanged()
    )
  }
}
