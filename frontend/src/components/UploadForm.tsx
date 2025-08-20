import React, { useState } from "react";
import { API } from "../api"; // make sure your api/index.ts exports a default Axios instance

type Props = {
  onResult: (data: any) => void;
};

export default function UploadForm({ onResult }: Props) {
  const [jobDescription, setJobDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!jobDescription || !file) {
      setError("Please enter a job description and select a file.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("job_description", jobDescription);
      formData.append("file", file);

      const response = await API.post("/analyze/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onResult(response.data);
    } catch (err: any) {
      setError(err?.response?.data?.detail || err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow-md">
      <div>
        <label className="block text-sm font-medium text-red-700">Job Description</label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="mt-1 block w-full rounded border border-gray-300 px-2 py-1"
          placeholder="Enter job description"
          rows={4}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-red-700">Resume File</label>
        <input
          type="file"
          accept=".pdf,.txt,.docx"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mt-1"
        />
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        {loading ? "Uploading..." : "Analyze Resume"}
      </button>
    </form>
  );
}
