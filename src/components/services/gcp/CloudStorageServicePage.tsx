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

const CloudStorageServicePage: React.FC = () => {
  const [buckets, setBuckets] = useState([
    {
      id: 'bucket-1',
      name: 'my-company-data-bucket',
      location: 'US-CENTRAL1',
      storageClass: 'STANDARD',
      objects: 1247,
      size: '15.2 GB'
    }
  ]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newBucket, setNewBucket] = useState({
    name: '',
    location: 'US-CENTRAL1',
    storageClass: 'STANDARD',
    accessControl: 'uniform'
  });

  const { toast } = useToast();

  const handleCreateBucket = () => {
    if (!newBucket.name) {
      toast({
        title: "Validation Error",
        description: "Bucket name is required.",
        variant: "destructive"
      });
      return;
    }

    const bucket = {
      id: `bucket-${Date.now()}`,
      name: newBucket.name,
      location: newBucket.location,
      storageClass: newBucket.storageClass,
      objects: 0,
      size: '0 B'
    };

    setBuckets([...buckets, bucket]);
    setNewBucket({ name: '', location: 'US-CENTRAL1', storageClass: 'STANDARD', accessControl: 'uniform' });
    setIsCreateOpen(false);
    
    toast({
      title: "Success",
      description: `Cloud Storage bucket "${bucket.name}" created successfully.`
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
            <h1 className="text-2xl font-bold">Google Cloud Storage</h1>
            <p className="text-muted-foreground">Object storage service</p>
          </div>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Bucket
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Storage Bucket</DialogTitle>
              <DialogDescription>
                Create a new Cloud Storage bucket
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bucket-name">Bucket Name</Label>
                <Input
                  id="bucket-name"
                  placeholder="my-unique-bucket-name"
                  value={newBucket.name}
                  onChange={(e) => setNewBucket({...newBucket, name: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select value={newBucket.location} onValueChange={(value) => setNewBucket({...newBucket, location: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US-CENTRAL1">us-central1 (Iowa)</SelectItem>
                      <SelectItem value="US-WEST1">us-west1 (Oregon)</SelectItem>
                      <SelectItem value="EUROPE-WEST1">europe-west1 (Belgium)</SelectItem>
                      <SelectItem value="ASIA-EAST1">asia-east1 (Taiwan)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="storage-class">Default Storage Class</Label>
                  <Select value={newBucket.storageClass} onValueChange={(value) => setNewBucket({...newBucket, storageClass: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="STANDARD">Standard</SelectItem>
                      <SelectItem value="NEARLINE">Nearline</SelectItem>
                      <SelectItem value="COLDLINE">Coldline</SelectItem>
                      <SelectItem value="ARCHIVE">Archive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="access-control">Access Control</Label>
                <Select value={newBucket.accessControl} onValueChange={(value) => setNewBucket({...newBucket, accessControl: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="uniform">Uniform</SelectItem>
                    <SelectItem value="fine-grained">Fine-grained</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateBucket}>
                Create Bucket
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Alert>
        <Database className="h-4 w-4" />
        <AlertDescription>
          Cloud Storage is a unified object storage for developers and enterprises, from live data serving to data analytics/ML to data archival.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4">
        {buckets.map((bucket) => (
          <Card key={bucket.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Database className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle className="text-lg">{bucket.name}</CardTitle>
                    <CardDescription>{bucket.storageClass} - {bucket.location}</CardDescription>
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
                  <p className="text-sm font-medium">{bucket.objects.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Objects</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium">{bucket.size}</p>
                  <p className="text-xs text-muted-foreground">Size</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium">{bucket.storageClass}</p>
                  <p className="text-xs text-muted-foreground">Storage Class</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium">{bucket.location}</p>
                  <p className="text-xs text-muted-foreground">Location</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CloudStorageServicePage;