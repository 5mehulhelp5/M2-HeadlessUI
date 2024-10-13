"use client";
import React, { useState } from 'react';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission, for example, send email to your backend
    console.log("Password reset link sent to:", email);
  };

  return (
    <div className="container mx-auto px-4 xl:px-0">
      <div className="items-center justify-center max-w-lg mx-auto p-10 border my-10 rounded-md">
        <h2 className="text-2xl font-medium mb-5 text-center">Forgot Your Password?</h2>
        <div className="text-center">
          Please enter your email address below to receive a password reset link.
        </div>
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="relative">
            <label
              htmlFor="email"
              className="absolute -top-2 left-3 bg-white text-xs text-gray-400"
            >
              Email
            </label>
            <input
              className="appearance-none border rounded-md w-full py-3.5 px-5 text-gray-500 leading-tight focus:outline-none focus:shadow-lg focus:shadow-md border-gray-300"
              placeholder="Email"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn-primary mt-4"
          >
            <span>Reset My Password</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
