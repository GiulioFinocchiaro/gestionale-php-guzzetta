<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TbAdmin extends Model
{
    protected $table = 'tbadmin';
    protected $primaryKey = 'idAdmin';
    protected $keyType = 'int';
    public $timestamps = false;

    protected $fillable = [
        'username',
        'password',
        'nome',
        'cognome',
    ];

    protected $hidden = [
        'password',
    ];
}

