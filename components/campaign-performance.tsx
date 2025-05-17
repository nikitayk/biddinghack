"use client"

import { DownloadIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useState } from "react"

// Mock data for the chart
const data = [
  { time: "7:32:17 PM", ctr: 0.02, cvr: 0.03 },
  { time: "7:32:18 PM", ctr: 0.04, cvr: 0.02 },
  { time: "7:32:19 PM", ctr: 0.038, cvr: 0.047 },
  { time: "7:32:20 PM", ctr: 0.01, cvr: 0.06 },
  { time: "7:32:21 PM", ctr: 0.03, cvr: 0.01 },
  { time: "7:32:22 PM", ctr: 0.06, cvr: 0.03 },
  { time: "7:32:23 PM", ctr: 0.02, cvr: 0.025 },
]

export function CampaignPerformance() {
  const [activePoint, setActivePoint] = useState({ time: "7:32:19 PM", ctr: 0.038, cvr: 0.047 })
  
  // Handle export
  const handleExport = () => {
    // Create CSV content
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Time,CTR,CVR\n" 
      + data.map(row => `${row.time},${row.ctr},${row.cvr}`).join("\n");
    
    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "campaign_performance.csv");
    document.body.appendChild(link);
    
    // Trigger download
    link.click();
    document.body.removeChild(link);
  }
  
  return (
    <div className="bg-[#111827] rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Campaign Performance</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-400 hover:text-white"
          onClick={handleExport}
        >
          <DownloadIcon className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      <div className="flex items-center justify-center gap-8 mb-4">
        <div className="flex items-center">
          <div className="w-6 h-1 bg-[#00d8ff] mr-2"></div>
          <span className="text-sm text-gray-300">CTR</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-1 bg-[#a855f7] mr-2"></div>
          <span className="text-sm text-gray-300">CVR</span>
        </div>
      </div>

      {/* Simplified chart visualization */}
      <div className="h-64 bg-[#0a0e17] rounded-md relative">
        {/* Chart lines */}
        <div className="absolute inset-0 p-4">
          <svg width="100%" height="100%" viewBox="0 0 600 200" preserveAspectRatio="none">
            {/* Grid lines */}
            <line x1="0" y1="0" x2="600" y2="0" stroke="#374151" strokeWidth="1" />
            <line x1="0" y1="40" x2="600" y2="40" stroke="#374151" strokeWidth="1" />
            <line x1="0" y1="80" x2="600" y2="80" stroke="#374151" strokeWidth="1" />
            <line x1="0" y1="120" x2="600" y2="120" stroke="#374151" strokeWidth="1" />
            <line x1="0" y1="160" x2="600" y2="160" stroke="#374151" strokeWidth="1" />
            <line x1="0" y1="200" x2="600" y2="200" stroke="#374151" strokeWidth="1" />
            
            {/* CTR line */}
            <path 
              d="M0,160 L100,120 L200,124 L300,180 L400,140 L500,80 L600,160" 
              fill="none" 
              stroke="#00d8ff" 
              strokeWidth="2"
            />
            
            {/* CVR line */}
            <path 
              d="M0,140 L100,160 L200,100 L300,80 L400,180 L500,140 L600,150" 
              fill="none" 
              stroke="#a855f7" 
              strokeWidth="2"
            />
          </svg>
        </div>
        
        {/* Time labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 text-xs text-gray-500">
          {data.map((point, i) => (
            <div key={i}>{point.time}</div>
          ))}
        </div>
        
        {/* Active point indicator */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#1f2937] p-2 rounded shadow-lg text-xs">
          <div className="text-white font-medium">{activePoint.time}</div>
          <div className="flex items-center mt-1">
            <div className="w-2 h-2 bg-[#00d8ff] mr-1"></div>
            <span className="text-gray-300">CTR: {activePoint.ctr}</span>
          </div>
          <div className="flex items-center mt-1">
            <div className="w-2 h-2 bg-[#a855f7] mr-1"></div>
            <span className="text-gray-300">CVR: {activePoint.cvr}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
