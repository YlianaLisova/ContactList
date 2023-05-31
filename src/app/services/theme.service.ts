import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme: string = 'light';

  constructor() {
  }

  toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    document.body.classList.toggle('dark-theme', this.currentTheme === 'dark');
    // You can also store the current theme preference in local storage or a cookie.
  }
}
