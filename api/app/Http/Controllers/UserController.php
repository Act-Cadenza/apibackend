<?php
    
namespace App\Http\Controllers;
    
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use DB;
use Hash;
use Illuminate\Support\Arr;
    
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $users = User::all();
        // return response()->json($users);

        $users = User::all();
        $roles = Role::all();

        $usersWithRoles = $users->map(function ($user) use ($roles) {
            $userRoles = $user->roles->pluck('name')->implode(', ');
            $user->roles = $userRoles;
            return $user;
        });

        return response()->json([
            'users' => $usersWithRoles,
        ]);


    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $this->validate($request, [
        //     'name' => 'required',
        //     'email' => 'required|email|unique:users,email',
        //     'password' => 'required|same:confirm-password',
        //     'roles' => 'required'
        // ]);
    
        // $input = $request->all();
        // $input['password'] = Hash::make($input['password']);
    
        // $user = User::create($input);
        // $user->assignRole($request->input('roles'));
    
        // return response()->json($user, 201);


        if ($request->user()->hasPermissionTo('user-create')) {
            $this->validate($request, [
                'name' => 'required',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|same:confirm-password',
                'roles' => 'required'
            ]);
        
            $input = $request->all();
            $input['password'] = Hash::make($input['password']);
        
            $user = User::create($input);
            $user->assignRole($request->input('roles'));
        
            return response()->json($user, 201);
    
           
        } else {
            
            return response()->json(['message' => 'Unauthorized'], 403);
        }
    }
    
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        return response()->json($user);
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // $this->validate($request, [
        //     'name' => 'required',
        //     'email' => 'required|email|unique:users,email,'.$id,
        //     'password' => 'same:confirm-password',
        //     'roles' => 'required'
        // ]);
    
        // $input = $request->all();
        // if (!empty($input['password'])) { 
        //     $input['password'] = Hash::make($input['password']);
        // } else {
        //     $input = Arr::except($input, array('password'));    
        // }
    
        // $user = User::find($id);
        // if (!$user) {
        //     return response()->json(['message' => 'User not found'], 404);
        // }
        // $user->update($input);
        // DB::table('model_has_roles')->where('model_id', $id)->delete();
    
        // $user->assignRole($request->input('roles'));
    
        // return response()->json($user);

        if ($request->user()->hasPermissionTo('user-edit')) {
            $this->validate($request, [
                'name' => 'required',
                'email' => 'required|email|unique:users,email,'.$id,
                'password' => 'same:confirm-password',
                'roles' => 'required'
            ]);
        
            $input = $request->all();
            if (!empty($input['password'])) { 
                $input['password'] = Hash::make($input['password']);
            } else {
                $input = Arr::except($input, array('password'));    
            }
        
            $user = User::find($id);
            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }
            $user->update($input);
            DB::table('model_has_roles')->where('model_id', $id)->delete();
        
            $user->assignRole($request->input('roles'));
        
            return response()->json($user);
           
        } else {
            
            return response()->json(['message' => 'Unauthorized'], 403);
        }
    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        // $user = User::find($id);
        // if (!$user) {
        //     return response()->json(['message' => 'User not found'], 404);
        // }
        // $user->delete();
        // return response()->json(['message' => 'User deleted successfully']);


        if ($request->user()->hasPermissionTo('user-delete')) {
            $user = User::find($id);
            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }
            $user->delete();
            return response()->json(['message' => 'User deleted successfully']);
        } else {
            
            return response()->json(['message' => 'Unauthorized'], 403);
        }
    }
}
