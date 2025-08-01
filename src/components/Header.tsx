// import React from 'react';
// import { Button } from './ui/button';
// import { Badge } from './ui/badge';
// import { 
//   Globe, 
//   ChevronDown, 
//   Menu, 
//   LogOut, 
//   Plus,
//   Cloud
// } from 'lucide-react';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from './ui/dropdown-menu';
// import { cloudProviders } from '../mock/data';

// interface HeaderProps {
//   currentUser: any;
//   selectedProvider: string;
//   onProviderChange: (provider: string) => void;
//   onLogout: () => void;
//   isMobileMenuOpen: boolean;
//   setIsMobileMenuOpen: (open: boolean) => void;
// }

// const Header: React.FC<HeaderProps> = ({
//   currentUser,
//   selectedProvider,
//   onProviderChange,
//   onLogout,
//   isMobileMenuOpen,
//   setIsMobileMenuOpen
// }) => {
//   const getProviderIcon = (providerId: string) => {
//     switch (providerId) {
//       case 'aws':
//         return '☁️';
//       case 'azure':
//         return '🔷';
//       case 'gcp':
//         return '🟦';
//       default:
//         return '🌐';
//     }
//   };

//   const getProviderName = (providerId: string) => {
//     if (providerId === 'all') return 'All Providers';
//     const provider = cloudProviders.find(p => p.id === providerId);
//     return provider?.name || 'Unknown Provider';
//   };

//   return (
//     <header className="fixed top-0 left-0 right-0 z-40 bg-background border-b border-border">
//       <div className="flex items-center justify-between px-4 py-3">
//         {/* Left Section - Logo and Mobile Menu */}
//         <div className="flex items-center space-x-4">
//           <Button
//             variant="ghost"
//             size="sm"
//             className="md:hidden"
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           >
//             <Menu className="w-5 h-5" />
//           </Button>
          
//           <div className="flex items-center space-x-2">
//             <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
//               <Globe className="w-4 h-4" />
//             </div>
//             <span className="text-lg font-semibold text-foreground hidden sm:block">
//               UC3
//             </span>
//             <Badge variant="outline" className="text-xs border-primary text-primary hidden sm:inline-flex">
//               Demo
//             </Badge>
//           </div>
//         </div>

//         {/* Center Section - Cloud Provider Selector */}
//         <div className="flex items-center space-x-4">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" className="h-9 px-3">
//                 <Cloud className="w-4 h-4 mr-2" />
//                 <span className="hidden sm:inline">
//                   {getProviderName(selectedProvider)}
//                 </span>
//                 <span className="sm:hidden">
//                   {getProviderIcon(selectedProvider)}
//                 </span>
//                 <ChevronDown className="w-4 h-4 ml-2" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="center" className="w-56">
//               <DropdownMenuItem
//                 onClick={() => onProviderChange('all')}
//                 className={selectedProvider === 'all' ? 'bg-accent' : ''}
//               >
//                 <span className="mr-2">🌐</span>
//                 All Providers
//               </DropdownMenuItem>
//               {cloudProviders.map((provider) => (
//                 <DropdownMenuItem
//                   key={provider.id}
//                   onClick={() => onProviderChange(provider.id)}
//                   className={selectedProvider === provider.id ? 'bg-accent' : ''}
//                 >
//                   <span className="mr-2">{getProviderIcon(provider.id)}</span>
//                   {provider.name}
//                   <div className={`ml-auto w-2 h-2 rounded-full ${
//                     provider.status === 'connected' ? 'bg-green-500' : 'bg-red-500'
//                   }`} />
//                 </DropdownMenuItem>
//               ))}
//               <DropdownMenuItem
//                 onClick={() => onProviderChange('add-new')}
//                 className="border-t border-border mt-1"
//               >
//                 <Plus className="w-4 h-4 mr-2" />
//                 Add New Provider
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>

//         {/* Right Section - User Info */}
//         <div className="flex items-center space-x-4">
//           <div className="hidden sm:block text-right">
//             <div className="text-sm font-medium text-foreground">
//               {currentUser?.username}
//             </div>
//             <div className="text-xs text-muted-foreground">
//               {currentUser?.name}
//             </div>
//           </div>
          
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full">
//                 <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
//                   {currentUser?.name?.charAt(0) || 'U'}
//                 </div>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuItem onClick={onLogout}>
//                 <LogOut className="w-4 h-4 mr-2" />
//                 Logout
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;


import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Globe, Menu, LogOut, Settings } from 'lucide-react';
import { cloudProviders } from '../mock/data';

interface HeaderProps {
  currentUser: any;
  selectedProvider: string;
  onProviderChange: (provider: string) => void;
  onLogout: () => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  currentUser,
  selectedProvider,
  onProviderChange,
  onLogout,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background border-b border-border shadow-soft">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <span className="font-semibold text-foreground text-lg hidden sm:block">UC3</span>
        
            </div>
          </div>

          {/* Center Section - Provider Selector */}
          <div className="flex items-center space-x-4">
            <div className="text-sm text-muted-foreground hidden sm:block">
              Cloud Provider:
            </div>
            <Select value={selectedProvider} onValueChange={onProviderChange}>
              <SelectTrigger className="w-[180px] border-border">
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Providers</SelectItem>
                {cloudProviders.map((provider) => (
                  <SelectItem key={provider.id} value={provider.id}>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          provider.status === 'connected' ? 'bg-cloud-emerald' : 'bg-cloud-red'
                        }`}
                      />
                      <span>{provider.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block text-right">
              <div className="text-sm font-medium text-foreground">
                {currentUser?.name}
              </div>
              <div className="text-xs text-muted-foreground">
                {currentUser?.username}
              </div>
            </div>
            
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                {currentUser?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>

            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:ml-2 sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;