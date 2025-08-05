"use client"

import { useEffect, useState } from "react"

interface Raindrop {
  id: number
  x: number
  y: number
  speed: number
  size: number
  opacity: number
}

export function RainyAnimation() {
  const [raindrops, setRaindrops] = useState<Raindrop[]>([])
  const [puddles, setPuddles] = useState<Array<{ id: number; x: number; size: number }>>([])

  useEffect(() => {
    // Create raindrops
    const newRaindrops: Raindrop[] = []
    for (let i = 0; i < 100; i++) {
      newRaindrops.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * -window.innerHeight,
        speed: Math.random() * 5 + 3,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.6 + 0.4,
      })
    }
    setRaindrops(newRaindrops)

    // Create puddles
    const newPuddles = []
    for (let i = 0; i < 8; i++) {
      newPuddles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        size: Math.random() * 60 + 20,
      })
    }
    setPuddles(newPuddles)

    // Animate raindrops
    const animateRain = () => {
      setRaindrops((prevRaindrops) =>
        prevRaindrops.map((drop) => ({
          ...drop,
          y: drop.y > window.innerHeight ? -10 : drop.y + drop.speed,
        })),
      )
    }

    const interval = setInterval(animateRain, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Dark cloudy background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-700 via-gray-600 to-gray-800 opacity-80">
        {/* Animated clouds */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-500 to-transparent opacity-60 animate-pulse"></div>
        <div
          className="absolute top-8 left-1/4 w-64 h-16 bg-gray-400 rounded-full opacity-40 animate-bounce"
          style={{ animationDuration: "4s" }}
        ></div>
        <div
          className="absolute top-12 right-1/4 w-48 h-12 bg-gray-500 rounded-full opacity-50 animate-bounce"
          style={{ animationDuration: "3s", animationDelay: "1s" }}
        ></div>
      </div>

      {/* Raindrops */}
      {raindrops.map((drop) => (
        <div
          key={drop.id}
          className="absolute bg-blue-300 rounded-full animate-rain"
          style={{
            left: `${drop.x}px`,
            top: `${drop.y}px`,
            width: `${drop.size}px`,
            height: `${drop.size * 4}px`,
            opacity: drop.opacity,
            background: "linear-gradient(to bottom, rgba(147, 197, 253, 0.8), rgba(59, 130, 246, 0.4))",
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
            transform: "rotate(10deg)",
          }}
        />
      ))}

      {/* Puddles */}
      {puddles.map((puddle) => (
        <div
          key={puddle.id}
          className="absolute bottom-0 bg-blue-400 opacity-30 rounded-full animate-pulse"
          style={{
            left: `${puddle.x}px`,
            width: `${puddle.size}px`,
            height: `${puddle.size * 0.2}px`,
            background:
              "radial-gradient(ellipse, rgba(59, 130, 246, 0.4) 0%, rgba(147, 197, 253, 0.2) 70%, transparent 100%)",
          }}
        />
      ))}

      {/* Rain lines for effect */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-px bg-blue-200 animate-rain-line"
            style={{
              left: `${Math.random() * 100}%`,
              height: "100vh",
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${0.5 + Math.random() * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Thunder/Incorrect text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl font-bold text-blue-200 drop-shadow-lg animate-bounce">🌧️ INCORRECT! 🌧️</div>
          <div className="text-2xl text-blue-100 font-semibold animate-pulse">{"Don't worry, keep trying!"}</div>
        </div>
      </div>

      {/* Ripple effects */}
      <div className="absolute inset-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border-2 border-blue-300 opacity-30 animate-ripple"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: "20px",
              height: "20px",
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
