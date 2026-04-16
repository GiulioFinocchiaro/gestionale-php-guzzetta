import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Permesso } from '../models/entities';

@Injectable({ providedIn: 'root' })
export class PermessiService {
  private _list$ = new BehaviorSubject<Permesso[]>([]);
  public list$: Observable<Permesso[]> = this._list$.asObservable();

  constructor(private api: ApiService) {}

  fetchAll(): void {
    this.api.get<any>('/permessi').subscribe({
      next: (res) => {
        if (res && res.success && Array.isArray(res.data)) {
          this._list$.next(res.data as Permesso[]);
        } else {
          this._list$.next([]);
        }
      },
      error: () => {
        this._list$.next([]);
      },
    });
  }

  fetchByDipendente(idDip: number): void {
    this.api.get<any>(`/permessi?fk_dipendente=${idDip}`).subscribe({
      next: (res) => {
        if (res && res.success && Array.isArray(res.data)) {
          this._list$.next(res.data as Permesso[]);
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
    return this.api.get<any>(`/permessi/${id}`);
  }

  create(payload: Partial<Permesso>): Observable<any> {
    return this.api.post<any>('/permessi', payload);
  }

  update(id: number, payload: Partial<Permesso>): Observable<any> {
    return this.api.put<any>(`/permessi/${id}`, payload);
  }

  delete(id: number): Observable<any> {
    return this.api.delete<any>(`/permessi/${id}`);
  }
}

