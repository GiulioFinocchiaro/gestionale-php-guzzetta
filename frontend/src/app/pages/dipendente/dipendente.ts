import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BehaviorSubject, distinctUntilChanged, map, tap } from 'rxjs';
import { Navbar } from '../../components/navbar/navbar';
import { ApiService } from '../../services/api.service';
import { Dipendente, Permesso } from '../../models/entities';

@Component({
  selector: 'app-dipendente',
  standalone: true,
  imports: [CommonModule, Navbar, RouterModule],
  templateUrl: './dipendente.html',
  styleUrl: './dipendente.css',
})
export class DipendentePage implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);
  private destroyRef = inject(DestroyRef);

  dipendente$ = new BehaviorSubject<Dipendente | null>(null);
  permessi$ = new BehaviorSubject<Permesso[]>([]);
  loadingDipendente$ = new BehaviorSubject<boolean>(false);
  loadingPermessi$ = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<string | null>(null);

  readonly dipendenteId$ = this.route.queryParams.pipe(
    map((qp) => (qp['id'] ? Number(qp['id']) : null)),
    distinctUntilChanged(),
  );

  ngOnInit(): void {
    this.dipendenteId$
      .pipe(
        tap((id) => {
          this.error$.next(null);
          this.loadingDipendente$.next(true);
          this.loadingPermessi$.next(true);
          this.dipendente$.next(null);
          this.permessi$.next([]);

          if (!id || Number.isNaN(id)) {
            this.loadingDipendente$.next(false);
            this.loadingPermessi$.next(false);
            this.error$.next('ID dipendente non valido o mancante nei query params (?id=...)');
            return;
          }

          this.api.get<{ success: boolean; data: Dipendente }>(`/dipendenti/${id}`).subscribe({
            next: (res) => {
              this.dipendente$.next(res?.data ?? null);
              this.loadingDipendente$.next(false);
            },
            error: (err) => {
              this.loadingDipendente$.next(false);
              this.error$.next(err?.message ?? 'Errore nel caricamento del dipendente');
            },
          });

          this.api.get<{ success: boolean; data: Permesso[] }>(`/permessi/dipendente/${id}`).subscribe({
            next: (res) => {
              this.permessi$.next(Array.isArray(res?.data) ? res.data : []);
              this.loadingPermessi$.next(false);
            },
            error: (err) => {
              this.loadingPermessi$.next(false);
              this.error$.next(err?.message ?? 'Errore nel caricamento dei permessi');
            },
          });
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
