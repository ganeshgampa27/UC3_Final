import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { ArrowLeft, Plus } from 'lucide-react';
import { useToast } from './ui/use-toast';

const AddServicePage: React.FC = () => {
  const [newService, setNewService] = useState({
    name: '',
    provider: 'aws',
    category: 'Compute',
    description: '',
    icon: '⚡'
  });

  const { toast } = useToast();

  const handleCreateService = () => {
    if (!newService.name || !newService.description) {
      toast({
        title: "Validation Error",
        description: "Service name and description are required.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: `Service "${newService.name}" added successfully.`
    });

    setNewService({ name: '', provider: 'aws', category: 'Compute', description: '', icon: '⚡' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Infrastructure
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Add New Service</h1>
          <p className="text-muted-foreground">Create a custom cloud service</p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Service Configuration</CardTitle>
          <CardDescription>Define your new cloud service</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="service-name">Service Name</Label>
              <Input
                id="service-name"
                placeholder="My Custom Service"
                value={newService.name}
                onChange={(e) => setNewService({...newService, name: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="provider">Cloud Provider</Label>
              <Select value={newService.provider} onValueChange={(value) => setNewService({...newService, provider: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aws">Amazon Web Services</SelectItem>
                  <SelectItem value="azure">Microsoft Azure</SelectItem>
                  <SelectItem value="gcp">Google Cloud Platform</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={newService.category} onValueChange={(value) => setNewService({...newService, category: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Compute">Compute</SelectItem>
                  <SelectItem value="Storage">Storage</SelectItem>
                  <SelectItem value="Database">Database</SelectItem>
                  <SelectItem value="Networking">Networking</SelectItem>
                  <SelectItem value="Security">Security</SelectItem>
                  <SelectItem value="Analytics">Analytics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="icon">Icon (Emoji)</Label>
              <Input
                id="icon"
                placeholder="⚡"
                value={newService.icon}
                onChange={(e) => setNewService({...newService, icon: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe what this service does..."
              value={newService.description}
              onChange={(e) => setNewService({...newService, description: e.target.value})}
            />
          </div>

          <Button onClick={handleCreateService} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddServicePage;