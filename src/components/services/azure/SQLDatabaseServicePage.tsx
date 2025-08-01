import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Alert, AlertDescription } from '../../ui/alert';
import { ArrowLeft, Plus, Database, Activity, Shield, Settings } from 'lucide-react';
import { useToast } from '../../ui/use-toast';

const SQLDatabaseServicePage: React.FC = () => {
  const [databases, setDatabases] = useState([
    {
      id: 'db-1',
      name: 'production-db',
      server: 'mycompany-sql-server',
      tier: 'Standard',
      compute: 'S2',
      storage: '250 GB',
      status: 'Online',
      region: 'East US'
    }
  ]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newDatabase, setNewDatabase] = useState({
    name: '',
    serverName: '',
    tier: 'Basic',
    compute: 'Basic',
    adminUsername: 'sqladmin'
  });

  const { toast } = useToast();

  const handleCreateDatabase = () => {
    if (!newDatabase.name || !newDatabase.serverName) {
      toast({
        title: "Validation Error",
        description: "Database name and server name are required.",
        variant: "destructive"
      });
      return;
    }

    const db = {
      id: `db-${Date.now()}`,
      name: newDatabase.name,
      server: newDatabase.serverName,
      tier: newDatabase.tier,
      compute: newDatabase.compute,
      storage: '32 GB',
      status: 'Creating',
      region: 'East US'
    };

    setDatabases([...databases, db]);
    setNewDatabase({ name: '', serverName: '', tier: 'Basic', compute: 'Basic', adminUsername: 'sqladmin' });
    setIsCreateOpen(false);
    
    toast({
      title: "Success",
      description: `SQL Database "${db.name}" is being created.`
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
            <h1 className="text-2xl font-bold">Azure SQL Database</h1>
            <p className="text-muted-foreground">Managed SQL database service</p>
          </div>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Database
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create SQL Database</DialogTitle>
              <DialogDescription>
                Create a new Azure SQL Database
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="db-name">Database Name</Label>
                <Input
                  id="db-name"
                  placeholder="my-database"
                  value={newDatabase.name}
                  onChange={(e) => setNewDatabase({...newDatabase, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="server-name">Server Name</Label>
                <Input
                  id="server-name"
                  placeholder="my-sql-server"
                  value={newDatabase.serverName}
                  onChange={(e) => setNewDatabase({...newDatabase, serverName: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tier">Service Tier</Label>
                  <Select value={newDatabase.tier} onValueChange={(value) => setNewDatabase({...newDatabase, tier: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Basic">Basic</SelectItem>
                      <SelectItem value="Standard">Standard</SelectItem>
                      <SelectItem value="Premium">Premium</SelectItem>
                      <SelectItem value="GeneralPurpose">General Purpose</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="compute">Compute Size</Label>
                  <Select value={newDatabase.compute} onValueChange={(value) => setNewDatabase({...newDatabase, compute: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Basic">Basic (5 DTUs)</SelectItem>
                      <SelectItem value="S0">S0 (10 DTUs)</SelectItem>
                      <SelectItem value="S1">S1 (20 DTUs)</SelectItem>
                      <SelectItem value="S2">S2 (50 DTUs)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-username">Admin Username</Label>
                <Input
                  id="admin-username"
                  value={newDatabase.adminUsername}
                  onChange={(e) => setNewDatabase({...newDatabase, adminUsername: e.target.value})}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateDatabase}>
                Create Database
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Alert>
        <Database className="h-4 w-4" />
        <AlertDescription>
          Azure SQL Database is a fully managed platform as a service (PaaS) database engine that handles most database management functions.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4">
        {databases.map((db) => (
          <Card key={db.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Database className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle className="text-lg">{db.name}</CardTitle>
                    <CardDescription>Server: {db.server}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={db.status === 'Online' ? 'default' : 'secondary'}>
                    {db.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Activity className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Shield className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm font-medium">{db.tier}</p>
                  <p className="text-xs text-muted-foreground">Service Tier</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium">{db.compute}</p>
                  <p className="text-xs text-muted-foreground">Compute Size</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium">{db.storage}</p>
                  <p className="text-xs text-muted-foreground">Storage</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium">{db.region}</p>
                  <p className="text-xs text-muted-foreground">Region</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SQLDatabaseServicePage;