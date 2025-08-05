"use client"

import { useEffect, useState } from "react"

export function LightningAnimation() {
  const [bolts, setBolts] = useState<Array<{ id: number; x: number; delay: number }>>([])

  useEffect(() => {
    const newBolts = []
    for (let i = 0; i < 5; i++) {
      newBolts.push({
        id: i,
        x: Math.random() * window.innerWidth,
        delay: Math.random() * 1000,
      })
    }
    setBolts(newBolts)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Dark storm background */}
      <div className="absolute inset-0 bg-gray-900 opacity-60 animate-pulse"></div>

      {/* Lightning bolts */}
      {bolts.map((bolt) => (
        <div
          key={bolt.id}
          className="absolute top-0 w-1 bg-yellow-300 animate-lightning"
          style={{
            left: `${bolt.x}px`,
            height: "100vh",
            animationDelay: `${bolt.delay}ms`,
            boxShadow: "0 0 20px #fef08a, 0 0 40px #fef08a, 0 0 60px #fef08a",
          }}
        />
      ))}

      {/* Thunder text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-6xl font-bold animate-pulse text-red-500 drop-shadow-lg">⚡ INCORRECT! ⚡</div>
      </div>
    </div>
  )
}
