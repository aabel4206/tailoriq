import React, { useState } from "react";
import Layout from "../components/Layout";
import Button from "../components/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // call login API
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md space-y-6">
        <h2 className="text-2xl font-bold text-red-600 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <Button type="submit">Login</Button>
        </form>
      </div>
    </Layout>
  );
}
