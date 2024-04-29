export default function IssueSummary({
  issuesCount,
}: {
  issuesCount: {
    [status: string]: number;
  };
}) {
  return (
    <div className="flex gap-4">
      {Object.keys(issuesCount).map((status) => (
        <div key={status} className="flex-1 p-6 bg-white rounded-lg border">
          <h3 className="mb-3 text-sm font-semibold text-gray-500">{status}</h3>
          <p className="text-3xl font-semibold text-gray-800">
            {issuesCount[status]}
          </p>
        </div>
      ))}
    </div>
  );
}
