// import React, { useState } from 'react';
// import { Button } from './ui/button';
// import { Card } from './ui/card';
// import { Input } from './ui/input';
// import { Label } from './ui/label';
// import { Badge } from './ui/badge';
// import { Globe, Eye, EyeOff } from 'lucide-react';
// import { userRoles } from '../mock/data';
// import { useNavigate } from 'react-router-dom';

// interface UserRole {
//   id: string;
//   name: string;
//   description: string;
//   credentials: {
//     username: string;
//     password: string;
//   };
//   dashboardFeatures: string[];
// }

// const LoginPage = () => {
//   const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleRoleSelect = (role: UserRole) => {
//     setSelectedRole(role);
//     setUsername(role.credentials.username);
//     setPassword(role.credentials.password);
//   };

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!selectedRole) return;

//     setIsLoading(true);
    
//     // Simulate login process
//     setTimeout(() => {
//       // Store user role in localStorage for demo
//       localStorage.setItem('userRole', selectedRole.id);
//       localStorage.setItem('userName', username);
//       setIsLoading(false);
      
//       // Redirect based on role
//       if (selectedRole.id === 'manager') {
//         navigate('/manager-dashboard');
//       } else {
//         navigate('/dashboard');
//       }
//     }, 1500);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
//       <div className="w-full max-w-4xl">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center space-x-2 mb-4">
//             <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
//               <Globe className="w-6 h-6" />
//             </div>
//             <span className="text-2xl font-bold text-foreground">UnifiedCloudCostControl (UC3)</span>
//           </div>
//           <h1 className="text-3xl font-bold mb-2 text-foreground">Welcome Back</h1>
//           <p className="text-muted-foreground">
//             Sign in to your CloudUnify account
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Demo Credentials */}
//           <Card className="p-8 shadow-large bg-gradient-card">
//             <h2 className="text-xl font-semibold mb-4 text-card-foreground">Demo Credentials</h2>
//             <p className="text-muted-foreground mb-6">
//               Click on any role below to automatically fill the login form with demo credentials:
//             </p>
            
//             <div className="space-y-4">
//               {userRoles.map((role) => (
//                 <div
//                   key={role.id}
//                   className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
//                     selectedRole?.id === role.id
//                       ? 'border-primary bg-primary-light shadow-soft'
//                       : 'border-border hover:border-primary/50 hover:bg-accent'
//                   }`}
//                   onClick={() => handleRoleSelect(role)}
//                 >
//                   <div className="flex items-center justify-between mb-3">
//                     <div className="flex items-center space-x-3">
//                       <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
//                         role.id === 'employee' ? 'bg-cloud-emerald' : 
//                         role.id === 'manager' ? 'bg-cloud-blue' : 
//                         'bg-primary'
//                       }`}>
//                         <span className="text-white font-medium text-sm">
//                           {role.name.charAt(0)}
//                         </span>
//                       </div>
//                       <div>
//                         <h3 className="font-semibold text-card-foreground">{role.name}</h3>
//                         <p className="text-sm text-muted-foreground">{role.credentials.username}</p>
//                       </div>
//                     </div>
//                     <div className={`w-4 h-4 rounded-full border-2 ${
//                       selectedRole?.id === role.id
//                         ? 'bg-primary border-primary'
//                         : 'border-border'
//                     }`}>
//                       {selectedRole?.id === role.id && (
//                         <div className="w-2 h-2 bg-primary-foreground rounded-full m-0.5"></div>
//                       )}
//                     </div>
//                   </div>
//                   <p className="text-sm text-muted-foreground mb-3">{role.description}</p>
                  
//                   <div className="space-y-2">
//                     <div className="text-xs font-mono text-muted-foreground">DASHBOARD FEATURES</div>
//                     <div className="flex flex-wrap gap-1">
//                       {role.dashboardFeatures.slice(0, 2).map((feature, idx) => (
//                         <Badge key={idx} variant="secondary" className="text-xs">
//                           {feature}
//                         </Badge>
//                       ))}
//                       {role.dashboardFeatures.length > 2 && (
//                         <Badge variant="secondary" className="text-xs">
//                           +{role.dashboardFeatures.length - 2} more
//                         </Badge>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="mt-8 p-4 bg-muted rounded-lg">
//               <div className="text-sm font-medium text-foreground mb-2">Password for all demo accounts:</div>
//               <div className="text-sm font-mono bg-background p-2 rounded border">demo123</div>
//             </div>
//           </Card>

//           {/* Login Form */}
//           <Card className="p-8 shadow-large bg-gradient-card">
//             <div className="text-center mb-6">
//               <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
//                 <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
//                   <Globe className="w-6 h-6" />
//                 </div>
//               </div>
//               <h2 className="text-2xl font-bold text-primary mb-2">Welcome Back</h2>
//               <p className="text-muted-foreground">Sign in to your CloudUnify account</p>
//             </div>
            
