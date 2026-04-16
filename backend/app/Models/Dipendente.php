<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class Dipendente extends Model
{
    protected $table = 'Dipendente';
    protected $primaryKey = 'id_Dipendente';
    public $incrementing = true;
    protected $keyType = 'int';
    public $timestamps = false;

    protected $fillable = [
        'Fk_Reparto',
        'nome',
        'cognome',
        'dataNascita',
        'codFiscale',
        'dataAssunzione',
        'sesso',
        'comuneNascita',
        'stipendioAnnuo',
        'pathFoto',
    ];

    protected $appends = ['pathFoto_url'];

    public function reparto()
    {
        return $this->belongsTo(Reparto::class, 'Fk_Reparto', 'ID_Reparto');
    }

    public function permessi()
    {
        return $this->hasMany(Permesso::class, 'FK_Dipendente', 'id_Dipendente');
    }

    public function getPathFotoUrlAttribute()
    {
        if (!$this->pathFoto) {
            return null;
        }

        if (Str::startsWith($this->pathFoto, ['http://', 'https://'])) {
            return $this->pathFoto;
        }

        $baseUrl = url('/');

        return rtrim($baseUrl, '/') . '/storage/' . ltrim($this->pathFoto, '/');
    }
}
