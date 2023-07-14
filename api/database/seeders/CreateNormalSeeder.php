<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class CreateNormalSeeder extends Seeder
{
    public function run()
    {
        // Create an admin user
        $user = User::create([
            'name' => 'Normal User',
            'email' => 'q@q.com',
            'password' => bcrypt('q')
        ]);

        // Create the 'Admin' role
        $role = Role::create(['name' => 'Normal']);

        // Specify the permissions to be assigned to the role
        $permissionNames = ['user-list', 'role-list', 'product-list'];

        // Assign the specified permissions to the role
        foreach ($permissionNames as $permissionName) {
            $permission = Permission::where('name', $permissionName)->first();
            if ($permission) {
                $role->givePermissionTo($permission);
            }
        }

        // Assign the role to the Normal user
        $user->assignRole([$role->id]);
    }
}
