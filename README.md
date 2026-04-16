# Fantasilandia Park - Gestionale

Questo progetto è un sistema gestionale per il parco divertimenti **Fantasilandia Park** (noto anche come *gestionale-php-guzzetta*). È composto da un backend robusto basato su Laravel e un'interfaccia frontend moderna sviluppata in Angular.

## Architettura del Progetto

Il repository è diviso in due macro-cartelle principali:

- `/backend`: Contiene le API REST costruite con [Laravel](https://laravel.com/). Si occupa della logica di business, dell'autenticazione, della gestione del database e della sicurezza.
- `/frontend`: Contiene l'applicazione web sviluppata con [Angular](https://angular.dev/). Interagisce con le API fornite dal backend per offrire un'interfaccia utente interattiva per l'amministrazione e la gestione.

## Requisiti di Sistema

Per eseguire correttamente l'intero progetto, è necessario avere installato sul proprio ambiente di sviluppo:
- **PHP** (v8.2 o superiore)
- **Composer** (per le dipendenze del backend)
- **Node.js** (v18 o superiore)
- **NPM** o **Yarn** (per le dipendenze del frontend)
- **Angular CLI**

## Avvio rapido

### 1. Configurazione Backend

1. Spostati nella directory del backend:
   ```bash
   cd backend
   ```
2. Installa le dipendenze PHP tramite Composer:
   ```bash
   composer install
   ```
3. Crea e configura il file `.env` copiando il template di esempio:
   ```bash
   cp .env.example .env
   ```
   *(Assicurati di configurare i parametri del database in questo file. Il progetto supporta SQLite o MySQL a seconda delle tue preferenze).*
4. Genera la chiave dell'applicazione:
   ```bash
   php artisan key:generate
   ```
5. Esegui le migrazioni per creare la struttura del database e i seeder per popolarlo:
   ```bash
   php artisan migrate --seed
   ```
6. Avvia il server di sviluppo backend:
   ```bash
   php artisan serve
   ```
   *Il backend sarà solitamente disponibile su `http://localhost:8000`.*

### 2. Configurazione Frontend

1. Apri un nuovo terminale e spostati nella directory del frontend:
   ```bash
   cd frontend
   ```
2. Installa le dipendenze del pacchetto Node:
   ```bash
   npm install
   ```
3. Avvia il server di sviluppo Angular:
   ```bash
   npm start
   ```
   o
   ```bash
   ng serve
   ```
   *L'applicazione frontend sarà disponibile all'indirizzo `http://localhost:4200`.*

## Principali Funzionalità e Modelli

Il sistema gestionale espone diverse entità relative alla gestione del parco, tra cui:
- **Dipendenti** e **Reparti**: Per la gestione delle risorse umane del parco.
- **Permessi**: Livelli di accesso e ruoli nel sistema.
- **Attrazioni**: Gestione delle varie giostre/attrazioni disponibili.
- **Visite**: Tracciamento dell'affluenza.
- **Recensioni**: Feedback dei visitatori.
- **Admin**: Amministratori di sistema.

## API Documentation

Il backend espone le rotte in `backend/routes/api.php`. Ulteriori informazioni sull'integrazione o specifiche sugli endpoint possono essere trovate esaminando i controller presenti o visualizzando eventuali documentazioni OpenAPI se generata (es. file `openapi.json` fornito in public).

---

Sviluppato per il progetto gestionale Fantasilandia Park.

