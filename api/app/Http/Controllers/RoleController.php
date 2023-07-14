<?php
    
namespace App\Http\Controllers;
    
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Http\Controllers\UserController;
use DB;
    
class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $roles = Role::all();
        return response()->json($roles);
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
        //     'name' => 'required|unique:roles,name',
        //     'permission' => 'required',
        // ]);
    
        // $role = Role::create(['name' => $request->input('name')]);
        // $role->syncPermissions($request->input('permission'));
    
        // return response()->json($role, 201);

        if ($request->user()->hasPermissionTo('role-create')) {
            $this->validate($request, [
                'name' => 'required|unique:roles,name',
                'permission' => 'required',
            ]);
        
            $role = Role::create(['name' => $request->input('name')]);
            $role->syncPermissions($request->input('permission'));
        
            return response()->json($role, 201);
           
        } else {
            
            return response()->json(['message' => 'Unauthorized'], 403);
        }
    }
    
  
    public function show($id)
    {
        $role = Role::find($id);
        if (!$role) {
            return response()->json(['message' => 'Role not found'], 404);
        }
        
        $rolePermissions = Permission::join("role_has_permissions", "role_has_permissions.permission_id", "=", "permissions.id")
            ->where("role_has_permissions.role_id", $id)
            ->get(['permissions.name']);
        
        $role->permissions = $rolePermissions->pluck('name');
        
        return response()->json($role);
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
        //     'permission' => 'required',
        // ]);
    
        // $role = Role::find($id);
        // if (!$role) {
        //     return response()->json(['message' => 'Role not found'], 404);
        // }
        // $role->name = $request->input('name');
        // $role->save();
    
        // $role->syncPermissions($request->input('permission'));
    
        // return response()->json($role);

        if ($request->user()->hasPermissionTo('role-edit')) {
            $this->validate($request, [
                'name' => 'required',
                'permission' => 'required',
            ]);
        
            $role = Role::find($id);
            if (!$role) {
                return response()->json(['message' => 'Role not found'], 404);
            }
            $role->name = $request->input('name');
            $role->save();
        
            $role->syncPermissions($request->input('permission'));
        
            return response()->json($role);
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
        // $role = Role::find($id);
        // if (!$role) {
        //     return response()->json(['message' => 'Role not found'], 404);
        // }
        // $role->delete();
        // return response()->json(['message' => 'Role deleted successfully']);

        if ($request->user()->hasPermissionTo('role-delete')) {
            $role = Role::find($id);
        if (!$role) {
            return response()->json(['message' => 'Role not found'], 404);
        }
        $role->delete();
        return response()->json(['message' => 'Role deleted successfully']);
        } else {
            
            return response()->json(['message' => 'Unauthorized'], 403);
        }
    }
}
