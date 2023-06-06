<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{Product, User};

class TestController extends Controller
{
    public function test()
    {
        $user = User::first();

        $user->makeVisible('email');
        return $user->toArray();
    }
}
