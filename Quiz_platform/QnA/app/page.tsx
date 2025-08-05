"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { QuizInterface } from "@/components/quiz-interface"
import { LoginModal } from "@/components/login-modal"
import { SignupModal } from "@/components/signup-modal"

export default function Home() {
  const [currentLanguage, setCurrentLanguage] = useState("English")
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")

  return (
    <div className="min-h-screen bg-cyan-400 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-300 to-cyan-500"></div>
      </div>

      <Navbar
        currentLanguage={currentLanguage}
        setCurrentLanguage={setCurrentLanguage}
        isLoggedIn={isLoggedIn}
        username={username}
        onLoginClick={() => setShowLogin(true)}
        onSignupClick={() => setShowSignup(true)}
        onLogout={() => {
          setIsLoggedIn(false)
          setUsername("")
        }}
      />

      <main className="relative z-10">
        <QuizInterface currentLanguage={currentLanguage} />
      </main>

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={(user) => {
          setIsLoggedIn(true)
          setUsername(user)
          setShowLogin(false)
        }}
        onSwitchToSignup={() => {
          setShowLogin(false)
          setShowSignup(true)
        }}
        currentLanguage={currentLanguage}
      />

      <SignupModal
        isOpen={showSignup}
        onClose={() => setShowSignup(false)}
        onSignup={(user) => {
          setIsLoggedIn(true)
          setUsername(user)
          setShowSignup(false)
        }}
        onSwitchToLogin={() => {
          setShowSignup(false)
          setShowLogin(true)
        }}
        currentLanguage={currentLanguage}
      />
    </div>
  )
}
