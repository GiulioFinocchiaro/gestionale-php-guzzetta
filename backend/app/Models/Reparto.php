<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reparto extends Model
{
    protected $table = 'Reparto';
    protected $primaryKey = 'ID_Reparto';
    public $incrementing = true;
    protected $keyType = 'int';
    public $timestamps = false;

    protected $fillable = [
        'nomeReparto',
    ];

    public function dipendenti()
    {
        return $this->hasMany(Dipendente::class, 'Fk_Reparto', 'ID_Reparto');
    }
}

