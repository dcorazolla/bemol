<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Validator;


class UserController extends Controller
{
    
    public function userProfile() {
        return response()->json(auth('api')->user());
    }

    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:6',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        // dd($request->all());

        $usuario = new User();
        $usuario->name = $request->name;
        $usuario->email = $request->email;
        $usuario->password = bcrypt($request->password);
        $usuario->save();

        return response()->json([
            'message' => 'User successfully registered',
            'user' => $usuario
        ], 201);
    }

    public function list(Request $request) {
        return response()->json(User::orderBy("name")->get());
    }

}
