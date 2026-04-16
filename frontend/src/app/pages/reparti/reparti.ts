import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BehaviorSubject, combineLatest, distinctUntilChanged, map, Observable, tap } from 'rxjs';
import { Navbar } from '../../components/navbar/navbar';
import { RepartiService } from '../../services/reparti.service';
import { DipendentiService } from '../../services/dipendenti.service';
import { Reparto, Dipendente } from '../../models/entities';

@Component({
  selector: 'app-reparti',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar, RouterModule],
  templateUrl: './reparti.html',
  styleUrl: './reparti.css',
})
export class Reparti implements OnInit {
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private repartiService = inject(RepartiService);
  private dipendentiService = inject(DipendentiService);

  isDropdownOpen = false;
  isModalOpen = false;
  isSaving = false;
  selectedRepartoIdValue: number | null = null;
  selectedFile: File | null = null;

  newDipendente: Partial<Dipendente> = {
    nome: '',
    cognome: '',
    codFiscale: '',
    sesso: 'M',
  };

  reparti$: Observable<Reparto[]> = this.repartiService.list$;
  dipendenti$: Observable<Dipendente[]> = this.dipendentiService.list$;
  repartiError$ = this.repartiService.error$;
  dipendentiError$ = this.dipendentiService.error$;

  repartiLoading$ = new BehaviorSubject<boolean>(true);
  dipendentiLoading$ = new BehaviorSubject<boolean>(false);

  selectedRepartoId$: Observable<number | null> = this.route.queryParams.pipe(
    map((qp) => (qp['repartoId'] ? Number(qp['repartoId']) : null)),
    distinctUntilChanged(),
  );

  selectedRepartoLabel$: Observable<string | null> = combineLatest([
    this.reparti$,
    this.selectedRepartoId$
  ]).pipe(
    map(([list, id]) => {
      if (id == null) return null;
      const found = list.find((r) => r.id === id);
      return found ? (found.nomeReparto || `Reparto ${found.id}`) : null;
    }),
    distinctUntilChanged(),
  );

  ngOnInit(): void {
    this.repartiLoading$.next(true);
    this.repartiService.fetchAll();

    combineLatest([this.reparti$, this.repartiError$])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.repartiLoading$.next(false));

    // Reazione al cambio di queryParam
    this.selectedRepartoId$
      .pipe(
        tap((id) => this.selectedRepartoIdValue = id),
        tap(() => this.dipendentiLoading$.next(true)),
        tap((id) => {
          if (id == null) {
            this.dipendentiService.fetchAll();
          } else {
            this.dipendentiService.fetchByReparto(id);
          }
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();

    combineLatest([this.dipendenti$, this.dipendentiError$])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.dipendentiLoading$.next(false));
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(): void {
    setTimeout(() => {
      this.isDropdownOpen = false;
    }, 150);
  }

  selectReparto(reparto: Reparto | null): void {
    this.isDropdownOpen = false;
    const qp = { repartoId: reparto ? reparto.id : null };
    this.router.navigate([], {
      queryParams: qp,
      queryParamsHandling: 'merge'
    });
  }

  openModal(): void {
    this.isModalOpen = true;
    this.selectedFile = null;
    this.newDipendente = {
      nome: '',
      cognome: '',
      codFiscale: '',
      sesso: 'M',
      Fk_Reparto: this.selectedRepartoIdValue || undefined
    };
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  saveDipendente(): void {
    if (!this.newDipendente.nome || !this.newDipendente.cognome || !this.newDipendente.codFiscale || !this.newDipendente.Fk_Reparto) {
      alert('Compila i campi obbligatori (Nome, Cognome, Codice Fiscale, Reparto)');
      return;
    }
    this.isSaving = true;

    const formData = new FormData();
    formData.append('nome', this.newDipendente.nome || '');
    formData.append('cognome', this.newDipendente.cognome || '');
    formData.append('codFiscale', this.newDipendente.codFiscale || '');
    formData.append('Fk_Reparto', String(this.newDipendente.Fk_Reparto));

    if (this.newDipendente.sesso) {
      formData.append('sesso', this.newDipendente.sesso);
    }
    if (this.newDipendente.comuneNascita) {
      formData.append('comuneNascita', this.newDipendente.comuneNascita);
    }
    if (this.newDipendente.dataNascita) {
      formData.append('dataNascita', this.newDipendente.dataNascita);
    }
    if (this.newDipendente.dataAssunzione) {
      formData.append('dataAssunzione', this.newDipendente.dataAssunzione);
    }
    if (this.newDipendente.stipendioAnnuo) {
      formData.append('stipendioAnnuo', String(this.newDipendente.stipendioAnnuo));
    }
    if (this.selectedFile) {
      formData.append('foto', this.selectedFile);
    }

    this.dipendentiService.create(formData).subscribe({
      next: () => {
        this.isSaving = false;
        this.closeModal();
        if (this.selectedRepartoIdValue) {
          this.dipendentiService.fetchByReparto(this.selectedRepartoIdValue);
        } else {
          this.dipendentiService.fetchAll();
        }
      },
      error: (err) => {
        this.isSaving = false;
        console.error('Errore backend:', err);
        let errorMsg = err?.message || 'Errore durante la creazione del dipendente';
        if (err?.error?.detail) {
          errorMsg = JSON.stringify(err.error.detail);
        } else if (err?.error) {
          errorMsg = JSON.stringify(err.error);
        }
        alert('Errore HTTP 422: ' + errorMsg);
      }
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target?.files?.[0];
    if (file) {
      this.selectedFile = file;
    } else {
      this.selectedFile = null;
    }
  }
}
