<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['name', 'price', 'stock'];
    public function scopeLowStock($query){
        return $query->where('stock', '<', 5);
    }
}
