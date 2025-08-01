import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription } from '../ui/alert';
import { ArrowLeft, Plus, Play, Pause, Settings, Code, Activity, Clock, MemoryStick } from 'lucide-react';
import { useToast } from '../ui/use-toast';

const LambdaServicePage: React.FC = () => {
  const [functions, setFunctions] = useState([
    {
      id: 'func-1',
      name: 'user-authentication',
      runtime: 'nodejs18.x',
      status: 'Active',
      memory: '256 MB',
      timeout: '30s',
      lastModified: '2024-01-15',
      invocations: '1,234',
      environment: 'production'
    },
    {
      id: 'func-2', 
      name: 'image-processor',
      runtime: 'python3.9',
      status: 'Active',
      memory: '512 MB',
      timeout: '5m',
      lastModified: '2024-01-14',
      invocations: '856',
      environment: 'staging'
    }
  ]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newFunction, setNewFunction] = useState({
    name: '',
    runtime: '',
    memory: '256',
    timeout: '30',
    description: '',
    code: ''
  });

  const { toast } = useToast();

  const handleCreateFunction = () => {
    if (!newFunction.name || !newFunction.runtime) {
      toast({
        title: "Validation Error",
        description: "Function name and runtime are required.",
        variant: "destructive"
      });
      return;
    }

    const func = {
      id: `func-${Date.now()}`,
      name: newFunction.name,
      runtime: newFunction.runtime,
      status: 'Active',
      memory: `${newFunction.memory} MB`,
      timeout: `${newFunction.timeout}s`,
      lastModified: new Date().toISOString().split('T')[0],
      invocations: '0',
      environment: 'development'
    };

    setFunctions([...functions, func]);
    setNewFunction({ name: '', runtime: '', memory: '256', timeout: '30', description: '', code: '' });
    setIsCreateOpen(false);
    
    toast({
      title: "Success",
      description: `Lambda function "${func.name}" created successfully.`
    });
  };

  const toggleFunctionStatus = (id: string) => {
    setFunctions(functions.map(func => 
      func.id === id 
        ? { ...func, status: func.status === 'Active' ? 'Inactive' : 'Active' }
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
            <h1 className="text-2xl font-bold">AWS Lambda</h1>
            <p className="text-muted-foreground">Serverless compute service</p>
          </div>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Function
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Lambda Function</DialogTitle>
              <DialogDescription>
                Deploy your code as a serverless function
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="basic">Basic Configuration</TabsTrigger>
                <TabsTrigger value="code">Function Code</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="function-name">Function Name</Label>
                    <Input
                      id="function-name"
                      placeholder="my-function"
                      value={newFunction.name}
                      onChange={(e) => setNewFunction({...newFunction, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="runtime">Runtime</Label>
                    <Select value={newFunction.runtime} onValueChange={(value) => setNewFunction({...newFunction, runtime: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select runtime" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nodejs18.x">Node.js 18.x</SelectItem>
                        <SelectItem value="python3.9">Python 3.9</SelectItem>
                        <SelectItem value="java11">Java 11</SelectItem>
                        <SelectItem value="dotnet6">NET 6</SelectItem>
                        <SelectItem value="go1.x">Go 1.x</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="memory">Memory (MB)</Label>
                    <Select value={newFunction.memory} onValueChange={(value) => setNewFunction({...newFunction, memory: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="128">128 MB</SelectItem>
                        <SelectItem value="256">256 MB</SelectItem>
                        <SelectItem value="512">512 MB</SelectItem>
                        <SelectItem value="1024">1024 MB</SelectItem>
                        <SelectItem value="2048">2048 MB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timeout">Timeout (seconds)</Label>
                    <Input
                      id="timeout"
                      type="number"
                      value={newFunction.timeout}
                      onChange={(e) => setNewFunction({...newFunction, timeout: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Function description..."
                    value={newFunction.description}
                    onChange={(e) => setNewFunction({...newFunction, description: e.target.value})}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="code" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="function-code">Function Code</Label>
                  <Textarea
                    id="function-code"
                    placeholder="exports.handler = async (event) => {&#10;    return {&#10;        statusCode: 200,&#10;        body: JSON.stringify('Hello from Lambda!')&#10;    };&#10;};"
                    className="min-h-[200px] font-mono text-sm"
                    value={newFunction.code}
                    onChange={(e) => setNewFunction({...newFunction, code: e.target.value})}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateFunction}>
                Create Function
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Alert>
        <Activity className="h-4 w-4" />
        <AlertDescription>
          AWS Lambda lets you run code without provisioning or managing servers. You pay only for compute time consumed.
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
                  <Badge variant={func.status === 'Active' ? 'default' : 'secondary'}>
                    {func.status}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleFunctionStatus(func.id)}
                  >
                    {func.status === 'Active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <MemoryStick className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{func.memory}</p>
                    <p className="text-xs text-muted-foreground">Memory</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{func.timeout}</p>
                    <p className="text-xs text-muted-foreground">Timeout</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{func.invocations}</p>
                    <p className="text-xs text-muted-foreground">Invocations</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium">{func.lastModified}</p>
                  <p className="text-xs text-muted-foreground">Last Modified</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LambdaServicePage;