import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(private auth: AuthService, private router: Router) {}

  isLogged(): boolean {
    return this.auth.isLoggedIn();
  }

  logout() {
    this.auth.logoutAdmin();
    void this.router.navigate(['/login']);
  }
}
