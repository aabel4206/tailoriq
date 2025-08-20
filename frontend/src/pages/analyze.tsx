import { useState } from "react";
import Layout from "../components/Layout";
import UploadForm from "../components/UploadForm";

export default function Analyze() {
  const [result, setResult] = useState<any>(null);

  return (
    <Layout>
      <h2 className="text-3xl font-bold text-red-600 mb-6">Analyze Resume</h2>
      <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
        {/* Removed userId prop because UploadForm no longer needs it */}
        <UploadForm onResult={setResult} />
        {result && (
          <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <h3 className="font-semibold text-red-600">Analysis Result:</h3>
            <pre className="whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </Layout>
  );
}
