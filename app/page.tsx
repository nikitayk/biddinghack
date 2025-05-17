"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import {
  InfoIcon,
  MoonIcon,
  SunIcon,
  UploadIcon,
  DownloadIcon,
  PlayIcon,
  MonitorStopIcon as StopIcon,
  XIcon,
} from "lucide-react"

// Client-side only confetti component
const ConfettiBackground = () => {
  const [particles, setParticles] = useState<React.ReactNode[]>([])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Only run on client-side
    setIsMounted(true)

    // Generate particles only on the client side
    const newParticles = Array.from({ length: 100 }).map((_, i) => (
      <span
        key={i}
        className="absolute inline-block"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 10 + 2}px`,
          height: `${Math.random() * 5 + 2}px`,
          opacity: Math.random() * 0.5 + 0.1,
          backgroundColor: ["#ff69b4", "#00ffff", "#ffff00", "#ff00ff", "#00ff00"][Math.floor(Math.random() * 5)],
          transform: `rotate(${Math.random() * 360}deg)`,
          animation: `fall ${Math.random() * 10 + 5}s linear infinite`,
        }}
      />
    ))

    setParticles(newParticles)
  }, [])

  // Don't render anything during SSR
  if (!isMounted) return null

  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      <div className="absolute inset-0">{particles}</div>
    </div>
  )
}

// Help Guide Modal Component
const HelpGuideModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Don't render during SSR or when closed
  if (!isMounted || !isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">BIDWIT Help Guide</h2>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              <XIcon size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <section>
              <h3 className="text-xl font-semibold mb-2">Getting Started</h3>
              <p className="mb-2">
                BIDWIT is a powerful bidding analytics dashboard that helps you monitor and optimize your campaign
                performance in real-time.
              </p>
              <p>
                Use the Control Panel to adjust settings, the Campaign Performance charts to visualize trends, and the
                Bid Console to track individual bid outcomes.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-2">Frequently Asked Questions</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">What is the N-Factor?</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    The N-Factor is a multiplier that affects bid aggressiveness. Higher values increase bid amounts and
                    potentially improve win rates at the cost of efficiency.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium">How do I import my campaign data?</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Click the "Import Data" button in the Control Panel to upload CSV or JSON files containing your
                    campaign data.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium">What do the charts show?</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    The bar chart displays daily metrics for impressions and clicks, while the line chart shows trend
                    analysis over time. Both charts update based on your N-Factor setting.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium">How do I export my data?</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Use the CSV or JSON buttons above each data section to export that specific data set in your
                    preferred format.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium">What happens when I click "Run"?</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    The Run button starts the bidding simulation based on your current settings. You'll see real-time
                    results in the Bid Console.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-2">Keyboard Shortcuts</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="font-medium">Run/Stop:</div>
                <div>Ctrl + R</div>
                <div className="font-medium">Import Data:</div>
                <div>Ctrl + I</div>
                <div className="font-medium">Export CSV:</div>
                <div>Ctrl + E</div>
                <div className="font-medium">Toggle Theme:</div>
                <div>Ctrl + T</div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

// Control Panel Component with Cyberpunk Theme
const ControlPanel = ({
  setConfetti,
  nFactor,
  setNFactor,
}: {
  setConfetti: (show: boolean) => void
  nFactor: number
  setNFactor: (value: number) => void
}) => {
  const [isRunning, setIsRunning] = useState(false)

  const handleRun = () => {
    setIsRunning(true)
    setConfetti(true)
    // Hide confetti after 3 seconds
    setTimeout(() => setConfetti(false), 3000)
  }

  const handleStop = () => {
    setIsRunning(false)
  }

  return (
    <div className="bg-gray-900 rounded-lg shadow-md p-5 h-full border border-cyan-500 cyberpunk-box">
      <h2 className="text-xl font-bold mb-6 border-b pb-2 border-cyan-500 text-cyan-400 cyberpunk-text">
        Control Panel
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-cyan-400">Campaign</label>
          <select className="w-full p-2 border rounded-md bg-gray-800 border-cyan-500 text-cyan-100 focus:ring-cyan-400 focus:border-cyan-400">
            <option>Summer Promotion 2025</option>
            <option>Fall Launch</option>
            <option>Holiday Special</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-cyan-400">Date Range</label>
          <div className="grid grid-cols-2 gap-2">
            <input type="date" className="p-2 border rounded-md bg-gray-800 border-cyan-500 text-cyan-100" />
            <input type="date" className="p-2 border rounded-md bg-gray-800 border-cyan-500 text-cyan-100" />
          </div>
        </div>

        <div>
          <div className="flex justify-between">
            <label className="block text-sm font-medium mb-2 text-cyan-400">N-Factor</label>
            <span className="text-sm font-medium text-cyan-300">{nFactor}</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={nFactor}
            onChange={(e) => setNFactor(Number.parseInt(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer cyberpunk-slider"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6">
          <button
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md text-black ${
              isRunning ? "bg-gray-500 cursor-not-allowed" : "bg-cyan-400 hover:bg-cyan-300 cyberpunk-button"
            }`}
            onClick={handleRun}
            disabled={isRunning}
          >
            <PlayIcon size={16} />
            Run
          </button>
          <button
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md ${
              isRunning
                ? "bg-pink-600 hover:bg-pink-500 text-white cyberpunk-button-alt"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
            onClick={handleStop}
            disabled={!isRunning}
          >
            <StopIcon size={16} />
            Stop
          </button>
        </div>

        <div className="border-t pt-4 mt-4 border-cyan-800">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md border border-cyan-600 text-cyan-400">
            <UploadIcon size={16} />
            Import Data
          </button>
        </div>
      </div>
    </div>
  )
}

