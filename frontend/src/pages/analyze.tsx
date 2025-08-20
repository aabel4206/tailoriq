import React, { useState } from "react";
import UploadForm from "../components/UploadForm";
import ResultsCard from "../components/ResultsCard";
import { useAuth } from "../context/AuthContext";

export default function Analyze() {
  const { userId } = useAuth();
  const [result, setResult] = useState<any | null>(null);

  if (!userId) return <div className="p-6">Please log in to analyze resumes.</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Analyze Resume</h1>
      <UploadForm onResult={(d)=>setResult(d)} userId={userId} />
      <div className="mt-6">
        <ResultsCard data={result} />
      </div>
    </div>
  );
}
