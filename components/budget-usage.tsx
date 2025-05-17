"use client"

export function BudgetUsage() {
  const percentage = 18.8
  const circumference = 2 * Math.PI * 45
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="bg-[#111827] rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Budget Usage</h2>

      <div className="flex justify-center">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle cx="50" cy="50" r="45" fill="transparent" stroke="#374151" strokeWidth="8" />

            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              stroke="#00d8ff"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 50 50)"
            />

            {/* Center text */}
            <text
              x="50"
              y="45"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-3xl font-bold"
              fill="#00d8ff"
            >
              {percentage}%
            </text>
            <text x="50" y="60" textAnchor="middle" dominantBaseline="middle" className="text-xs" fill="#9ca3af">
              of budget used
            </text>
          </svg>
        </div>
      </div>
    </div>
  )
}
