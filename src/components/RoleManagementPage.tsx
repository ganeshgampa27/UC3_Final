// import React, { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
// import { Button } from './ui/button';
// import { Badge } from './ui/badge';
// import { Input } from './ui/input';
// import { Label } from './ui/label';
// import { 
//   Users, 
//   Search, 
//   Shield, 
//   UserPlus,
//   Edit3,
//   Trash2,
//   X
// } from 'lucide-react';

// interface RoleManagementProps {
//   currentUser: any;
//   selectedProvider: string;
// }

// interface Role {
//   id: string;
//   name: string;
//   description: string;
//   permissions: string[];
//   userCount: number;
//   provider: string;
// }

// const RoleManagement = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedProvider, setSelectedProvider] = useState('all');
//   const [currentUser, setCurrentUser] = useState<any>(null);
    
//   const [roles, setRoles] = useState<Role[]>([
//     {
//       id: 'role-1',
//       name: 'Data Engineer',
//       description: 'Full access to all cloud resources',
//       permissions: ['S3', 'RDS', 'Lambda', 'CloudWatch'],
//       userCount: 3,
//       provider: 'all'
//     },
//     {
//       id: 'role-2',
//       name: 'Developer',
//       description: 'Development access to AWS resources',
//       permissions: ['EC2', 'S3', 'Lambda'],
//       userCount: 8,
//       provider: 'aws'
//     },
//     {
//       id: 'role-3',
//       name: 'Data Analyst',
//       description: 'Operational access to Azure services',
//       permissions: ['Blob Storage', 'Virtual Machines', 'Azure SQL Database'],
//       userCount: 5,
//       provider: 'azure'
//     },
//     {
//       id: 'role-4',
//       name: 'IT Support',
//       description: 'Read-only access to GCP resources',
//       permissions: ['GCP', 'Compute Engine', 'Cloud Storage'],
//       userCount: 12,
//       provider: 'gcp'
//     }
//   ]);
//   const [showEditForm, setShowEditForm] = useState<boolean>(false);
//   const [editRole, setEditRole] = useState<Role | null>(null);
//   const [showAddForm, setShowAddForm] = useState<boolean>(false);
//   const [newRole, setNewRole] = useState<{
//     name: string;
//     description: string;
//     permissions: string;
//     provider: string;
//   }>({
//     name: '',
//     description: '',
//     permissions: '',
//     provider: 'all'
//   });

//   const filteredRoles = roles.filter(role => {
//     const matchesSearch = role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          role.description.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesProvider = selectedProvider === 'all' || role.provider === selectedProvider || role.provider === 'all';
//     return matchesSearch && matchesProvider;
//   });

//   const handleAddRole = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const newId = `role-${Date.now()}`;
//     const newRoleData: Role = {
//       id: newId,
//       name: newRole.name,
//       description: newRole.description,
//       permissions: newRole.permissions.split(',').map(p => p.trim()).filter(p => p),
//       userCount: 0,
//       provider: newRole.provider
//     };
//     setRoles([...roles, newRoleData]);
//     setNewRole({
//       name: '',
//       description: '',
//       permissions: '',
//       provider: 'all'
//     });
//     setShowAddForm(false);
//   };

//   const handleEditClick = (role: Role) => {
//     setEditRole({ ...role });
//     setShowEditForm(true);
//   };

//   const handleEditRole = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!editRole) return;

//     setRoles(
//       roles.map((role) =>
//         role.id === editRole.id
//           ? {
//               ...editRole,
//               permissions: editRole.permissions
//                 .join(',')
//                 .split(',')
//                 .map(p => p.trim())
//                 .filter(p => p)
//             }
//           : role
//       )
//     );
//     setEditRole(null);
//     setShowEditForm(false);
//   };

//   const handleDeleteRole = (roleId: string) => {
//     if (window.confirm('Are you sure you want to delete this role?')) {
//       setRoles(roles.filter(role => role.id !== roleId));
//     }
//   };

//   const handleCancel = () => {
//     setEditRole(null);
//     setShowEditForm(false);
//     setNewRole({
//       name: '',
//       description: '',
//       permissions: '',
//       provider: 'all'
//     });
//     setShowAddForm(false);
//   };

