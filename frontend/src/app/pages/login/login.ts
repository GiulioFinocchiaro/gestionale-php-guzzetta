import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit, OnDestroy {
  username = '';
  password = '';
  loading = false;
  error: string | null = null;
  private sub: Subscription | null = null;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      void this.router.navigate(['/reparti']);
    }
  }

  onSubmit(e?: Event) {
    if (e) e.preventDefault();
    this.error = null;
    if (!this.username || !this.password) {
      this.error = 'Inserisci username e password';
      return;
    }
    this.loading = true;
    this.sub = this.auth.loginAdmin$(this.username, this.password).subscribe({
      next: async () => {
        await this.router.navigate(['/reparti']);
      },
      error: (err: any) => {
        this.error = err?.message || 'Errore durante il login';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
