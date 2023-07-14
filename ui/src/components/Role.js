// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useCookies } from 'react-cookie';

// const Role = () => {
//   const [roles, setRoles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [cookies] = useCookies(['user']);

//   const [editingRoleId, setEditingRoleId] = useState(null);
//   const [editFormData, setEditFormData] = useState({
//     name: '',
//     guard_name: '',
//     permissions: [],
//   });

//   const token = cookies.user.data.token;

//   useEffect(() => {
//     fetchRoles();
//   }, []);

//   const fetchRoles = async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/api/roles', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setRoles(response.data);
//       setLoading(false);
//     } catch (error) {
//       setError('Failed to fetch roles');
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://127.0.0.1:8000/api/roles/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       fetchRoles();
//     } catch (error) {
//       setError('Failed to delete role');
//     }
//   };

//   const handleShow = async (id) => {
//     try {
//       const response = await axios.get(`http://127.0.0.1:8000/api/roles/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log(response.data); // Display the role details
//     } catch (error) {
//       setError('Failed to fetch role details');
//     }
//   };

//   const handleEdit = async (role) => {
//     try {
//       const response = await axios.get(`http://127.0.0.1:8000/api/roles/${role.id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const { id, name, guard_name, permissions } = response.data;
//       setEditingRoleId(id);
//       setEditFormData({
//         name: name,
//         guard_name: guard_name,
//         permissions: permissions,
//       });
//     } catch (error) {
//       console.error('Error fetching role details:', error);
//     }
//   };

//   const handleEditInputChange = (e) => {
//     setEditFormData({
//       ...editFormData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleEditCheckboxChange = (e) => {
//     const permission = e.target.value;
//     const updatedPermissions = [...editFormData.permissions];
//     if (e.target.checked) {
//       updatedPermissions.push(permission);
//     } else {
//       const index = updatedPermissions.indexOf(permission);
//       if (index > -1) {
//         updatedPermissions.splice(index, 1);
//       }
//     }
//     setEditFormData({
//       ...editFormData,
//       permissions: updatedPermissions,
//     });
//   };

//   const handleEditSubmit = async (e, id) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://127.0.0.1:8000/api/roles/${id}`, editFormData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setEditingRoleId(null);
//       fetchRoles();
//     } catch (error) {
//       setError('Failed to update role');
//     }
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div>
//       <h1>Roles</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {roles.map((role) => (
//             <tr key={role.id}>
//               <td>
//                 {role.id === editingRoleId ? (
//                   <input
//                     type="text"
//                     name="name"
//                     value={editFormData.name}
//                     onChange={handleEditInputChange}
//                   />
//                 ) : (
//                   role.name
//                 )}
//               </td>
//               <td>
//                 {role.id === editingRoleId ? (
//                   <>
//                     <input
//                       type="text"
//                       name="guard_name"
//                       value={editFormData.guard_name}
//                       onChange={handleEditInputChange}
//                     />
//                     {editFormData.permissions.map((permission) => (
//                       <label key={permission}>
//                         <input
//                           type="checkbox"
//                           name="permission"
//                           value={permission}
//                           checked={editFormData.permissions.includes(permission)}
//                           onChange={handleEditCheckboxChange}
//                         />
//                         {permission}
//                       </label>
//                     ))}
//                     <button onClick={(e) => handleEditSubmit(e, role.id)}>Save</button>
//                     <button onClick={() => setEditingRoleId(null)}>Cancel</button>
//                   </>
//                 ) : (
//                   <>
//                     <button onClick={() => handleShow(role.id)}>Show</button>
//                     <button onClick={() => handleEdit(role)}>Edit</button>
//                     <button onClick={() => handleDelete(role.id)}>Delete</button>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Role;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Role = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cookies] = useCookies(['user']);

  const [editingRoleId, setEditingRoleId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    permissions: [],
  });

  const [newRoleFormData, setNewRoleFormData] = useState({
    name: '',
    permissions: [],
  });

  const token = cookies.user.data.token;

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/roles', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRoles(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch roles');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/roles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchRoles();
    } catch (error) {
      setError('Failed to delete role');
    }
  };

  const handleShow = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/roles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data); // Display the role details
    } catch (error) {
      setError('Failed to fetch role details');
    }
  };

  const handleEdit = async (role) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/roles/${role.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { id, name, permissions } = response.data;
      setEditingRoleId(id);
      setEditFormData({
        name: name,
        permissions: permissions,
      });
    } catch (error) {
      console.error('Error fetching role details:', error);
    }
  };

  const handleEditInputChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditCheckboxChange = (e) => {
    const permission = e.target.value;
    const updatedPermissions = [...editFormData.permissions];
    if (e.target.checked) {
      updatedPermissions.push(permission);
    } else {
      const index = updatedPermissions.indexOf(permission);
      if (index > -1) {
        updatedPermissions.splice(index, 1);
      }
    }
    setEditFormData({
      ...editFormData,
      permissions: updatedPermissions,
    });
  };

  const handleEditSubmit = async (e, id) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/roles/${id}`, editFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEditingRoleId(null);
      fetchRoles();
    } catch (error) {
      setError('Failed to update role');
    }
  };

  const handleCreateRole = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/roles',
        {
          name: newRoleFormData.name,
          permission: newRoleFormData.permissions,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data); // Display the created role
      // Reset the form data
      setNewRoleFormData({
        name: '',
        permissions: [],
      });
    } catch (error) {
      setError('Failed to create role');
    }
  };
  
  

  const handleNewRoleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const updatedPermissions = [...newRoleFormData.permissions];
      if (checked) {
        updatedPermissions.push(value);
      } else {
        const index = updatedPermissions.indexOf(value);
        if (index > -1) {
          updatedPermissions.splice(index, 1);
        }
      }
      setNewRoleFormData({
        ...newRoleFormData,
        permissions: updatedPermissions,
      });
    } else {
      setNewRoleFormData({
        ...newRoleFormData,
        [name]: value,
      });
    }
  };

  const permissions = [
    'user-list',
    'user-create',
    'user-edit',
    'user-delete',
    'role-list',
    'role-create',
    'role-edit',
    'role-delete',
    'product-list',
    'product-create',
    'product-edit',
    'product-delete',
  ];

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Roles</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>
                {role.id === editingRoleId ? (
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditInputChange}
                  />
                ) : (
                  role.name
                )}
              </td>
              <td>
                {role.id === editingRoleId ? (
                  <>
                    {permissions.map((permission) => (
                      <label key={permission}>
                        <input
                          type="checkbox"
                          name="permission"
                          value={permission}
                          checked={editFormData.permissions.includes(permission)}
                          onChange={handleEditCheckboxChange}
                        />
                        {permission}
                      </label>
                    ))}
                    <button onClick={(e) => handleEditSubmit(e, role.id)}>Save</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleShow(role.id)}>Show</button>
                    <button onClick={() => handleEdit(role)}>Edit</button>
                    <button onClick={() => handleDelete(role.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Create New Role</h2>
      <form onSubmit={handleCreateRole}>
        <label htmlFor="roleName">Role Name:</label>
        <input
          type="text"
          id="roleName"
          name="name"
          value={newRoleFormData.name}
          onChange={handleNewRoleInputChange}
        />
        {permissions.map((permission) => (
          <label key={permission}>
            <input
              type="checkbox"
              name="permission"
              value={permission}
              checked={newRoleFormData.permissions.includes(permission)}
              onChange={handleNewRoleInputChange}
            />
            {permission}
          </label>
        ))}
        <button type="submit">Create Role</button>
      </form>
    </div>
  );
};

export default Role;
