"use client"

export function CampaignKPIs() {
  return (
    <div className="bg-[#111827] rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Campaign KPIs</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <p className="text-sm text-gray-400 mb-1">Bids Made</p>
          <p className="text-3xl font-bold text-white">15</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-400 mb-1">Bids Won</p>
          <p className="text-3xl font-bold text-[#10b981]">10</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="text-sm text-gray-400 mb-1">Win Rate</p>
          <p className="text-3xl font-bold text-[#a855f7]">66.7%</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-400 mb-1">Total Spent</p>
          <p className="text-3xl font-bold text-[#00d8ff]">$188.29</p>
        </div>
      </div>
    </div>
  )
}
