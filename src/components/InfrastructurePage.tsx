import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  Cloud, 
  Server, 
  Database, 
  Shield, 
  Network, 
  Search,
  Plus,
  ChevronRight,
  Settings
} from 'lucide-react';
import { servicesByProvider, cloudProviders } from '../mock/data';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface InfrastructurePageProps {
  selectedProvider: string;
  onCloudChange: (provider: string) => void;
}

const InfrastructurePage: React.FC<InfrastructurePageProps> = ({
  selectedProvider,
  onCloudChange
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedService, setSelectedService] = useState<any>(null);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'compute':
        return Server;
      case 'storage':
        return Database;
      case 'database':
        return Database;
      case 'networking':
        return Network;
      case 'security':
        return Shield;
      default:
        return Cloud;
    }
  };

  const getProviderColor = (providerId: string) => {
    switch (providerId) {
      case 'aws':
        return 'bg-orange-500';
      case 'azure':
        return 'bg-blue-500';
      case 'gcp':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getProviderName = (providerId: string) => {
    if (providerId === 'all') return 'All Providers';
    const provider = cloudProviders.find(p => p.id === providerId);
    return provider?.name || 'Unknown Provider';
  };

  const getServicesForProvider = () => {
    if (selectedProvider === 'all') {
      // Combine all services when "all" is selected
      const allServices = Object.entries(servicesByProvider).flatMap(([providerId, services]) =>
        services.map(service => ({ ...service, providerId }))
      );
      return allServices;
    }
    return servicesByProvider[selectedProvider as keyof typeof servicesByProvider]?.map(service => 
      ({ ...service, providerId: selectedProvider })
    ) || [];
  };

  const filteredServices = getServicesForProvider()
    .filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           service.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || service.category.toLowerCase() === selectedCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });

  const categories = ['all', 'compute', 'storage', 'database', 'networking', 'security'];

  const handleServiceRequest = (service: any) => {
    setSelectedService(service);
    console.log('Requesting service:', service);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Infrastructure Services</h1>
          <p className="text-muted-foreground">
            Browse and request cloud services from {getProviderName(selectedProvider)}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Provider Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-10">
                <Cloud className="w-4 h-4 mr-2" />
                {getProviderName(selectedProvider)}
                <ChevronRight className="w-4 h-4 ml-2 rotate-90" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem
                onClick={() => onCloudChange('all')}
                className={selectedProvider === 'all' ? 'bg-accent' : ''}
              >
                <span className="mr-2">🌐</span>
                All Providers
              </DropdownMenuItem>
              {cloudProviders.map((provider) => (
                <DropdownMenuItem
                  key={provider.id}
                  onClick={() => onCloudChange(provider.id)}
                  className={selectedProvider === provider.id ? 'bg-accent' : ''}
                >
                  <div className={`w-3 h-3 rounded-full mr-2 ${getProviderColor(provider.id)}`} />
                  {provider.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category === 'all' ? 'All Categories' : category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => {
          const CategoryIcon = getCategoryIcon(service.category);
          
          return (
            <Card 
              key={`${service.providerId}-${service.id}`}
              className="hover:shadow-medium transition-shadow duration-200 cursor-pointer group"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{service.icon}</div>
                    <div className="flex-1">
                      <CardTitle className="text-lg leading-tight">{service.name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {service.category}
                        </Badge>
                        {selectedProvider === 'all' && (
                          <div className="flex items-center space-x-1">
                            <div className={`w-2 h-2 rounded-full ${getProviderColor(service.providerId)}`} />
                            <span className="text-xs text-muted-foreground uppercase">
                              {service.providerId}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <CategoryIcon className="w-5 h-5 text-muted-foreground" />
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {service.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      service.status === 'available' 
                        ? 'border-green-500 text-green-700' 
                        : 'border-orange-500 text-orange-700'
                    }`}
                  >
                    {service.status === 'available' ? '✓ Available' : '⚠ Limited'}
                  </Badge>
                  
                  <Button
                    size="sm"
                    onClick={() => handleServiceRequest(service)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Request
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredServices.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Cloud className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No services found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filters to find the services you're looking for.
            </p>
            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}>
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Service Request Modal/Info */}
      {selectedService && (
        <Card className="fixed inset-4 z-50 max-w-2xl mx-auto bg-background border shadow-large">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-3">
                <span className="text-2xl">{selectedService.icon}</span>
                <span>{selectedService.name}</span>
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedService(null)}
              >
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Service Description</h4>
                <p className="text-muted-foreground">{selectedService.description}</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <Badge variant="secondary">{selectedService.category}</Badge>
                <Badge variant="outline" className="border-green-500 text-green-700">
                  {selectedService.status}
                </Badge>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button className="flex-1">
                  <Plus className="w-4 h-4 mr-2" />
                  Submit Request
                </Button>
                <Button variant="outline" onClick={() => setSelectedService(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InfrastructurePage;