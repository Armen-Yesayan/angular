import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  login = true;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  isLogedIn() {
    return this.authService.hasStoredToken();
  }

  logout() {
    return this.authService.logoutAndRedirect();
  }

}
