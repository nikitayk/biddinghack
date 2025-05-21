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
import { AuthProvider } from "../hooks/useAuth" // NEW: Auth context
import NavBar from "../components/ui/NavBar"       // NEW: Always-on navigation
import "../styles/globals.css"

// ... (Your ConfettiBackground, HelpGuideModal, ControlPanel, CampaignKPIs, CampaignPerformance, BudgetUsage, BidOutcomes, BidConsole components remain unchanged)

export default function Home() {
  const [confetti, setConfetti] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [nFactor, setNFactor] = useState(5)
  const [helpGuideOpen, setHelpGuideOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  useEffect(() => {
    if (!isMounted) return
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme, isMounted])

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  // ---- UPDATED: Global Providers and NavBar ----
  return (
    <AuthProvider>
      <NavBar />
      <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
        <HelpGuideModal isOpen={helpGuideOpen} onClose={() => setHelpGuideOpen(false)} />
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
    </AuthProvider>
  )
}
