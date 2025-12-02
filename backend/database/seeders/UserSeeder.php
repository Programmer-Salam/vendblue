<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            ['name' => 'wale', 'email' => 'wale@example.com', 'password' => Hash::make('password123')],
            ['name' => 'badmus', 'email' => 'badmus@example.com', 'password' => Hash::make('password123')],
            ['name' => 'vendblue', 'email' => 'vendblue@example.com', 'password' => Hash::make('password123')],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
