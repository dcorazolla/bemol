<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Validator;


class UserController extends Controller
{

    /**
     * Exibe lista de usuarios
     */
    public function index()
    {
        $usuarios = User::orderBy("name")->get();
 
        return response()->json([
            "success" => true,
            "message" => "Lista de usuários",
            "data" => $usuarios
        ], 200);
    }

    /**
     * recupera dados do usuario
     */
    public function show($id)
    {
        $usuario = User::find($id);
        if (is_null($usuario)) {
            return $this->sendError('Usuario nao encontrado.');
        }
        return response()->json([
            "success" => true,
            "message" => "Usuario recuperado com sucesso.",
            "data" => $usuario
        ], 200);
    }

    /**
     * Grava novo usuario
     */
    public function store(Request $request)
    {

        // dd($request->all());
        $input = $request->all();
        
        $validator = Validator::make($input, [
            'name' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:6',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $usuario = new User();
        $usuario->name = $input['name'];
        $usuario->email = $input['email'];
        $usuario->password = bcrypt($input['password']);
        if ($request->cellphone!=null) $usuario->cellphone = $request->password;
        if ($request->phone!=null) $usuario->phone = $request->phone;
        if ($request->instaaccount!=null) $usuario->instaaccount = $request->instaaccount;
        if ($request->faceaccount!=null) $usuario->faceaccount = $request->faceaccount;
        if ($request->twitteraccount!=null) $usuario->twitteraccount = $request->twitteraccount;
        $usuario->save();

        return response()->json([
            "success" => true,
            "message" => "Usuário adicionado com sucesso",
            "data" => $usuario
        ], 201);

    }

    /**
     * Atualiza usuário
     */
    public function update(Request $request)
    {

        $input = $request->all();
        // dd($input);
        $validator = Validator::make($input, [
            'id' => 'required',
            'name' => 'required',
            'email' => 'required'
        ]);
 
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);    
        }

        $usuario = User::find($request->id);

        // $usuario = new User();
        // $usuario->id = $request->id;
        $usuario->name = $input["name"];
        $usuario->email = $input["email"];
        if (isset($input["password"]) && !empty($input["password"])) $usuario->password = bcrypt($input["password"]);
        if (isset($input["cellphone"]) && !empty($input["cellphone"])) $usuario->cellphone = $input["cellphone"];
        if (isset($input["phone"]) && !empty($input["phone"])) $usuario->phone = $input["phone"];
        if (isset($input["instaaccount"]) && !empty($input["instaaccount"])) $usuario->instaaccount = $input["instaaccount"];
        if (isset($input["faceaccount"]) && !empty($input["faceaccount"])) $usuario->faceaccount = $input["faceaccount"];
        if (isset($input["twitteraccount"]) && !empty($input["twitteraccount"])) $usuario->twitteraccount = $input["twitteraccount"];
        $usuario->save();

        return response()->json([
            "success" => true,
            "message" => "Usuario atualizado com sucesso.",
            "data" => $usuario
        ], 204);
    }

    public function destroy($id)
    {
        $usuario = User::find($id);

        if (is_null($usuario)) {
            return $this->sendError('Usuario nao encontrado.');
        }
        $usuario->delete();

        return response()->json([
            "success" => true,
            "message" => "Usuario apagado com sucesso.",
            "data" => $usuario
        ], 204);
    }

    public function sendError($mensagem)
    {
        return response()->json([
            "success" => false,
            "message" => $mensagem,
            "data" => []
        ], 400);
    }
    
}
