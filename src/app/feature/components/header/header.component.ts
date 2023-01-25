import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth/AuthService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logged: Boolean = false;
  role: String = '';
  email: String = '';

  constructor(public authService: AuthService, private router: Router) {
    this.logged = this.authService.isLoggedIn();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.logged = this.authService.isLoggedIn();
      }
    });
  }

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.email = localStorage.getItem('email');
  }

  onLogout() {
    this.authService.logOut();
  }

}
