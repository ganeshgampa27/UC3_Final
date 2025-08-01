import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Alert, AlertDescription } from '../ui/alert';
import { ArrowLeft, Plus, Globe, BarChart3, Settings, Zap } from 'lucide-react';
import { useToast } from '../ui/use-toast';

const CloudFrontServicePage: React.FC = () => {
  const [distributions, setDistributions] = useState([
    {
      id: 'dist-1',
      domainName: 'd1a2b3c4d5e6f7.cloudfront.net',
      alternateNames: ['example.com', 'www.example.com'],
      status: 'Deployed',
      priceClass: 'Use All Edge Locations',
      lastModified: '2024-01-15'
    }
  ]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newDistribution, setNewDistribution] = useState({
    originDomain: '',
    alternateNames: '',
    priceClass: 'PriceClass_All'
  });

  const { toast } = useToast();

  const handleCreateDistribution = () => {
    if (!newDistribution.originDomain) {
      toast({
        title: "Validation Error",
        description: "Origin domain is required.",
        variant: "destructive"
      });
      return;
    }

    const dist = {
      id: `dist-${Date.now()}`,
      domainName: `d${Math.random().toString(36).substr(2, 14)}.cloudfront.net`,
      alternateNames: newDistribution.alternateNames ? newDistribution.alternateNames.split(',').map(s => s.trim()) : [],
      status: 'In Progress',
      priceClass: newDistribution.priceClass,
      lastModified: new Date().toISOString().split('T')[0]
    };

    setDistributions([...distributions, dist]);
    setNewDistribution({ originDomain: '', alternateNames: '', priceClass: 'PriceClass_All' });
    setIsCreateOpen(false);
    
    toast({
      title: "Success",
      description: "CloudFront distribution created successfully."
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
            <h1 className="text-2xl font-bold">AWS CloudFront</h1>
            <p className="text-muted-foreground">Content delivery network</p>
          </div>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Distribution
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create CloudFront Distribution</DialogTitle>
              <DialogDescription>
                Deliver content with low latency and high transfer speeds
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="origin-domain">Origin Domain Name</Label>
                <Input
                  id="origin-domain"
                  placeholder="example.s3.amazonaws.com"
                  value={newDistribution.originDomain}
                  onChange={(e) => setNewDistribution({...newDistribution, originDomain: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="alternate-names">Alternate Domain Names (CNAMEs)</Label>
                <Input
                  id="alternate-names"
                  placeholder="example.com, www.example.com"
                  value={newDistribution.alternateNames}
                  onChange={(e) => setNewDistribution({...newDistribution, alternateNames: e.target.value})}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateDistribution}>
                Create Distribution
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Alert>
        <Globe className="h-4 w-4" />
        <AlertDescription>
          CloudFront is a fast content delivery network (CDN) service that securely delivers data with low latency and high transfer speeds.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4">
        {distributions.map((dist) => (
          <Card key={dist.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Zap className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle className="text-lg">{dist.domainName}</CardTitle>
                    <CardDescription>
                      {dist.alternateNames.length > 0 ? `CNAMEs: ${dist.alternateNames.join(', ')}` : 'No alternate names'}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={dist.status === 'Deployed' ? 'default' : 'secondary'}>
                    {dist.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{dist.priceClass}</p>
                    <p className="text-xs text-muted-foreground">Price Class</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium">{dist.lastModified}</p>
                  <p className="text-xs text-muted-foreground">Last Modified</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium">Active</p>
                  <p className="text-xs text-muted-foreground">State</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CloudFrontServicePage;