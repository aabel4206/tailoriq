import React, { useState } from "react";
import api from "../api";

type Props = { onResult: (data: any) => void; userId: number; };

export default function UploadForm({ onResult, userId }: Props) {
  const [jobId, setJobId] = useState<number | "">("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !jobId) { setError("Pick a job and file"); return; }
    setLoading(true); setError(null);
    try {
      const form = new FormData();
      form.append("user_id", String(userId));
      form.append("job_id", String(jobId));
      form.append("file", file);

      // axios will send multipart/form-data
      const res = await api.post("/analyses/analyze", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onResult(res.data);
    } catch (err: any) {
      setError(err?.response?.data?.detail || err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Job ID</label>
        <input value={jobId} onChange={e => setJobId(e.target.value ? Number(e.target.value) : "")}
               className="mt-1 block w-full rounded border px-2 py-1" placeholder="Enter job id from /jobs" />
      </div>

      <div>
        <label className="block text-sm font-medium">Resume file (.pdf/.txt)</label>
        <input type="file" accept=".pdf,.txt,.docx" onChange={e => setFile(e.target.files?.[0] || null)} />
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}

      <button type="submit" disabled={loading} className="px-4 py-2 bg-indigo-600 text-white rounded">
        {loading ? "Uploading..." : "Analyze Resume"}
      </button>
    </form>
  );
}
