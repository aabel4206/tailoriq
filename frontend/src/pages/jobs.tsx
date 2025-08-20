import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Button from "../components/Button";
import { API } from "../api"; // your API wrapper

export default function Jobs() {
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    // fetch jobs from backend
    API.get("/jobs").then(res => setJobs(res.data));
  }, []);

  return (
    <Layout>
      <h2 className="text-3xl font-bold text-red-600 mb-6">Job Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map(job => (
          <div key={job.id} className="border p-4 rounded-md shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-red-600">{job.title}</h3>
            <p className="text-gray-900">{job.description}</p>
            <Button>Apply</Button>
          </div>
        ))}
      </div>
    </Layout>
  );
}
