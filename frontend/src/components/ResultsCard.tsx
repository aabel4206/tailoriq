export default function ResultsCard({ data }: { data: any }) {
  if (!data) return null;
  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-lg font-semibold">Match score: {data.match_score}</h3>
      <div className="mt-2">
        <strong>Matched ({data.matched?.length ?? 0}):</strong>
        <ul className="list-disc list-inside">
          {(data.matched || []).map((m: string, i: number) => <li key={i}>{m}</li>)}
        </ul>
      </div>
      <div className="mt-2">
        <strong>Missing ({data.missing?.length ?? 0}):</strong>
        <ul className="list-disc list-inside">
          {(data.missing || []).map((m: string, i: number) => <li key={i}>{m}</li>)}
        </ul>
      </div>
    </div>
  );
}
