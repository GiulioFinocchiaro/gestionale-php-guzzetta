<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Permesso extends Model
{
    protected $table = 'Permesso';
    protected $primaryKey = 'ID_Permesso';
    public $incrementing = true;
    protected $keyType = 'int';
    public $timestamps = false;

    protected $fillable = [
        'FK_Dipendente',
        'dataPermesso',
        'motivazione',
    ];

    public function dipendente()
    {
        return $this->belongsTo(Dipendente::class, 'FK_Dipendente', 'id_Dipendente');
    }
}

