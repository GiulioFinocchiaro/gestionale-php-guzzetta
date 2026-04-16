<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

In addition, [Laracasts](https://laracasts.com) contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

You can also watch bite-sized lessons with real-world projects on [Laravel Learn](https://laravel.com/learn), where you will be guided through building a Laravel application from scratch while learning PHP fundamentals.

## Agentic Development

Laravel's predictable structure and conventions make it ideal for AI coding agents like Claude Code, Cursor, and GitHub Copilot. Install [Laravel Boost](https://laravel.com/docs/ai) to supercharge your AI workflow:

```bash
composer require laravel/boost --dev

php artisan boost:install
```

Boost provides your agent 15+ tools and skills that help agents build Laravel applications while following best practices.

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
# Backend Fantasilandia (Sistema Aziendale)

Questo è il backend Laravel per il sistema aziendale, che espone le API REST per la gestione di **Amministratori, Dipendenti, Reparti, Permessi e Studenti**.

## Requisiti

- PHP 8.x
- Composer
- Server MySQL / MariaDB (o XAMPP/MAMP)
- Node.js (opzionale per frontend)

## 🚀 Come far funzionare il server sul proprio PC

1. **Apri un terminale** e spostati nella cartella del progetto Laravel:
   ```bash
   cd percorso/del/progetto/backend/backend/backend
   ```

2. **Installa le dipendenze PHP** (se non l'hai già fatto):
   ```bash
   composer install
   ```

3. **Configura il Database:**
   Assicurati di aver importato il dump fornito (es. `dbprova.sql`) nel tuo database MySQL tramite phpMyAdmin, DBeaver o riga di comando.

   Controlla che il file `.env` esista nella cartella del progetto. Se non c'è, duplica `.env.example` in `.env`.
   Apri il file `.env` e configura i dati del tuo database:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=dbprova   # scrivi il nome del tuo database
   DB_USERNAME=root      # il tuo nome utente DB
   DB_PASSWORD=          # la tua password DB
   ```

4. **Crea il file link per lo storage (solo la prima volta):**
   Questo serve per rendere pubbliche le immagini dei dipendenti salvate sul backend.
   ```bash
   php artisan storage:link
   ```

5. **Avvia il server Laravel:**
   ```bash
   php artisan serve
   ```
   Il server si avvierà di base su `http://localhost:8000`. Mantieni questo terminale aperto.

---

## 📖 Swagger - Come funziona

Il progetto include **Swagger UI**, un'interfaccia interattiva geniale per testare tutte le API senza dover utilizzare programmi esterni come Postman.

- **Dashboard Swagger Interattiva**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **JSON dell'OpenAPI**: [http://localhost:8000/openapi.json](http://localhost:8000/openapi.json) (file grezzo da mandare ad esempio al frontend)

### Usare Swagger per testare una rotta:
1. Apri `http://localhost:8000/docs` nel browser mentre il server è avviato.
2. Clicca sull'API che ti interessa (es. `GET /dipendenti`).
3. Clicca il pulsante **"Try it out"**.
4. (Se stavi provando un POST o un endpoint con parametri come l'ID, riempi i campi richiesti).
5. Clicca sul pulsantone blu **"Execute"**.
6. Qualche riga più sotto vedrai immediatamente che cosa risponde il server (il `Response body`) e il codice di stato (es. `200 OK` o `422 Unprocessable Content`).

---

## 🛠 Le API

Tutti gli endpoint rispondono con il medesimo schema semplice. Quando va tutto bene, `success` sarà `true`. In caso contrario `false`, con una `message` che ne indica il motivo.

```json
{
  "success": true,
  "message": "Operazione andata a buon fine",
  "data": { ... }
}
```

### Le chiamate disponibili:

* **Admin (`/api/admin`)**
  * `POST /login`: Logga l'admin in base a `username` e `password` codificata in MD5 nel database. Nessun token ritornato.
  * `GET /`: Ottiene la lista degli admin.
  * `GET /{id}`: Prende il dettaglio di un singolo admin.

* **Dipendenti (`/api/dipendenti`)**
  * `GET /`: Ritorna tutti i dipendenti dell'azienda.
  * `GET /{id}`: Prende il singolo dipendente.
  * `POST /`: Crea il dipendente. Sfrutta il formato richiesta `multipart/form-data` per consentire anche l'upload del file per la **foto**. Il percorso verrà creato in modo autonomo!
  * `GET /reparto/{repartoId}`: Restituisce l'elenco dei dipendenti che lavorano unicamente per quel determinato reparto.

* **Reparti (`/api/reparti`)**
  * `GET /`: Lista di tutti i reparti.
  * `GET /{id}`: Dettagli di un reparto.

* **Permessi (`/api/permessi`)**
  * `GET /dipendente/{dipendenteId}`: Oltrepassa le chiamate generiche e filtra direttamente i permessi concessi a uno specifico dipendente.
  
* **Studenti (`/api/studenti`)**
  * `GET /`: Lista di tutti gli studenti iscritti/collegati ai dipendenti.
  * `GET /{id}`: Singolo studente.

Per guardare i parametri inviabili sui POST, utilizza la console del `/docs` spiegata sopra o consulta il file interattivo `API_DOCS_AZIENDA.md` che si trova sempre all'interno di questa cartella!
