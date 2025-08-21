import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, UserPlus } from 'lucide-react';

const RegisterModal = ({ open, onOpenChange, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    iamAccountId: "",
    iamUsername: "",
    iamPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!agreeToTerms) {
      setError("Please accept the Terms of Service and Privacy Policy");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("https://rzuqhb8ca5.execute-api.ap-south-1.amazonaws.com/registerpost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to register. Please try again.");

      const data = await response.json();
      console.log("Registration success:", data);
      onOpenChange(false);
    } catch (error) {
      console.error("Registration error:", error);
      setError("Something went wrong during registration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignInClick = () => {
  onOpenChange(false); // Close register modal
  if (onSwitchToLogin) {
    onSwitchToLogin(); // Open login modal
  }
};


  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      iamAccountId: "",
      iamUsername: "",
      iamPassword: "",
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
    setError("");
    setAgreeToTerms(false);
  };

  useEffect(() => {
    if (!open) resetForm();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold text-[#3d1f7a]">
            Create Your Unifyd Cloud Account
          </DialogTitle>
          <p className="text-sm text-[#3d1f7a] mt-2">
            Join us today and get started with your cloud journey
          </p>
        </DialogHeader>

        <form onSubmit={handleRegister} className="space-y-4 mt-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Full Name */}
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter your email address"
              required
            />
          </div>

          {/* Role (Dropdown) */}
          <div>
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              value={formData.role}
              onChange={(e) => handleInputChange("role", e.target.value)}
              className="mt-1 h-10 w-full border rounded-lg px-3"
              required
            >
              <option value="">Select a role</option>
              <option value="Developer">Developer</option>
              <option value="Data Analyst">Data Analyst</option>
              <option value="DevOps">DevOps</option>
            </select>
          </div>

          {/* IAM fields in grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="iamAccountId">IAM Account ID</Label>
              <Input
                id="iamAccountId"
                type="text"
                value={formData.iamAccountId}
                onChange={(e) => handleInputChange("iamAccountId", e.target.value)}
                placeholder="Enter IAM Account ID"
                required
              />
            </div>
            <div>
              <Label htmlFor="iamUsername">IAM Username</Label>
              <Input
                id="iamUsername"
                type="text"
                value={formData.iamUsername}
                onChange={(e) => handleInputChange("iamUsername", e.target.value)}
                placeholder="Enter IAM Username"
                required
              />
            </div>
            <div>
              <Label htmlFor="iamPassword">IAM Password</Label>
              <Input
                id="iamPassword"
                type="password"
                value={formData.iamPassword}
                onChange={(e) => handleInputChange("iamPassword", e.target.value)}
                placeholder="Enter IAM Password"
                required
              />
            </div>
          </div>

          {/* Password fields side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  placeholder="Create a strong password"
                  className="pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8 hover:bg-gray-100"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  placeholder="Confirm your password"
                  className="pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8 hover:bg-gray-100"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start space-x-2 mt-4">
            <input
              type="checkbox"
              id="terms"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <Label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
              I agree to the{" "}
              <button type="button" className="text-[#3d1f7a] hover:underline">
                Terms of Service
              </button>{" "}
              and{" "}
              <button type="button" className="text-[#3d1f7a] hover:underline">
                Privacy Policy
              </button>
            </Label>
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            className="w-full h-10 bg-[#3d1f7a] hover:bg-[#3d1f7a] mt-4 rounded-xl"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Creating Account...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <UserPlus className="w-4 h-4" />
                <span>Create Account</span>
              </div>
            )}
          </Button>
        </form>

        <div className="mt-4 text-center border-t pt-3">
          <p className="text-sm text-[#3d1f7a]">
            Already have an account?{" "}
            <button
              type="button"
              onClick={handleSignInClick}
              className="text-[#3d1f7a] hover:underline font-medium"
            >
              Sign in
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