//   return (
//     <div className="space-y-6">
//       {showAddForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <Card className="w-full max-w-lg p-6 relative">
//             <Button
//               variant="ghost"
//               size="sm"
//               className="absolute top-2 right-2"
//               onClick={handleCancel}
//             >
//               <X className="w-4 h-4" />
//             </Button>
//             <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Role</h2>
//             <form onSubmit={handleAddRole} className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="add-name" className="text-gray-700">
//                     Name
//                   </Label>
//                     <Input
//                       id="add-name"
//                       type="text"
//                       value={newRole.name}
//                       onChange={(e) =>
//                         setNewRole({ ...newRole, name: e.target.value })
//                       }
//                       placeholder="Enter role name"
//                       className="h-10 border-gray-300 focus:border-cloud-purple focus:ring-cloud-purple"
//                       required
//                     />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="add-description" className="text-gray-700">
//                     Description
//                   </Label>
//                   <Input
//                     id="add-description"
//                     type="text"
//                     value={newRole.description}
//                     onChange={(e) =>
//                       setNewRole({ ...newRole, description: e.target.value })
//                     }
//                     placeholder="Enter description"
//                     className="h-10 border-gray-300 focus:border-cloud-purple focus:ring-cloud-purple"
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="add-permissions" className="text-gray-700">
//                     Permissions (comma-separated)
//                   </Label>
//                   <Input
//                     id="add-permissions"
//                     type="text"
//                     value={newRole.permissions}
//                     onChange={(e) =>
//                       setNewRole({ ...newRole, permissions: e.target.value })
//                     }
//                     placeholder="Enter permissions"
//                     className="h-10 border-gray-300 focus:border-cloud-purple focus:ring-cloud-purple"
//                     required
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="add-provider" className="text-gray-700">
//                     Provider
//                   </Label>
//                   <select
//                     id="add-provider"
//                     value={newRole.provider}
//                     onChange={(e) =>
//                       setNewRole({ ...newRole, provider: e.target.value })
//                     }
//                     className="w-full h-10 border border-gray-300 rounded-lg text-sm focus:border-cloud-purple focus:ring-cloud-purple"
//                   >
//                     <option value="all">All</option>
//                     <option value="aws">AWS</option>
//                     <option value="azure">Azure</option>
//                     <option value="gcp">GCP</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="flex justify-end space-x-2">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   size="sm"
//                   onClick={handleCancel}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   size="sm"
//                   className="bg-cloud-purple text-white hover:bg-cloud-purple-600"
//                 >
//                   Add Role
//                 </Button>
//               </div>
//             </form>
//           </Card>
//         </div>
//       )}

//       {showEditForm && editRole && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <Card className="w-full max-w-lg p-6 relative">
//             <Button
//               variant="ghost"
//               size="sm"
//               className="absolute top-2 right-2"
//               onClick={handleCancel}
//             >
//               <X className="w-4 h-4" />
//             </Button>
//             <h2 className="text-lg font-semibold text-gray-800 mb-4">Edit Role</h2>
//             <form onSubmit={handleEditRole} className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="edit-name" className="text-gray-700">
//                     Name
//                   </Label>
//                   <Input
//                     id="edit-name"
//                     type="text"
//                     value={editRole.name}
//                     onChange={(e) =>
//                       setEditRole({ ...editRole, name: e.target.value })
//                     }
//                     placeholder="Enter role name"
//                     className="h-10 border-gray-300 focus:border-cloud-purple focus:ring-cloud-purple"
//                     required
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="edit-description" className="text-gray-700">
//                     Description
//                   </Label>
//                   <Input
//                     id="edit-description"
//                     type="text"
//                     value={editRole.description}
//                     onChange={(e) =>
//                       setEditRole({ ...editRole, description: e.target.value })
//                     }
//                     placeholder="Enter description"
//                     className="h-10 border-gray-300 focus:border-cloud-purple focus:ring-cloud-purple"
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="edit-permissions" className="text-gray-700">
//                     Permissions (comma-separated)
//                   </Label>
//                   <Input
//                     id="edit-permissions"
//                     type="text"
//                     value={editRole.permissions.join(', ')}
//                     onChange={(e) =>
//                       setEditRole({ ...editRole, permissions: e.target.value.split(',') })
//                     }
//                     placeholder="Enter permissions"
//                     className="h-10 border-gray-300 focus:border-cloud-purple focus:ring-cloud-purple"
//                     required
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="edit-provider" className="text-gray-700">
//                     Provider
//                   </Label>
//                   <select
//                     id="edit-provider"
//                     value={editRole.provider}
//                     onChange={(e) =>
//                       setEditRole({ ...editRole, provider: e.target.value })
//                     }
//                     className="w-full h-10 border border-gray-300 rounded-lg text-sm focus:border-cloud-purple focus:ring-cloud-purple"
//                   >
//                     <option value="all">All</option>
//                     <option value="aws">AWS</option>
//                     <option value="azure">Azure</option>
//                     <option value="gcp">GCP</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="flex justify-end space-x-2">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   size="sm"
//                   onClick={handleCancel}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   size="sm"
//                   className="bg-cloud-purple text-white hover:bg-cloud-purple-600"
//                 >
//                   Save Changes
//                 </Button>
//               </div>
//             </form>
//           </Card>
//         </div>
//       )}

      

