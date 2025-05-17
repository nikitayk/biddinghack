"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Dynamically import ReactConfetti with no SSR to avoid hydration issues
const ReactConfetti = dynamic(() => import("react-confetti"), {
  ssr: false,
})

export function ConfettiOverlay() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  })
  
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Mark component as mounted
    setMounted(true)
    
    // Set window size only on client side
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Don't render confetti until component is mounted and window size is available
  if (!mounted || windowSize.width === 0 || windowSize.height === 0) {
    return null
  }

  return (
    <ReactConfetti
      width={windowSize.width}
      height={windowSize.height}
      recycle={false}
      numberOfPieces={200}
      gravity={0.2}
      tweenDuration={10000}
    />
  )
}


