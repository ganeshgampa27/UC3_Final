
import React, { useState } from "react";

export default function RegistrationForm() {
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      console.log("Submitting request to API...");
      const response = await fetch(
        "https://rzuqhb8ca5.execute-api.ap-south-1.amazonaws.com/registerpost",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            role: formData.role,
            iamAccountId: formData.iamAccountId,
            iamUsername: formData.iamUsername,
            iamPassword: formData.iamPassword,
          }),
        }
      );
      console.log("Response Status:", response);
      
      const text = await response.text();
      const result = text ? JSON.parse(text) : {};



      if (!response.ok) {
      const errorMessage = result?.error || `Request failed with status ${response.status}`;
      
      // Custom alert for known error
      if (errorMessage === "User with this email already exists") {
        alert("User with this email already exists. Please try another email.");
      } else {
        alert(errorMessage);
      }

      throw new Error(errorMessage);
    }

      console.log("Response:", result);
      alert("Registration successful!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#dfe9f3] via-[#e2f0f7] to-[#b3d9e8]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create an Account
        </h2>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Role Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">-- Select a role --</option>
            <option value="DataAnalyst">Data Analyst</option>
            <option value="Developer">Developer</option>
            <option value="Devops">DevOps</option>
          </select>
        </div>

        {/* IAM Account ID */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">IAM Account ID</label>
          <input
            type="text"
            name="iamAccountId"
            value={formData.iamAccountId}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* IAM Username */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">IAM Username</label>
          <input
            type="text"
            name="iamUsername"
            value={formData.iamUsername}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* IAM Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">IAM Password</label>
          <input
            type="password"
            name="iamPassword"
            value={formData.iamPassword}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition"
        >
          Register
        </button>

        {/* Redirect to Login */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login here
          </a>
        </p>
      </form>
    </div>
  );
}
