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

const VirtualMachinesServicePage: React.FC = () => {
  const [virtualMachines, setVirtualMachines] = useState([
    {
      id: 'vm-1',
      name: 'web-server-vm',
      size: 'Standard_B2s',
      status: 'Running',
      region: 'East US',
      os: 'Ubuntu 20.04 LTS',
      publicIp: '40.121.143.12',
      privateIp: '10.0.0.4'
    }
  ]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newVM, setNewVM] = useState({
    name: '',
    size: 'Standard_B1s',
    os: 'ubuntu-20-04',
    region: 'eastus',
    adminUsername: 'azureuser'
  });

  const { toast } = useToast();

  const handleCreateVM = () => {
    if (!newVM.name) {
      toast({
        title: "Validation Error",
        description: "VM name is required.",
        variant: "destructive"
      });
      return;
    }

    const vm = {
      id: `vm-${Date.now()}`,
      name: newVM.name,
      size: newVM.size,
      status: 'Creating',
      region: newVM.region,
      os: newVM.os,
      publicIp: 'Pending',
      privateIp: 'Pending'
    };

    setVirtualMachines([...virtualMachines, vm]);
    setNewVM({ name: '', size: 'Standard_B1s', os: 'ubuntu-20-04', region: 'eastus', adminUsername: 'azureuser' });
    setIsCreateOpen(false);
    
    toast({
      title: "Success",
      description: `Virtual machine "${vm.name}" is being created.`
    });
  };

  const updateVMStatus = (id: string, newStatus: string) => {
    setVirtualMachines(vms => vms.map(vm => 
      vm.id === id ? { ...vm, status: newStatus } : vm
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
            <h1 className="text-2xl font-bold">Azure Virtual Machines</h1>
            <p className="text-muted-foreground">Scalable virtual machines in the cloud</p>
          </div>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create VM
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Virtual Machine</DialogTitle>
              <DialogDescription>
                Deploy a new virtual machine in Azure
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="vm-name">Virtual Machine Name</Label>
                <Input
                  id="vm-name"
                  placeholder="my-vm"
                  value={newVM.name}
                  onChange={(e) => setNewVM({...newVM, name: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vm-size">Size</Label>
                  <Select value={newVM.size} onValueChange={(value) => setNewVM({...newVM, size: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Standard_B1s">Standard_B1s (1 vCPU, 1 GB RAM)</SelectItem>
                      <SelectItem value="Standard_B2s">Standard_B2s (2 vCPUs, 4 GB RAM)</SelectItem>
                      <SelectItem value="Standard_D2s_v3">Standard_D2s_v3 (2 vCPUs, 8 GB RAM)</SelectItem>
                      <SelectItem value="Standard_D4s_v3">Standard_D4s_v3 (4 vCPUs, 16 GB RAM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="region">Region</Label>
                  <Select value={newVM.region} onValueChange={(value) => setNewVM({...newVM, region: value})}>
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="os">Operating System</Label>
                <Select value={newVM.os} onValueChange={(value) => setNewVM({...newVM, os: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ubuntu-20-04">Ubuntu 20.04 LTS</SelectItem>
                    <SelectItem value="windows-server-2019">Windows Server 2019</SelectItem>
                    <SelectItem value="centos-7">CentOS 7</SelectItem>
                    <SelectItem value="debian-10">Debian 10</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-username">Administrator Username</Label>
                <Input
                  id="admin-username"
                  value={newVM.adminUsername}
                  onChange={(e) => setNewVM({...newVM, adminUsername: e.target.value})}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateVM}>
                Create VM
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Alert>
        <Server className="h-4 w-4" />
        <AlertDescription>
          Azure Virtual Machines provide on-demand, scalable computing resources with choice of operating systems.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4">
        {virtualMachines.map((vm) => (
          <Card key={vm.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Server className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle className="text-lg">{vm.name}</CardTitle>
                    <CardDescription>{vm.size} - {vm.region}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={vm.status === 'Running' ? 'default' : vm.status === 'Creating' ? 'secondary' : 'outline'}>
                    {vm.status}
                  </Badge>
                  <Button variant="outline" size="sm" onClick={() => updateVMStatus(vm.id, vm.status === 'Running' ? 'Stopped' : 'Running')}>
                    {vm.status === 'Running' ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => updateVMStatus(vm.id, 'Restarting')}>
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
                  <p className="text-sm font-medium">{vm.os}</p>
                  <p className="text-xs text-muted-foreground">Operating System</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium">{vm.publicIp}</p>
                  <p className="text-xs text-muted-foreground">Public IP</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium">{vm.privateIp}</p>
                  <p className="text-xs text-muted-foreground">Private IP</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium">{vm.region}</p>
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

export default VirtualMachinesServicePage;