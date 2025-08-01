import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription } from '../ui/alert';
import { ArrowLeft, Plus, Shield, User, Users, Key, Settings } from 'lucide-react';
import { useToast } from '../ui/use-toast';

const IAMServicePage: React.FC = () => {
  const [users, setUsers] = useState([
    {
      id: 'user-1',
      username: 'john.doe',
      email: 'john.doe@company.com',
      status: 'Active',
      lastActivity: '2024-01-15',
      groups: ['Developers', 'S3-Read-Only'],
      mfaEnabled: true
    }
  ]);

  const [roles, setRoles] = useState([
    {
      id: 'role-1',
      name: 'EC2-S3-Access',
      description: 'Allows EC2 instances to access S3 buckets',
      trustedEntity: 'ec2.amazonaws.com',
      policies: ['AmazonS3ReadOnlyAccess'],
      lastUsed: '2024-01-14'
    }
  ]);

  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);
  const [newUser, setNewUser] = useState({ username: '', email: '', groups: '' });
  const [newRole, setNewRole] = useState({ name: '', description: '', trustedEntity: '' });

  const { toast } = useToast();

  const handleCreateUser = () => {
    if (!newUser.username || !newUser.email) {
      toast({
        title: "Validation Error",
        description: "Username and email are required.",
        variant: "destructive"
      });
      return;
    }

    const user = {
      id: `user-${Date.now()}`,
      username: newUser.username,
      email: newUser.email,
      status: 'Active',
      lastActivity: new Date().toISOString().split('T')[0],
      groups: newUser.groups ? newUser.groups.split(',').map(s => s.trim()) : [],
      mfaEnabled: false
    };

    setUsers([...users, user]);
    setNewUser({ username: '', email: '', groups: '' });
    setIsCreateUserOpen(false);
    
    toast({
      title: "Success",
      description: `IAM user "${user.username}" created successfully.`
    });
  };

  const handleCreateRole = () => {
    if (!newRole.name || !newRole.trustedEntity) {
      toast({
        title: "Validation Error",
        description: "Role name and trusted entity are required.",
        variant: "destructive"
      });
      return;
    }

    const role = {
      id: `role-${Date.now()}`,
      name: newRole.name,
      description: newRole.description,
      trustedEntity: newRole.trustedEntity,
      policies: [],
      lastUsed: 'Never'
    };

    setRoles([...roles, role]);
    setNewRole({ name: '', description: '', trustedEntity: '' });
    setIsCreateRoleOpen(false);
    
    toast({
      title: "Success",
      description: `IAM role "${role.name}" created successfully.`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Infrastructure
          </Button>
          <div>
            <h1 className="text-2xl font-bold">AWS IAM</h1>
            <p className="text-muted-foreground">Identity and Access Management</p>
          </div>
        </div>
      </div>

      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          AWS IAM enables you to manage access to AWS services and resources securely.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="space-y-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold">IAM Users</h3>
            <Dialog open={isCreateUserOpen} onOpenChange={setIsCreateUserOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create IAM User</DialogTitle>
                  <DialogDescription>
                    Create a new user with programmatic and/or console access
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      placeholder="john.doe"
                      value={newUser.username}
                      onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@company.com"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="groups">Groups (comma-separated)</Label>
                    <Input
                      id="groups"
                      placeholder="Developers, S3-Read-Only"
                      value={newUser.groups}
                      onChange={(e) => setNewUser({...newUser, groups: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsCreateUserOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateUser}>
                    Create User
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {users.map((user) => (
              <Card key={user.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-primary" />
                      <div>
                        <CardTitle className="text-lg">{user.username}</CardTitle>
                        <CardDescription>{user.email}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                        {user.status}
                      </Badge>
                      {user.mfaEnabled && (
                        <Badge variant="outline">
                          <Key className="h-3 w-3 mr-1" />
                          MFA
                        </Badge>
                      )}
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium">{user.lastActivity}</p>
                      <p className="text-xs text-muted-foreground">Last Activity</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium">{user.groups.length} groups</p>
                      <p className="text-xs text-muted-foreground">{user.groups.join(', ')}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium">{user.mfaEnabled ? 'Enabled' : 'Disabled'}</p>
                      <p className="text-xs text-muted-foreground">MFA Status</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="roles" className="space-y-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold">IAM Roles</h3>
            <Dialog open={isCreateRoleOpen} onOpenChange={setIsCreateRoleOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Role
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create IAM Role</DialogTitle>
                  <DialogDescription>
                    Create a role to delegate permissions to AWS services
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="role-name">Role Name</Label>
                    <Input
                      id="role-name"
                      placeholder="EC2-S3-Access"
                      value={newRole.name}
                      onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="trusted-entity">Trusted Entity</Label>
                    <Input
                      id="trusted-entity"
                      placeholder="ec2.amazonaws.com"
                      value={newRole.trustedEntity}
                      onChange={(e) => setNewRole({...newRole, trustedEntity: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="role-description">Description</Label>
                    <Input
                      id="role-description"
                      placeholder="Allows EC2 instances to access S3 buckets"
                      value={newRole.description}
                      onChange={(e) => setNewRole({...newRole, description: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsCreateRoleOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateRole}>
                    Create Role
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {roles.map((role) => (
              <Card key={role.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-primary" />
                      <div>
                        <CardTitle className="text-lg">{role.name}</CardTitle>
                        <CardDescription>{role.description}</CardDescription>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium">{role.trustedEntity}</p>
                      <p className="text-xs text-muted-foreground">Trusted Entity</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium">{role.policies.length} policies</p>
                      <p className="text-xs text-muted-foreground">Attached Policies</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium">{role.lastUsed}</p>
                      <p className="text-xs text-muted-foreground">Last Used</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IAMServicePage;