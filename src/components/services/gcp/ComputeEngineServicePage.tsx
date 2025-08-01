import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Alert, AlertDescription } from '../../ui/alert';
import { ArrowLeft, Plus, Server, Play, Square, RotateCcw, Settings } from 'lucide-react';
import { useToast } from '../../ui/use-toast';

const ComputeEngineServicePage: React.FC = () => {
  const [instances, setInstances] = useState([
    {
      id: 'instance-1',
      name: 'web-server-instance',
      machineType: 'e2-medium',
      status: 'RUNNING',
      zone: 'us-central1-a',
      image: 'Ubuntu 20.04 LTS',
      externalIP: '34.122.45.67',
      internalIP: '10.128.0.2'
    }
  ]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newInstance, setNewInstance] = useState({
    name: '',
    machineType: 'e2-micro',
    zone: 'us-central1-a',
    image: 'ubuntu-2004-lts',
    bootDiskSize: '10'
  });

  const { toast } = useToast();

  const handleCreateInstance = () => {
    if (!newInstance.name) {
      toast({
        title: "Validation Error",
        description: "Instance name is required.",
        variant: "destructive"
      });
      return;
    }

    const instance = {
      id: `instance-${Date.now()}`,
      name: newInstance.name,
      machineType: newInstance.machineType,
      status: 'PROVISIONING',
      zone: newInstance.zone,
      image: newInstance.image,
      externalIP: 'Ephemeral',
      internalIP: 'Pending'
    };

    setInstances([...instances, instance]);
    setNewInstance({ name: '', machineType: 'e2-micro', zone: 'us-central1-a', image: 'ubuntu-2004-lts', bootDiskSize: '10' });
    setIsCreateOpen(false);
    
    toast({
      title: "Success",
      description: `Compute Engine instance "${instance.name}" is being created.`
    });
  };

  const updateInstanceStatus = (id: string, newStatus: string) => {
    setInstances(instances => instances.map(instance => 
      instance.id === id ? { ...instance, status: newStatus } : instance
    ));
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
            <h1 className="text-2xl font-bold">Google Compute Engine</h1>
            <p className="text-muted-foreground">Virtual machines and containers in the cloud</p>
          </div>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Instance
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Compute Engine Instance</DialogTitle>
              <DialogDescription>
                Create a new virtual machine instance
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="instance-name">Name</Label>
                <Input
                  id="instance-name"
                  placeholder="my-instance"
                  value={newInstance.name}
                  onChange={(e) => setNewInstance({...newInstance, name: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="machine-type">Machine Type</Label>
                  <Select value={newInstance.machineType} onValueChange={(value) => setNewInstance({...newInstance, machineType: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="e2-micro">e2-micro (0.25-2 vCPUs, 1 GB RAM)</SelectItem>
                      <SelectItem value="e2-small">e2-small (0.5-2 vCPUs, 2 GB RAM)</SelectItem>
                      <SelectItem value="e2-medium">e2-medium (1-2 vCPUs, 4 GB RAM)</SelectItem>
                      <SelectItem value="e2-standard-2">e2-standard-2 (2 vCPUs, 8 GB RAM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="zone">Zone</Label>
                  <Select value={newInstance.zone} onValueChange={(value) => setNewInstance({...newInstance, zone: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us-central1-a">us-central1-a</SelectItem>
                      <SelectItem value="us-central1-b">us-central1-b</SelectItem>
                      <SelectItem value="us-west1-a">us-west1-a</SelectItem>
                      <SelectItem value="europe-west1-b">europe-west1-b</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Boot Disk Image</Label>
                <Select value={newInstance.image} onValueChange={(value) => setNewInstance({...newInstance, image: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ubuntu-2004-lts">Ubuntu 20.04 LTS</SelectItem>
                    <SelectItem value="debian-11">Debian 11</SelectItem>
                    <SelectItem value="centos-7">CentOS 7</SelectItem>
                    <SelectItem value="windows-server-2019">Windows Server 2019</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="boot-disk-size">Boot Disk Size (GB)</Label>
                <Input
                  id="boot-disk-size"
                  type="number"
                  min="10"
                  value={newInstance.bootDiskSize}
                  onChange={(e) => setNewInstance({...newInstance, bootDiskSize: e.target.value})}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateInstance}>
                Create Instance
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Alert>
        <Server className="h-4 w-4" />
        <AlertDescription>
          Compute Engine delivers configurable virtual machines running in Google's data centers with access to high-performance networking infrastructure.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4">
        {instances.map((instance) => (
          <Card key={instance.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Server className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle className="text-lg">{instance.name}</CardTitle>
                    <CardDescription>{instance.machineType} - {instance.zone}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={instance.status === 'RUNNING' ? 'default' : instance.status === 'PROVISIONING' ? 'secondary' : 'outline'}>
                    {instance.status}
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => updateInstanceStatus(instance.id, instance.status === 'RUNNING' ? 'TERMINATED' : 'RUNNING')}
                  >
                    {instance.status === 'RUNNING' ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => updateInstanceStatus(instance.id, 'RESTARTING')}
                  >
                    <RotateCcw className="h-4 w-4" />
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
                  <p className="text-sm font-medium">{instance.image}</p>
                  <p className="text-xs text-muted-foreground">Boot Disk Image</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium">{instance.externalIP}</p>
                  <p className="text-xs text-muted-foreground">External IP</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium">{instance.internalIP}</p>
                  <p className="text-xs text-muted-foreground">Internal IP</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium">{instance.zone}</p>
                  <p className="text-xs text-muted-foreground">Zone</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ComputeEngineServicePage;