import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Alert, AlertDescription } from '../../ui/alert';
import { ArrowLeft, Plus, Database, Upload, Download, Settings } from 'lucide-react';
import { useToast } from '../../ui/use-toast';

const BlobStorageServicePage: React.FC = () => {
  const [storageAccounts, setStorageAccounts] = useState([
    {
      id: 'storage-1',
      name: 'mycompanystorage',
      region: 'East US',
      performance: 'Standard',
      replication: 'LRS',
      containers: 3,
      totalSize: '2.1 GB'
    }
  ]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newStorage, setNewStorage] = useState({
    name: '',
    region: 'eastus',
    performance: 'Standard',
    replication: 'LRS'
  });

  const { toast } = useToast();

  const handleCreateStorage = () => {
    if (!newStorage.name) {
      toast({
        title: "Validation Error",
        description: "Storage account name is required.",
        variant: "destructive"
      });
      return;
    }

    const storage = {
      id: `storage-${Date.now()}`,
      name: newStorage.name,
      region: newStorage.region,
      performance: newStorage.performance,
      replication: newStorage.replication,
      containers: 0,
      totalSize: '0 GB'
    };

    setStorageAccounts([...storageAccounts, storage]);
    setNewStorage({ name: '', region: 'eastus', performance: 'Standard', replication: 'LRS' });
    setIsCreateOpen(false);
    
    toast({
      title: "Success",
      description: `Storage account "${storage.name}" created successfully.`
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
            <h1 className="text-2xl font-bold">Azure Blob Storage</h1>
            <p className="text-muted-foreground">Object storage for the cloud</p>
          </div>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Storage Account
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Storage Account</DialogTitle>
              <DialogDescription>
                Create a new Azure Blob Storage account
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="storage-name">Storage Account Name</Label>
                <Input
                  id="storage-name"
                  placeholder="mystorageaccount"
                  value={newStorage.name}
                  onChange={(e) => setNewStorage({...newStorage, name: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="region">Region</Label>
                  <Select value={newStorage.region} onValueChange={(value) => setNewStorage({...newStorage, region: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eastus">East US</SelectItem>
                      <SelectItem value="westus">West US</SelectItem>
                      <SelectItem value="centralus">Central US</SelectItem>
                      <SelectItem value="northeurope">North Europe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="performance">Performance</Label>
                  <Select value={newStorage.performance} onValueChange={(value) => setNewStorage({...newStorage, performance: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Standard">Standard</SelectItem>
                      <SelectItem value="Premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="replication">Replication</Label>
                <Select value={newStorage.replication} onValueChange={(value) => setNewStorage({...newStorage, replication: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LRS">Locally-redundant storage (LRS)</SelectItem>
                    <SelectItem value="GRS">Geo-redundant storage (GRS)</SelectItem>
                    <SelectItem value="ZRS">Zone-redundant storage (ZRS)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateStorage}>
                Create Storage Account
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Alert>
        <Database className="h-4 w-4" />
        <AlertDescription>
          Azure Blob Storage is Microsoft's object storage solution for the cloud, optimized for storing massive amounts of unstructured data.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4">
        {storageAccounts.map((storage) => (
          <Card key={storage.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Database className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle className="text-lg">{storage.name}</CardTitle>
                    <CardDescription>{storage.performance} performance - {storage.replication}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="default">Active</Badge>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
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
                  <p className="text-sm font-medium">{storage.region}</p>
                  <p className="text-xs text-muted-foreground">Region</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium">{storage.containers}</p>
                  <p className="text-xs text-muted-foreground">Containers</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium">{storage.totalSize}</p>
                  <p className="text-xs text-muted-foreground">Total Size</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium">{storage.replication}</p>
                  <p className="text-xs text-muted-foreground">Replication</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlobStorageServicePage;