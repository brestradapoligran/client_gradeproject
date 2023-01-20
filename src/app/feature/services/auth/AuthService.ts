import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    constructor(public router: Router) { }

    isLoggedIn(): boolean {
        return localStorage.getItem('token') !== null ? true : false;
    }

    logOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('email');
        this.router.navigate(['']);
    }

}