"use client"

import { DownloadIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"

const bidData = [
  { id: "bid_fq2nb3443", ctr: 0.0118, cvr: 0.0376, price: 19.98, result: "WON" },
  { id: "bid_71s80gr6w", ctr: 0.0896, cvr: 0.0238, price: 20.86, result: "WON" },
  { id: "bid_tnv0qy1mr", ctr: 0.0726, cvr: 0.035, price: 24.76, result: "WON" },
  { id: "bid_3rk765ul6", ctr: 0.0642, cvr: 0.0065, price: 9.67, result: "WON" },
  { id: "bid_2umg0umy7", ctr: 0.019, cvr: 0.0132, price: 8.5, result: "LOST" },
  { id: "bid_f0z28avxe", ctr: 0.0069, cvr: 0.0126, price: 6.99, result: "WON" },
]

export function BidOutcomes() {
  // Handle export
  const handleExport = () => {
    // Create CSV content
    const csvContent = "data:text/csv;charset=utf-8," 
      + "ID,CTR,CVR,BID PRICE,RESULT\n" 
      + bidData.map(row => `${row.id},${row.ctr},${row.cvr},${row.price},${row.result}`).join("\n");
    
    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "bid_outcomes.csv");
    document.body.appendChild(link);
    
    // Trigger download
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="bg-[#111827] rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Bid Outcomes</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-400 hover:text-white"
          onClick={handleExport}
        >
          <DownloadIcon className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2 px-4 text-left text-gray-400 font-medium">ID</th>
              <th className="py-2 px-4 text-left text-gray-400 font-medium">CTR</th>
              <th className="py-2 px-4 text-left text-gray-400 font-medium">CVR</th>
              <th className="py-2 px-4 text-left text-gray-400 font-medium">BID PRICE</th>
              <th className="py-2 px-4 text-left text-gray-400 font-medium">RESULT</th>
            </tr>
          </thead>
          <tbody>
            {bidData.map((bid) => (
              <tr key={bid.id} className="border-b border-gray-800">
                <td className="py-3 px-4 text-gray-300">{bid.id}</td>
                <td className="py-3 px-4 text-gray-300">{bid.ctr.toFixed(4)}</td>
                <td className="py-3 px-4 text-gray-300">{bid.cvr.toFixed(4)}</td>
                <td className="py-3 px-4 text-gray-300">${bid.price.toFixed(2)}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      bid.result === "WON" ? "text-[#10b981]" : "text-[#ef4444]"
                    }`}
                  >
                    {bid.result}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
