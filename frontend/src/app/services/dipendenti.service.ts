// dipendenti.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Dipendente } from '../models/entities';

@Injectable({ providedIn: 'root' })
export class DipendentiService {
  private _list$ = new BehaviorSubject<Dipendente[]>([]);
  private _error$ = new BehaviorSubject<string | null>(null);

  readonly list$: Observable<Dipendente[]> = this._list$.asObservable();
  readonly error$: Observable<string | null> = this._error$.asObservable();

  constructor(private api: ApiService) {}

  private normalizeResponse(res: any): Dipendente[] {
    if (Array.isArray(res)) return res;
    if (Array.isArray(res?.data)) return res.data;
    return [];
  }

  fetchAll(): void {
    this._error$.next(null);
    this.api.get<any>('/dipendenti').subscribe({
      next: (res) => this._list$.next(this.normalizeResponse(res)),
      error: (err) => {
        this._list$.next([]);
        this._error$.next(err?.message ?? 'Errore nel caricamento dei dipendenti');
      },
    });
  }

  fetchByReparto(repartoId: number): void {
    this._error$.next(null);
    this.api.get<any>(`/dipendenti/reparto/${repartoId}`).subscribe({
      next: (res) => this._list$.next(this.normalizeResponse(res)),
      error: (err) => {
        this._list$.next([]);
        this._error$.next(err?.message ?? 'Errore nel caricamento dei dipendenti per reparto');
      },
    });
  }

  getById(id: number): Observable<Dipendente> {
    return this.api.get<Dipendente>(`/dipendenti/${id}`);
  }

  create(payload: Partial<Dipendente> | FormData): Observable<Dipendente> {
    return this.api.post<Dipendente>('/dipendenti', payload);
  }

  update(id: number, payload: Partial<Dipendente>): Observable<Dipendente> {
    return this.api.put<Dipendente>(`/dipendenti/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.api.delete<void>(`/dipendenti/${id}`);
  }
}
