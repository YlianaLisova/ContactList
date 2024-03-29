import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth-service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService) {
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnInit(): void {
  }

}
