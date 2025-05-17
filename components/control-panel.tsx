"use client"

import { InfoIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { useState, useRef } from "react"

export function ControlPanel() {
  const [nFactor, setNFactor] = useState(5.0)
  const [budget, setBudget] = useState(1000)
  const [isRunning, setIsRunning] = useState(false)
  const [fileName, setFileName] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      // Here you would normally parse the file
      // For demo purposes, we'll just show a success message
      alert(`File "${file.name}" uploaded successfully!`)
    }
  }
  
  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    const file = e.dataTransfer.files?.[0]
    if (file) {
      setFileName(file.name)
      // Here you would normally parse the file
      // For demo purposes, we'll just show a success message
      alert(`File "${file.name}" uploaded successfully!`)
    }
  }
  
  // Handle N-Factor change
  const handleNFactorChange = (value: number[]) => {
    setNFactor(value[0] / 10) // Convert 0-100 to 0-10
  }
  
  // Handle budget change
  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(Number(e.target.value))
  }
  
  // Handle run/stop
  const toggleRunning = () => {
    setIsRunning(!isRunning)
    if (!isRunning) {
      // Simulate starting a campaign
      alert("Campaign started!")
    } else {
      // Simulate stopping a campaign
      alert("Campaign stopped!")
    }
  }
  
  // Handle reset
  const handleReset = () => {
    setNFactor(5.0)
    setBudget(1000)
    setIsRunning(false)
    setFileName("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    alert("Campaign reset!")
  }

  return (
    <div className="bg-[#111827] rounded-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4">Control Panel</h2>

      <div className="space-y-2">
        <h3 className="text-gray-400">Campaign Data</h3>
        <div 
          className={`border border-dashed ${fileName ? 'border-[#00d8ff]' : 'border-gray-600'} rounded-lg p-6 flex flex-col items-center justify-center text-center h-32`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          style={{ cursor: 'pointer' }}
        >
          <input 
            type="file" 
            ref={fileInputRef}
            className="hidden" 
            accept=".csv,.json" 
            onChange={handleFileUpload} 
          />
          {fileName ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-[#00d8ff] mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p className="text-sm text-[#00d8ff]">{fileName}</p>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-gray-400 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="text-sm text-gray-400">
                Drag & drop or <span className="text-[#00d8ff]">browse</span>
                <br />
                CSV/JSON files
              </p>
            </>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-400">Mode</h3>
          <InfoIcon className="h-4 w-4 text-gray-500" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button className="bg-[#00d8ff] hover:bg-[#00a8c7] text-black">Simulated</Button>
          <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
            Real-time
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-400">N-Factor</h3>
          <InfoIcon className="h-4 w-4 text-gray-500" />
        </div>
        <div className="pt-4 pb-2">
          <Slider 
            defaultValue={[50]} 
            max={100} 
            step={1} 
            className="w-full" 
            onValueChange={handleNFactorChange}
            value={[nFactor * 10]} // Convert 0-10 to 0-100
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Clicks</span>
          <span>Balanced</span>
          <span>Conversions</span>
        </div>
        <div className="text-right text-[#00d8ff] font-bold">{nFactor.toFixed(1)}</div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-400">Campaign Budget</h3>
          <InfoIcon className="h-4 w-4 text-gray-500" />
        </div>
        <div className="flex items-center">
          <span className="text-gray-400 mr-2">$</span>
          <Input
            type="number"
            value={budget}
            onChange={handleBudgetChange}
            className="bg-[#1f2937] border-gray-700 text-white focus:border-[#00d8ff]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4">
        <Button 
          className={isRunning ? "bg-red-600 hover:bg-red-700 text-white" : "bg-green-600 hover:bg-green-700 text-white"}
          onClick={toggleRunning}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isRunning ? "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" : "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"}
            />
          </svg>
          {isRunning ? "Stop" : "Start"}
        </Button>
        <Button 
          variant="outline" 
          className="border-gray-700 text-gray-300 hover:bg-gray-800"
          onClick={handleReset}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Reset
        </Button>
      </div>
    </div>
  )
}
