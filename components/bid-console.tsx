"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

const initialConsoleData = [
  {
    time: "7:32:36 PM",
    type: "SUCCESS",
    message: "Bid bid_tnv0qy1mr won at $24.76 (CTR: 0.0726, CVR: 0.0350)",
  },
  {
    time: "7:32:37 PM",
    type: "SUCCESS",
    message: "Bid bid_3rk765ul6 won at $9.67 (CTR: 0.0642, CVR: 0.0065)",
  },
  {
    time: "7:32:38 PM",
    type: "INFO",
    message: "Bid bid_2umg0umy7 lost at $8.50 (CTR: 0.0190, CVR: 0.0132)",
  },
  {
    time: "7:32:39 PM",
    type: "SUCCESS",
    message: "Bid bid_f0z28avxe won at $6.99 (CTR: 0.0069, CVR: 0.0126)",
  },
]

export function BidConsole() {
  const [consoleData, setConsoleData] = useState(initialConsoleData)
  
  // Handle clear
  const handleClear = () => {
    setConsoleData([])
  }

  return (
    <div className="bg-[#111827] rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Bid Console</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-400 hover:text-white"
          onClick={handleClear}
        >
          Clear
        </Button>
      </div>

      <div className="bg-[#0a0e17] rounded-md p-4 font-mono text-sm h-48 overflow-y-auto">
        {consoleData.length > 0 ? (
          consoleData.map((log, index) => (
            <div key={index} className="mb-2">
              <span className="text-gray-500">{log.time}</span>{" "}
              <span
                className={
                  log.type === "SUCCESS" ? "text-[#10b981]" : log.type === "INFO" ? "text-[#3b82f6]" : "text-[#ef4444]"
                }
              >
                [{log.type}]
              </span>{" "}
              <span className="text-gray-300">{log.message}</span>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center py-4">Console cleared. No logs to display.</div>
        )}
      </div>
    </div>
  )
}