//       <Card>
//         <CardContent className="p-4">
//           {/* Search + Create Role button side-by-side */}
//           <div className="flex items-center gap-2">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
//               <Input
//                 placeholder="Search roles..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//             <Button onClick={() => setShowAddForm(true)} className="shrink-0">
//               <UserPlus className="w-4 h-4 mr-2" />
//               Create Role
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {filteredRoles.map((role) => (
//           <Card key={role.id} className="hover:shadow-medium transition-shadow">
//             <CardHeader>
//               <div className="flex items-start justify-between">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
//                     <Shield className="w-5 h-5 text-primary-foreground" />
//                   </div>
//                   <div>
//                     <CardTitle className="text-lg">{role.name}</CardTitle>
//                     <p className="text-sm text-muted-foreground">{role.description}</p>
//                   </div>
//                 </div>
//                 <div className="flex space-x-2">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => handleEditClick(role)}
//                   >
//                     <Edit3 className="w-4 h-4 mr-1" />
//                     Edit
//                   </Button>
//                   <Button
//                     variant="destructive"
//                     size="sm"
//                     onClick={() => handleDeleteRole(role.id)}
//                   >
//                     <Trash2 className="w-4 h-4 mr-1" />
//                     Delete
//                   </Button>
//                 </div>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div>
//                   <span className="text-sm font-medium text-foreground">Permissions:</span>
//                   <div className="flex flex-wrap gap-1 mt-1">
//                     {role.permissions.map((permission) => (
//                       <Badge key={permission} variant="secondary" className="text-xs">
//                         {permission}
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-muted-foreground">
//                     {role.userCount} users assigned
//                   </span>
//                   <Badge variant="outline">
//                     {role.provider.toUpperCase()}
//                   </Badge>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RoleManagement;
























import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { 
  Users, 
  Search, 
  Shield, 
  UserPlus,
  Edit3,
  Trash2,
  X,
  RefreshCw,
  AlertTriangle
} from "lucide-react";

// === Types ===
interface RoleManagementProps {
  currentUser?: any;
  selectedProvider?: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  provider: "aws" | "azure" | "gcp" | "all" | string;
}

// === Helpers ===
const API_URL =
  "https://tkvbq8wok6.execute-api.ap-south-1.amazonaws.com/get_roles";

function titleCase(s: string) {
  return s
    .toLowerCase()
    .split(/\s|_/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

/**
 * Parses strings like "[developer: cloudfront,iam,ec2,lambda,s3]"
 * into a Role object. Defaults provider to "aws" since the API
 * is AWS-focused. Adds a sensible description.
 */
function parseRoleString(str: string): Role | null {
  const match = str.match(/^\s*\[(.+?):\s*(.+)\]\s*$/i);
  if (!match) return null;
  const nameRaw = match[1]?.trim() || "role";
  const permsRaw = match[2] || "";
  const permissions = permsRaw
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);

  const role: Role = {
    id: `role-${nameRaw}-${Math.random().toString(36).slice(2, 9)}`,
    name: titleCase(nameRaw),
    description: `Imported role: ${titleCase(nameRaw)} (${permissions.length} permission${
      permissions.length === 1 ? "" : "s"
    })`,
    permissions,
    userCount: 0,
    provider: "aws", // inferred from API context
  };
  return role;
}

function normalizeApiResponse(json: any): { roles: Role[] } {
  try {
    // Lambda proxy often nests a JSON string in `body`
    const inner = json?.body ? JSON.parse(json.body) : json;
    const rawRoles: string[] = inner?.roles || [];
    const roles: Role[] = rawRoles
      .map(parseRoleString)
      .filter(Boolean) as Role[];
    return { roles };
  } catch (e) {
    // If parsing fails, try to interpret json.roles directly
    const rawRoles: string[] = json?.roles || [];
    const roles: Role[] = rawRoles
      .map(parseRoleString)
      .filter(Boolean) as Role[];
    return { roles };
  }
}

// === Component ===
const RoleManagement: React.FC<RoleManagementProps> = () => {
  // UI state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<string>("all");

  // Data state
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Create/Edit state
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [editRole, setEditRole] = useState<Role | null>(null);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newRole, setNewRole] = useState<{
    name: string;
    description: string;
    permissions: string;
    provider: string;
  }>({
    name: "",
    description: "",
    permissions: "",
    provider: "all",
  });

  // Fetch roles from API
  const fetchRoles = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL, { method: "GET" });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const json = await res.json();
      const { roles } = normalizeApiResponse(json);
      setRoles(roles);
    } catch (e: any) {
      setError(e?.message || "Failed to load roles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  // Filters
  const filteredRoles = useMemo(() => {
    return roles.filter((role) => {
      const matchesSearch =
        role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesProvider =
        selectedProvider === "all" ||
        role.provider === selectedProvider ||
        role.provider === "all";
      return matchesSearch && matchesProvider;
    });
  }, [roles, searchTerm, selectedProvider]);

  // Handlers: Add / Edit / Delete (local only)
  const handleAddRole = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newId = `role-${Date.now()}`;
    const newRoleData: Role = {
      id: newId,
      name: newRole.name,
      description: newRole.description || `Custom role: ${newRole.name}`,
      permissions: newRole.permissions
        .split(",")
        .map((p) => p.trim())
        .filter((p) => p),
      userCount: 0,
      provider: newRole.provider,
    };
    setRoles((prev) => [...prev, newRoleData]);
    setNewRole({ name: "", description: "", permissions: "", provider: "all" });
    setShowAddForm(false);
  };

  const handleEditClick = (role: Role) => {
    setEditRole({ ...role });
    setShowEditForm(true);
  };

  const handleEditRole = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editRole) return;

    setRoles((prev) =>
      prev.map((role) =>
        role.id === editRole.id
          ? {
              ...editRole,
              permissions: (Array.isArray(editRole.permissions)
                ? editRole.permissions.join(",")
                : String(editRole.permissions)
              )
                .split(",")
                .map((p) => p.trim())
                .filter((p) => p),
            }
          : role
      )
    );
    setEditRole(null);
    setShowEditForm(false);
  };

  const handleDeleteRole = (roleId: string) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      setRoles((prev) => prev.filter((role) => role.id !== roleId));
    }
  };

  const handleCancel = () => {
    setEditRole(null);
    setShowEditForm(false);
    setNewRole({ name: "", description: "", permissions: "", provider: "all" });
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Add Role Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg p-6 relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2"
              onClick={handleCancel}
            >
              <X className="w-4 h-4" />
            </Button>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Role</h2>
            <form onSubmit={handleAddRole} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="add-name" className="text-gray-700">
                    Name
                  </Label>
                  <Input
                    id="add-name"
                    type="text"
                    value={newRole.name}
                    onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                    placeholder="Enter role name"
                    className="h-10 border-gray-300 focus:border-cloud-purple focus:ring-cloud-purple"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="add-description" className="text-gray-700">
                    Description
                  </Label>
                  <Input
                    id="add-description"
                    type="text"
                    value={newRole.description}
                    onChange={(e) =>
                      setNewRole({ ...newRole, description: e.target.value })
                    }
                    placeholder="Enter description"
                    className="h-10 border-gray-300 focus:border-cloud-purple focus:ring-cloud-purple"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="add-permissions" className="text-gray-700">
                    Permissions (comma-separated)
                  </Label>
                  <Input
                    id="add-permissions"
                    type="text"
                    value={newRole.permissions}
                    onChange={(e) =>
                      setNewRole({ ...newRole, permissions: e.target.value })
                    }
                    placeholder="s3,lambda,ec2"
                    className="h-10 border-gray-300 focus:border-cloud-purple focus:ring-cloud-purple"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="add-provider" className="text-gray-700">
                    Provider
                  </Label>
                  <select
                    id="add-provider"
                    value={newRole.provider}
                    onChange={(e) => setNewRole({ ...newRole, provider: e.target.value })}
                    className="w-full h-10 border border-gray-300 rounded-lg text-sm focus:border-cloud-purple focus:ring-cloud-purple"
                  >
                    <option value="all">All</option>
                    <option value="aws">AWS</option>
                    <option value="azure">Azure</option>
                    <option value="gcp">GCP</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" size="sm" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-cloud-purple text-white hover:bg-cloud-purple-600">
                  Add Role
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Edit Role Modal */}
      {showEditForm && editRole && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg p-6 relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2"
              onClick={handleCancel}
            >
              <X className="w-4 h-4" />
            </Button>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Edit Role</h2>
            <form onSubmit={handleEditRole} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name" className="text-gray-700">
                    Name
                  </Label>
                  <Input
                    id="edit-name"
                    type="text"
                    value={editRole.name}
                    onChange={(e) => setEditRole({ ...editRole, name: e.target.value })}
                    placeholder="Enter role name"
                    className="h-10 border-gray-300 focus:border-cloud-purple focus:ring-cloud-purple"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-description" className="text-gray-700">
                    Description
                  </Label>
                  <Input
                    id="edit-description"
                    type="text"
                    value={editRole.description}
                    onChange={(e) =>
                      setEditRole({ ...editRole, description: e.target.value })
                    }
                    placeholder="Enter description"
                    className="h-10 border-gray-300 focus:border-cloud-purple focus:ring-cloud-purple"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-permissions" className="text-gray-700">
                    Permissions (comma-separated)
                  </Label>
                  <Input
                    id="edit-permissions"
                    type="text"
                    value={Array.isArray(editRole.permissions) ? editRole.permissions.join(", ") : String(editRole.permissions)}
                    onChange={(e) =>
                      setEditRole({ ...editRole, permissions: e.target.value.split(",") })
                    }
                    placeholder="Enter permissions"
                    className="h-10 border-gray-300 focus:border-cloud-purple focus:ring-cloud-purple"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-provider" className="text-gray-700">
                    Provider
                  </Label>
                  <select
                    id="edit-provider"
                    value={editRole.provider}
                    onChange={(e) => setEditRole({ ...editRole, provider: e.target.value })}
                    className="w-full h-10 border border-gray-300 rounded-lg text-sm focus:border-cloud-purple focus:ring-cloud-purple"
                  >
                    <option value="all">All</option>
                    <option value="aws">AWS</option>
                    <option value="azure">Azure</option>
                    <option value="gcp">GCP</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" size="sm" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-cloud-purple text-white hover:bg-cloud-purple-600">
                  Save Changes
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Top bar: Search, Provider filter, Refresh, Create */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <select
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
              className="h-10 border border-gray-300 rounded-lg text-sm px-3"
            >
              <option value="all">All Providers</option>
              <option value="aws">AWS</option>
              <option value="azure">Azure</option>
              <option value="gcp">GCP</option>
            </select>

            <Button onClick={fetchRoles} variant="outline" className="shrink-0">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>

            <Button onClick={() => setShowAddForm(true)} className="shrink-0">
              <UserPlus className="w-4 h-4 mr-2" />
              Create Role
            </Button>
          </div>

          {loading && (
            <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
              <RefreshCw className="w-4 h-4 animate-spin" /> Loading roles...
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 mt-3 text-sm text-red-600">
              <AlertTriangle className="w-4 h-4" /> {error}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Roles grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRoles.map((role) => (
          <Card key={role.id} className="hover:shadow-medium transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{role.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{role.description}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEditClick(role)}>
                    <Edit3 className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteRole(role.id)}>
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-foreground">Permissions:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {role.permissions.map((permission) => (
                      <Badge key={`${role.id}-${permission}`} variant="secondary" className="text-xs">
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {role.userCount} users assigned
                  </span>
                  <Badge variant="outline">{String(role.provider).toUpperCase()}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {!loading && !error && filteredRoles.length === 0 && (
          <div className="col-span-full text-center text-sm text-muted-foreground py-10">
            No roles found. Try adjusting filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleManagement;
