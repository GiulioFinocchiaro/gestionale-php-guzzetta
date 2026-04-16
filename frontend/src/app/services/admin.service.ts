import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Admin } from '../models/entities';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private _list$ = new BehaviorSubject<Admin[]>([]);
  public list$: Observable<Admin[]> = this._list$.asObservable();

  constructor(private api: ApiService) {}

  fetchAll(): void {
    this.api.get<any>('/admin').subscribe({
      next: (res) => {
        if (res && res.success && Array.isArray(res.data)) {
          this._list$.next(res.data as Admin[]);
        } else {
          this._list$.next([]);
        }
      },
      error: () => {
        this._list$.next([]);
      },
    });
  }

  getById(id: number): Observable<any> {
    return this.api.get<any>(`/admin/${id}`);
  }

  create(payload: any): Observable<any> {
    return this.api.post<any>('/admin', payload);
  }

  update(id: number, payload: any): Observable<any> {
    return this.api.put<any>(`/admin/${id}`, payload);
  }

  delete(id: number): Observable<any> {
    return this.api.delete<any>(`/admin/${id}`);
  }
}