// Campaign KPIs Component
const CampaignKPIs = () => {
  const kpiData = [
    { name: "Impressions", value: "1.2M", change: "+12.3%", color: "bg-blue-500" },
    { name: "Clicks", value: "45.3K", change: "+8.7%", color: "bg-green-500" },
    { name: "Conversions", value: "5,234", change: "+15.2%", color: "bg-purple-500" },
    { name: "CTR", value: "3.78%", change: "+5.4%", color: "bg-yellow-500" },
    { name: "CVR", value: "11.5%", change: "+9.1%", color: "bg-pink-500" },
    { name: "CPC", value: "$0.42", change: "-3.2%", color: "bg-indigo-500" },
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 h-full">
      <h2 className="text-xl font-bold mb-6 border-b pb-2 dark:border-gray-700">Campaign KPIs</h2>
      <div className="grid grid-cols-3 gap-4">
        {kpiData.map((kpi) => (
          <div key={kpi.name} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-sm">
            <div className="flex items-center mb-2">
              <div className={`w-3 h-3 rounded-full ${kpi.color} mr-2`}></div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{kpi.name}</div>
            </div>
            <div className="text-2xl font-bold">{kpi.value}</div>
            <div className={`text-xs mt-1 ${kpi.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
              {kpi.change} vs prev
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Campaign Performance Component with Separate Charts
const CampaignPerformance = ({ nFactor }: { nFactor: number }) => {
  // Base chart data
  const baseChartData = [
    { day: "Mon", impressions: 120000, clicks: 4200 },
    { day: "Tue", impressions: 132000, clicks: 4800 },
    { day: "Wed", impressions: 125000, clicks: 4500 },
    { day: "Thu", impressions: 140000, clicks: 5100 },
    { day: "Fri", impressions: 150000, clicks: 5500 },
    { day: "Sat", impressions: 135000, clicks: 4900 },
    { day: "Sun", impressions: 130000, clicks: 4700 },
  ]

  // Apply nFactor to adjust the data
  const chartData = baseChartData.map((item) => ({
    ...item,
    impressions: Math.round(item.impressions * (nFactor / 5)),
    clicks: Math.round(item.clicks * (nFactor / 5)),
  }))

  // Calculate max values for scaling
  const maxImpressions = Math.max(...chartData.map((d) => d.impressions))
  const maxClicks = Math.max(...chartData.map((d) => d.clicks))

  // Canvas ref for line chart
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  // Draw line chart using canvas
  useEffect(() => {
    setIsMounted(true)

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    ctx.scale(dpr, dpr)

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Calculate spacing
    const padding = { left: 10, right: 10, top: 10, bottom: 20 }
    const chartWidth = rect.width - padding.left - padding.right
    const chartHeight = rect.height - padding.top - padding.bottom
    const xStep = chartWidth / (chartData.length - 1)

    // Draw impressions line
    ctx.beginPath()
    ctx.strokeStyle = "#3b82f6" // blue
    ctx.lineWidth = 2

    chartData.forEach((item, i) => {
      const x = padding.left + i * xStep
      const y = padding.top + chartHeight * (1 - item.impressions / maxImpressions)

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()

    // Draw clicks line
    ctx.beginPath()
    ctx.strokeStyle = "#10b981" // green
    ctx.lineWidth = 2

    chartData.forEach((item, i) => {
      const x = padding.left + i * xStep
      const y = padding.top + chartHeight * (1 - item.clicks / maxClicks)

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()

    // Draw data points
    chartData.forEach((item, i) => {
      const x = padding.left + i * xStep

      // Impressions point
      const yImpressions = padding.top + chartHeight * (1 - item.impressions / maxImpressions)
      ctx.beginPath()
      ctx.fillStyle = "#3b82f6"
      ctx.arc(x, yImpressions, 3, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = "white"
      ctx.lineWidth = 1
      ctx.stroke()

      // Clicks point
      const yClicks = padding.top + chartHeight * (1 - item.clicks / maxClicks)
      ctx.beginPath()
      ctx.fillStyle = "#10b981"
      ctx.arc(x, yClicks, 3, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = "white"
      ctx.lineWidth = 1
      ctx.stroke()

      // Day label
      ctx.fillStyle = "#6b7280"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(item.day, x, rect.height - 5)
    })
  }, [chartData, maxImpressions, maxClicks])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 h-full">
      <div className="flex justify-between items-center mb-6 border-b pb-2 dark:border-gray-700">
        <h2 className="text-xl font-bold">Campaign Performance</h2>
        <div className="flex space-x-2">
          <button className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600">
            <DownloadIcon size={14} />
            CSV
          </button>
          <button className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600">
            <DownloadIcon size={14} />
            JSON
          </button>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="h-48 relative mb-6 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <div className="text-sm font-medium mb-4 text-gray-700 dark:text-gray-300">Daily Metrics (Bar Chart)</div>
        {/* Grid lines */}
        <div className="absolute inset-x-0 bottom-8 top-10 border-b border-l border-gray-200 dark:border-gray-700 ml-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute w-full border-t border-gray-200 dark:border-gray-700"
              style={{ bottom: `${i * 25}%` }}
            ></div>
          ))}
        </div>

        {/* Bar chart */}
        <div className="absolute bottom-8 left-4 right-4 top-10 flex items-end">
          {chartData.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center justify-end h-full">
              <div
                className="w-4/5 bg-blue-500 opacity-70 rounded-t"
                style={{ height: `${(item.impressions / maxImpressions) * 70}%` }}
              ></div>
              <div
                className="w-4/5 bg-green-500 mt-1 rounded-t"
                style={{ height: `${(item.clicks / maxClicks) * 20}%` }}
              ></div>
              <div className="text-xs mt-2 text-gray-600 dark:text-gray-400">{item.day}</div>
            </div>
          ))}
        </div>

        {/* Chart legend */}
        <div className="absolute top-4 right-4 flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 opacity-70 mr-1"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">Impressions</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 mr-1"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">Clicks</span>
          </div>
        </div>
      </div>

      {/* Line Chart using Canvas */}
      <div className="h-48 relative border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <div className="text-sm font-medium mb-4 text-gray-700 dark:text-gray-300">Trend Analysis (Line Chart)</div>

        {/* Grid lines */}
        <div className="absolute inset-x-0 bottom-8 top-10 border-b border-l border-gray-200 dark:border-gray-700 ml-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute w-full border-t border-gray-200 dark:border-gray-700"
              style={{ bottom: `${i * 25}%` }}
            ></div>
          ))}
        </div>

        {isMounted && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ marginTop: "10px", marginBottom: "8px" }}
          />
        )}

        {/* Chart legend */}
        <div className="absolute top-4 right-4 flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 opacity-70 mr-1"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">Impressions</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 mr-1"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">Clicks</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Budget Usage Component with Fixed Alignment
const BudgetUsage = () => {
  // Mock budget data
  const totalBudget = 20000
  const spent = 12345
  const remaining = totalBudget - spent
  const percentSpent = (spent / totalBudget) * 100

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 h-full">
      <h2 className="text-xl font-bold mb-6 border-b pb-2 dark:border-gray-700">Budget Usage</h2>

      {/* Donut chart for budget - fixed alignment */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-32 h-32">
          {/* Background circle */}
          <div className="absolute inset-0 rounded-full border-8 border-gray-200 dark:border-gray-700"></div>

          {/* Progress circle */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="12"
              strokeDasharray={`${percentSpent * 2.51} 251`}
              strokeDashoffset="0"
              className="text-blue-500 transform -rotate-90 origin-center"
            />
          </svg>

          {/* Percentage text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold">{percentSpent.toFixed(1)}%</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Used</div>
          </div>
        </div>
      </div>

      {/* Fixed alignment for budget numbers */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">Spent</div>
          <div className="text-xl font-bold">${spent.toLocaleString()}</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">Remaining</div>
          <div className="text-xl font-bold">${remaining.toLocaleString()}</div>
        </div>
      </div>
    </div>
  )
}

// Bid Outcomes Component
const BidOutcomes = () => {
  // Mock bid data
  const bidData = Array.from({ length: 10 }).map((_, i) => ({
    time: `12:${String(i).padStart(2, "0")} PM`,
    auction: `Auction #${1000 + i}`,
    bid: `$${(Math.random() * 2 + 0.5).toFixed(2)}`,
    result: i % 3 === 0 ? "Won" : "Lost",
  }))

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 h-full">
      <div className="flex justify-between items-center mb-6 border-b pb-2 dark:border-gray-700">
        <h2 className="text-xl font-bold">Bid Outcomes</h2>
        <div className="flex space-x-2">
          <button className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600">
            <DownloadIcon size={14} />
            CSV
          </button>
          <button className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600">
            <DownloadIcon size={14} />
            JSON
          </button>
        </div>
      </div>

      <div className="overflow-auto max-h-64">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700">
              <th className="text-left py-2 px-3 text-sm font-medium text-gray-700 dark:text-gray-300">Time</th>
              <th className="text-left py-2 px-3 text-sm font-medium text-gray-700 dark:text-gray-300">Auction</th>
              <th className="text-left py-2 px-3 text-sm font-medium text-gray-700 dark:text-gray-300">Bid</th>
              <th className="text-left py-2 px-3 text-sm font-medium text-gray-700 dark:text-gray-300">Result</th>
            </tr>
          </thead>
          <tbody>
            {bidData.map((bid, i) => (
              <tr key={i} className="border-b dark:border-gray-700">
                <td className="py-2 px-3 text-sm">{bid.time}</td>
                <td className="py-2 px-3 text-sm">{bid.auction}</td>
                <td className="py-2 px-3 text-sm">{bid.bid}</td>
                <td className="py-2 px-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      bid.result === "Won"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
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

// Bid Console Component with Cyberpunk Theme
const BidConsole = () => {
  const consoleRef = useRef<HTMLDivElement>(null)
  const [logs, setLogs] = useState<string[]>([])
  const [isMounted, setIsMounted] = useState(false)

  // Generate initial logs
  useEffect(() => {
    setIsMounted(true)

    const initialLogs = Array.from({ length: 20 }).map((_, i) => {
      const bid = (Math.random() * 2 + 0.5).toFixed(2)
      const result = i % 3 === 0 ? "Won" : "Lost"
      const color = i % 3 === 0 ? "text-green-400" : "text-red-400"
      return `<span class="text-cyan-500">[12:${String(i % 10).padStart(2, "0")} PM]</span> Bid <span class="text-yellow-300">$${bid}</span> for Auction #${1000 + i} - <span class="${color}">${result}</span>`
    })
    setLogs(initialLogs)
  }, [])

  // Scroll to bottom when logs change
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight
    }
  }, [logs])

  const clearConsole = () => {
    setLogs([])
  }

  return (
    <div className="bg-gray-900 rounded-lg shadow-md p-5 h-full border border-pink-500 cyberpunk-box">
      <h2 className="text-xl font-bold mb-6 border-b pb-2 border-pink-500 text-pink-400 cyberpunk-text">Bid Console</h2>

      <div
        ref={consoleRef}
        className="bg-black text-gray-200 p-3 rounded-lg font-mono text-sm h-64 overflow-auto border border-pink-500 cyberpunk-terminal"
      >
        {logs.map((log, i) => (
          <div key={i} className="mb-1 cyberpunk-log" dangerouslySetInnerHTML={{ __html: log }}></div>
        ))}
      </div>

      <button
        onClick={clearConsole}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md mt-4 border border-pink-600 text-pink-400 cyberpunk-button-alt"
      >
        <XIcon size={16} />
        Clear Console
      </button>
    </div>
  )
}

export default function Home() {
  const [confetti, setConfetti] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [nFactor, setNFactor] = useState(5)
  const [helpGuideOpen, setHelpGuideOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Set mounted state
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Toggle theme function
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  // Apply theme class to body
  useEffect(() => {
    if (!isMounted) return

    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme, isMounted])

  // If not mounted yet, render a simple loading state to avoid hydration errors
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      {/* Help Guide Modal */}
      <HelpGuideModal isOpen={helpGuideOpen} onClose={() => setHelpGuideOpen(false)} />

      {/* Confetti/particles background */}
      {confetti && <ConfettiBackground />}

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold cyberpunk-title">BIDWIT</h1>
          <div className="flex items-center gap-4">
            <button
              className="p-2 border rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 dark:border-gray-700"
              onClick={() => setHelpGuideOpen(true)}
              title="Help Guide"
            >
              <InfoIcon size={20} />
            </button>
            <button
              className="p-2 border rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 dark:border-gray-700"
              onClick={toggleTheme}
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === "dark" ? <SunIcon size={20} /> : <MoonIcon size={20} />}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="col-span-1">
            <ControlPanel setConfetti={setConfetti} nFactor={nFactor} setNFactor={setNFactor} />
          </div>
          <div className="col-span-3">
            <CampaignKPIs />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="col-span-3">
            <CampaignPerformance nFactor={nFactor} />
          </div>
          <div className="col-span-1">
            <BudgetUsage />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-3">
            <BidOutcomes />
          </div>
          <div className="col-span-1">
            <BidConsole />
          </div>
        </div>
      </div>
    </main>
  )
}