//             {selectedRole ? (
//               <form onSubmit={handleLogin} className="space-y-6">
//                 <div className="bg-primary-light border border-primary/20 rounded-lg p-4 mb-6">
//                   <div className="text-sm font-medium text-primary mb-2">
//                     Selected Role: {selectedRole.name}
//                   </div>
//                   <div className="text-xs text-primary/70">
//                     Demo credentials have been auto-filled. Click "Sign In" to continue.
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="username" className="text-card-foreground">Email Address</Label>
//                   <Input
//                     id="username"
//                     type="email"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     placeholder="Enter your email"
//                     className="h-12"
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="password" className="text-card-foreground">Password</Label>
//                   <div className="relative">
//                     <Input
//                       id="password"
//                       type={showPassword ? "text" : "password"}
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       placeholder="Enter your password"
//                       className="h-12"
//                       required
//                     />
//                     <Button
//                       type="button"
//                       variant="ghost"
//                       size="sm"
//                       className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? (
//                         <EyeOff className="h-4 w-4 text-muted-foreground" />
//                       ) : (
//                         <Eye className="h-4 w-4 text-muted-foreground" />
//                       )}
//                     </Button>
//                   </div>
//                 </div>

//                 <Button 
//                   type="submit" 
//                   className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 h-12 font-medium shadow-medium"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? 'Signing In...' : 'Sign In'}
//                 </Button>

//                 <div className="text-center pt-4">
//                   <p className="text-sm text-muted-foreground">Use demo credentials from the left panel</p>
//                 </div>
//               </form>
//             ) : (
//               <div className="text-center py-8">
//                 <div className="text-muted-foreground mb-4">
//                   <Globe className="w-12 h-12 mx-auto mb-2" />
//                 </div>
//                 <p className="text-muted-foreground">
//                   Please select a role to continue with the demo
//                 </p>
//               </div>
//             )}

//             <div className="text-center pt-6">
//               <Button 
//                 type="button"
//                 variant="ghost"
//                 onClick={() => navigate('/')}
//                 className="text-sm text-muted-foreground hover:text-foreground"
//               >
//                 ← Back to Landing Page
//               </Button>
//             </div>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
















































import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Globe, Eye, EyeOff, Shield, Lock } from 'lucide-react';
import { userRoles } from '../mock/data';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Find matching user credentials
    const matchedRole = userRoles.find(role => 
      role.credentials.username === username && role.credentials.password === password
    );

    setTimeout(() => {
      if (matchedRole) {
        localStorage.setItem('userRole', matchedRole.id);
        localStorage.setItem('userName', username);
        setIsLoading(false);
        
        if (matchedRole.id === 'manager') {
          navigate('/manager-dashboard');
        } 
        else if(matchedRole.id === 'admin'){
          navigate('/admin-dashboard');
        }
        
        else {
          navigate('/dashboard');
        }
      } else {
        setError('Invalid email or password. Please try again.');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col items-center justify-start p-0 sm:p-6 lg:p-8">
      <div className="w-full max-w-md mx-auto flex flex-col min-h-screen">
        {/* Header - Adjusted to take ~20% of page height */}
        <div className="text-center h-[20vh] flex flex-col items-center justify-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-primary text-primary-foreground rounded-2xl flex items-center justify-center shadow-glow">
              <Globe className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">UC3 Platform</h1>
          <p className="text-muted-foreground">Cloud Service Management Portal</p>
        </div>

        {/* Main Login Card */}
        <Card className="p-2 shadow-large bg-gradient-card border-0 backdrop-blur-sm">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
              <p className="text-muted-foreground">Please sign in to your account</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-destructive text-sm text-center">{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-foreground">
                  Email Address
                </Label>
                <Input
                  id="username"
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-12 transition-all duration-200 focus:shadow-soft"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 pr-12 transition-all duration-200 focus:shadow-soft"
                    placeholder="Enter your password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-10 w-10 hover:bg-accent rounded-md"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                  />
                  <Label htmlFor="remember" className="text-muted-foreground cursor-pointer">
                    Remember me
                  </Label>
                </div>
                <Button variant="link" className="p-0 h-auto text-primary text-sm">
                  Forgot password?
                </Button>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-primary hover:shadow-glow transition-all duration-300 font-semibold text-base"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Lock className="w-4 h-4" />
                    <span>Sign In</span>
                  </div>
                )}
              </Button>
            </form>

            {/* Footer */}
            <div className="pt-6 border-t border-border space-y-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Button variant="link" className="p-0 h-auto text-primary">
                    Contact Administrator
                  </Button>
                </p>
              </div>
              
              <div className="text-center">
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Back to Home
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Demo Info */}
        <div className="mt-6 p-4 bg-card border border-border rounded-lg shadow-soft">
          <h3 className="text-sm font-semibold text-foreground mb-3 text-center">Demo Credentials</h3>
          <div className="space-y-1 text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span className="font-medium">Admin:</span>
              <span>admin@company.com / demo123</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Manager:</span>
              <span>sarah.manager@company.com / demo123</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Employee:</span>
              <span>john.doe@company.com / demo123</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;