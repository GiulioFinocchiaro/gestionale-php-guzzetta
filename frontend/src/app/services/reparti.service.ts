// reparti.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Reparto } from '../models/entities';

@Injectable({ providedIn: 'root' })
export class RepartiService {
  private _list$ = new BehaviorSubject<Reparto[]>([]);
  private _error$ = new BehaviorSubject<string | null>(null);

  readonly list$: Observable<Reparto[]> = this._list$.asObservable();
  readonly error$: Observable<string | null> = this._error$.asObservable();

  constructor(private api: ApiService) {}

  fetchAll(): void {
    this._error$.next(null);
    this.api.get<{ success: boolean; data: any[] }>('/reparti').subscribe({
      next: (res) => {
        const items: Reparto[] = (res?.data ?? []).map((r) => ({
          id: r.ID_Reparto,
          nomeReparto: r.nomeReparto,
        }));
        this._list$.next(items);
      },
      error: (err) => {
        this._list$.next([]);
        this._error$.next(err?.message ?? 'Errore nel caricamento dei reparti');
      },
    });
  }

  getById(id: number): Observable<Reparto> {
    return this.api.get<Reparto>(`/reparti/${id}`);
  }

  create(payload: { nomeReparto: string }): Observable<Reparto> {
    return this.api.post<Reparto>('/reparti', payload);
  }

  update(id: number, payload: Partial<Reparto>): Observable<Reparto> {
    return this.api.put<Reparto>(`/reparti/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.api.delete<void>(`/reparti/${id}`);
  }
}
