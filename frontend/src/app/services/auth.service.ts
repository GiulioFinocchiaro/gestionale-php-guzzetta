import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { HttpErrorResponse } from '@angular/common/http';

export interface Admin {
  idAdmin: number;
  username: string;
  nome: string;
  cognome: string;
}

const STORAGE_KEY = 'fantasilandia_admin_session';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private api: ApiService) {}

  loginAdmin$(username: string, password: string): Observable<Admin> {
    return this.api.post<any>('/admin/login', { username, password }).pipe(
      map((json) => {
        if (!json || !json.success || !json.data || !json.data.admin) {
          throw new Error(json?.message || 'Risposta API non valida');
        }
        const admin: Admin = json.data.admin;
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(admin));
        } catch (e) {
          // ignore
        }
        return admin;
      }),
      catchError((err: unknown) => {
        // err is likely HttpErrorResponse from HttpClient
        let msg = 'Errore durante la richiesta';
        if (err instanceof HttpErrorResponse) {
          // Try to extract meaningful message from body
          const body = err.error;
          if (body) {
            if (typeof body === 'string') {
              try {
                const parsed = JSON.parse(body);
                msg = parsed?.message || JSON.stringify(parsed) || body;
              } catch (e) {
                msg = body;
              }
            } else if (typeof body === 'object') {
              // common patterns: { message: '...', errors: {...} }
              msg = (body as any).message || JSON.stringify(body);
            }
          } else {
            msg = `HTTP ${err.status}`;
          }
        } else if (err instanceof Error) {
          msg = err.message;
        }

        return throwError(() => new Error(msg));
      }),
    );
  }

  logoutAdmin() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  }

  getCurrentAdmin(): Admin | null {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (!v) return null;
      return JSON.parse(v) as Admin;
    } catch (e) {
      return null;
    }
  }

  isLoggedIn(): boolean {
    return this.getCurrentAdmin() !== null;
  }
}
