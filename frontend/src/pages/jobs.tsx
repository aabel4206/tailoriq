import React, { useEffect, useState } from "react";
import api from "../api";

export default function Jobs() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  async function fetchJobs() {
    const r = await api.get("/jobs/");
    setJobs(r.data);
  }
  useEffect(()=>{ fetchJobs(); }, []);

  async function create() {
    await api.post("/jobs/", { title, description: desc });
    setTitle(""); setDesc("");
    fetchJobs();
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-2">Create Job</h2>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title"
             className="block w-full mb-2 rounded border px-2 py-1" />
      <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description"
                className="block w-full mb-2 rounded border px-2 py-1" />
      <button onClick={create} className="px-3 py-1 bg-indigo-600 text-white rounded">Create</button>

      <h3 className="mt-6 text-lg">Existing Jobs</h3>
      <ul className="mt-2 space-y-1">
        {jobs.map(j => <li key={j.id} className="p-2 bg-white rounded shadow">{j.title} — id: {j.id}</li>)}
      </ul>
    </div>
  );
}
