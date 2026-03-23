"use client";

export default function Filters({ days, setDays }) {
  return (
    <div className="flex items-center gap-3">
      <label htmlFor="analytics-days" className="text-sm font-medium text-gray-700">
        Time Range
      </label>

      <select
        id="analytics-days"
        value={days}
        onChange={(e) => setDays(Number(e.target.value))}
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
      >
        <option value={7}>Last 7 days</option>
        <option value={30}>Last 30 days</option>
        <option value={90}>Last 90 days</option>
      </select>
    </div>
  );
}