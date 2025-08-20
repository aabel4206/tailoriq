import React from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function Home() {
  return (
    <Layout>
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-red-600">Welcome to TailorIQ</h1>
        <p className="text-lg text-gray-900">
          Analyze resumes and match them to jobs seamlessly!
        </p>
        <div className="space-x-4">
          <Link to="/signup">
            <Button>Sign Up</Button>
          </Link>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
