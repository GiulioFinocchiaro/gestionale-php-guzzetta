# Frontend

Questo è il frontend dell'applicazione gestionale sviluppato utilizzando [Angular](https://angular.dev/) (versione 21+). L'applicazione fornisce un'interfaccia utente interattiva per l'amministrazione e la gestione delle varie entità, come dipendenti e reparti.

## Prerequisiti

Assicurati di avere installato:
- **Node.js** (v18 o superiore)
- **NPM** o **Yarn**
- **Angular CLI**

## Avvio rapido

1. Installa le dipendenze:
   ```bash
   npm install
   ```
2. Avvia il server di sviluppo:
   ```bash
   ng serve
   ```
   L'applicazione sarà disponibile all'indirizzo `http://localhost:4200/`. L'app si ricaricherà automaticamente ad ogni modifica dei file sorgente.

## Struttura del Progetto

Il codice sorgente principale si trova nella cartella `src/`. Alcune delle directory principali includono:
- `src/app/`: Contiene i componenti, i servizi, i modelli e la logica principale dell'applicazione.
- `src/assets/`: Contiene le immagini, i fogli di stile globali e altri asset statici.
- `src/environments/`: Configurazione per i diversi ambienti (sviluppo, produzione).

## Build

Per compilare il progetto per l'ambiente di produzione:

```bash
ng build
```
Questo ottimizzerà e minimizzerà i file, salvandoli nella cartella `dist/`.

## Collegamento col Backend

Il frontend effettua chiamate API REST al backend Laravel. Assicurati che l'URL di base dell'API sia configurato correttamente nei file all'interno della cartella `src/environments/` o nei servizi dedicati in base alle impostazioni del backend (solitamente `http://localhost:8000/api`).

## Test

Per eseguire i test unitari (configurati con Vitest):
```bash
ng test
```

Per eseguire i test end-to-end, usa `ng e2e` dopo aver configurato un framework appropriato (es. Cypress o Playwright).
