import { Component } from '@angular/core';
import { Service } from '../service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  errorMessage: string = '';
  credentials = {
    identifier: '', // email or mobile
    password: ''
  };
  showErrorMessage: boolean = false;

  constructor(private authService: Service, private router: Router) { }

  login() {
    const { identifier, password } = this.credentials;
    this.errorMessage = '';
    this.showErrorMessage = false;

    console.log('Identifier:', identifier); // email or mobile
    console.log('Password:', password);

    this.authService.login(identifier, password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);

        this.authService.setUserSessionCookie('UserSession', response.token);
        this.authService.setUserSessionCookie('Role', response.user.role);
        this.authService.setUserSessionCookie('UserId', response.user.id);

        if (response.user.role === 'student') {
          this.router.navigate(['/create-update-user', response.user.id]);
        } else {
          this.router.navigate(['/user-listing']);
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.showErrorMessage = true

        // Display a friendly error to user
        if (error.status === 401) {
          this.errorMessage = 'Invalid credentials. Please try again.';
        } else if (error.status === 0) {
          this.errorMessage = 'Cannot connect to server. Please try later.';
        } else {
          this.errorMessage = 'Something went wrong. Please try again.';
        }
      }
    });
  }
}
