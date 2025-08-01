import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Alert, AlertDescription } from '../../ui/alert';
import { ArrowLeft, Plus, Zap, Play, Pause, Settings, Code } from 'lucide-react';
import { useToast } from '../../ui/use-toast';

const FunctionsServicePage: React.FC = () => {
  const [functions, setFunctions] = useState([
    {
      id: 'func-1',
      name: 'data-processor',
      runtime: 'Node.js 18 LTS',
      status: 'Running',
      plan: 'Consumption',
      region: 'East US',
      lastExecuted: '2024-01-15 10:30:00'
    }
  ]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newFunction, setNewFunction] = useState({
    name: '',
    runtime: 'node-18',
    plan: 'Consumption',
    region: 'eastus'
  });

  const { toast } = useToast();

  const handleCreateFunction = () => {
    if (!newFunction.name) {
      toast({
        title: "Validation Error",
        description: "Function app name is required.",
        variant: "destructive"
      });
      return;
    }

    const func = {
      id: `func-${Date.now()}`,
      name: newFunction.name,
      runtime: newFunction.runtime,
      status: 'Creating',
      plan: newFunction.plan,
      region: newFunction.region,
      lastExecuted: 'Never'
    };

    setFunctions([...functions, func]);
    setNewFunction({ name: '', runtime: 'node-18', plan: 'Consumption', region: 'eastus' });
    setIsCreateOpen(false);
    
    toast({
      title: "Success",
      description: `Function app "${func.name}" is being created.`
    });
  };

  const toggleFunctionStatus = (id: string) => {
    setFunctions(functions.map(func => 
      func.id === id 
        ? { ...func, status: func.status === 'Running' ? 'Stopped' : 'Running' }
        : func
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
            <h1 className="text-2xl font-bold">Azure Functions</h1>
            <p className="text-muted-foreground">Event-driven serverless compute</p>
          </div>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Function App
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Function App</DialogTitle>
              <DialogDescription>
                Create a new Azure Functions app
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="func-name">Function App Name</Label>
                <Input
                  id="func-name"
                  placeholder="my-function-app"
                  value={newFunction.name}
                  onChange={(e) => setNewFunction({...newFunction, name: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="runtime">Runtime Stack</Label>
                  <Select value={newFunction.runtime} onValueChange={(value) => setNewFunction({...newFunction, runtime: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="node-18">Node.js 18 LTS</SelectItem>
                      <SelectItem value="python-3.9">Python 3.9</SelectItem>
                      <SelectItem value="dotnet-6">NET 6</SelectItem>
                      <SelectItem value="java-11">Java 11</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="plan">Hosting Plan</Label>
                  <Select value={newFunction.plan} onValueChange={(value) => setNewFunction({...newFunction, plan: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Consumption">Consumption (Serverless)</SelectItem>
                      <SelectItem value="Premium">Premium</SelectItem>
                      <SelectItem value="Dedicated">Dedicated (App Service Plan)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Select value={newFunction.region} onValueChange={(value) => setNewFunction({...newFunction, region: value})}>
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

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateFunction}>
                Create Function App
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Alert>
        <Zap className="h-4 w-4" />
        <AlertDescription>
          Azure Functions is an event-driven serverless compute platform that lets you run code without managing infrastructure.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4">
        {functions.map((func) => (
          <Card key={func.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Code className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle className="text-lg">{func.name}</CardTitle>
                    <CardDescription>Runtime: {func.runtime}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={func.status === 'Running' ? 'default' : 'secondary'}>
                    {func.status}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleFunctionStatus(func.id)}
                  >
                    {func.status === 'Running' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
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
                  <p className="text-sm font-medium">{func.plan}</p>
                  <p className="text-xs text-muted-foreground">Hosting Plan</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium">{func.region}</p>
                  <p className="text-xs text-muted-foreground">Region</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium">{func.lastExecuted}</p>
                  <p className="text-xs text-muted-foreground">Last Executed</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium">0</p>
                  <p className="text-xs text-muted-foreground">Functions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FunctionsServicePage;