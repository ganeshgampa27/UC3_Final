import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  Users, 
  Search, 
  Shield, 
  UserPlus,
  Edit3,
  Trash2,
  X
} from 'lucide-react';

interface RoleManagementProps {
  currentUser: any;
  selectedProvider: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  provider: string;
}

const RoleManagement: React.FC<RoleManagementProps> = ({ currentUser, selectedProvider }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roles, setRoles] = useState<Role[]>([
    {
      id: 'role-1',
      name: 'Data Engineer',
      description: 'Full access to all cloud resources',
      permissions: ['S3', 'RDS', 'Lambda', 'CloudWatch'],
      userCount: 3,
      provider: 'all'
    },
    {
      id: 'role-2',
      name: 'Developer',
      description: 'Development access to AWS resources',
      permissions: ['EC2', 'S3', 'Lambda'],
      userCount: 8,
      provider: 'aws'
    },
    {
      id: 'role-3',
      name: 'Data Analyst',
      description: 'Operational access to Azure services',
      permissions: ['Blob Storage', 'Virtual Machines', 'Azure SQL Database'],
      userCount: 5,
      provider: 'azure'
    },
    {
      id: 'role-4',
      name: 'IT Support',
      description: 'Read-only access to GCP resources',
      permissions: ['GCP', 'Compute Engine', 'Cloud Storage'],
      userCount: 12,
      provider: 'gcp'
    }
  ]);
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [editRole, setEditRole] = useState<Role | null>(null);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newRole, setNewRole] = useState<{
    name: string;
    description: string;
    permissions: string;
    provider: string;
  }>({
    name: '',
    description: '',
    permissions: '',
    provider: 'all'
  });

  const filteredRoles = roles.filter(role => {
    const matchesSearch = role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         role.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProvider = selectedProvider === 'all' || role.provider === selectedProvider || role.provider === 'all';
    return matchesSearch && matchesProvider;
  });

  const handleAddRole = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newId = `role-${Date.now()}`;
    const newRoleData: Role = {
      id: newId,
      name: newRole.name,
      description: newRole.description,
      permissions: newRole.permissions.split(',').map(p => p.trim()).filter(p => p),
      userCount: 0,
      provider: newRole.provider
    };
    setRoles([...roles, newRoleData]);
    setNewRole({
      name: '',
      description: '',
      permissions: '',
      provider: 'all'
    });
    setShowAddForm(false);
  };

  const handleEditClick = (role: Role) => {
    setEditRole({ ...role });
    setShowEditForm(true);
  };

  const handleEditRole = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editRole) return;

    setRoles(
      roles.map((role) =>
        role.id === editRole.id
          ? {
              ...editRole,
              permissions: editRole.permissions
                .join(',')
                .split(',')
                .map(p => p.trim())
                .filter(p => p)
            }
          : role
      )
    );
    setEditRole(null);
    setShowEditForm(false);
  };

  const handleDeleteRole = (roleId: string) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      setRoles(roles.filter(role => role.id !== roleId));
    }
  };

  const handleCancel = () => {
    setEditRole(null);
    setShowEditForm(false);
    setNewRole({
      name: '',
      description: '',
      permissions: '',
      provider: 'all'
    });
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
                    onChange={(e) =>
                      setNewRole({ ...newRole, name: e.target.value })
                    }
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
                    required
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
                    placeholder="Enter permissions"
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
                    onChange={(e) =>
                      setNewRole({ ...newRole, provider: e.target.value })
                    }
                    className="w-full h-10 border border-gray-300 rounded-lg text-sm focus:border-cloud-purple focus:ring-cloud-purple"
                  >
                    <option value="all">All</option>
                    <option value="aws">AWS</option>
                    <option value="azure">Azure</option>
                    <option value="gcp">GCP</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="bg-cloud-purple text-white hover:bg-cloud-purple-600"
                >
                  Add Role
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {showEditForm && editRole && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
                    onChange={(e) =>
                      setEditRole({ ...editRole, name: e.target.value })
                    }
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
                    value={editRole.permissions.join(', ')}
                    onChange={(e) =>
                      setEditRole({ ...editRole, permissions: e.target.value.split(',') })
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
                    onChange={(e) =>
                      setEditRole({ ...editRole, provider: e.target.value })
                    }
                    className="w-full h-10 border border-gray-300 rounded-lg text-sm focus:border-cloud-purple focus:ring-cloud-purple"
                  >
                    <option value="all">All</option>
                    <option value="aws">AWS</option>
                    <option value="azure">Azure</option>
                    <option value="gcp">GCP</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="bg-cloud-purple text-white hover:bg-cloud-purple-600"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Role Management</h1>
          <p className="text-muted-foreground">Manage user roles and permissions</p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <UserPlus className="w-4 h-4 mr-2" />
          Create Role
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditClick(role)}
                  >
                    <Edit3 className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteRole(role.id)}
                  >
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
                      <Badge key={permission} variant="secondary" className="text-xs">
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {role.userCount} users assigned
                  </span>
                  <Badge variant="outline">
                    {role.provider.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RoleManagement;