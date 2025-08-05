"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface SignupModalProps {
  isOpen: boolean
  onClose: () => void
  onSignup: (username: string) => void
  onSwitchToLogin: () => void
  currentLanguage: string
}

const translations = {
  English: {
    signUp: "Sign Up",
    username: "Username",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    signUpButton: "Sign Up",
    haveAccount: "Already have an account?",
    login: "Login",
  },
  Hindi: {
    signUp: "साइन अप",
    username: "उपयोगकर्ता नाम",
    email: "ईमेल",
    password: "पासवर्ड",
    confirmPassword: "पासवर्ड की पुष्टि करें",
    signUpButton: "साइन अप",
    haveAccount: "पहले से खाता है?",
    login: "लॉगिन",
  },
  Tamil: {
    signUp: "பதிவு செய்க",
    username: "பயனர் பெயர்",
    email: "மின்னஞ்சல்",
    password: "கடவுச்சொல்",
    confirmPassword: "கடவுச்சொல்லை உறுதிப்படுத்தவும்",
    signUpButton: "பதிவு செய்க",
    haveAccount: "ஏற்கனவே கணக்கு உள்ளதா?",
    login: "உள்நுழைய",
  },
}

export function SignupModal({ isOpen, onClose, onSignup, onSwitchToLogin, currentLanguage }: SignupModalProps) {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const t = translations[currentLanguage as keyof typeof translations]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim() && password === confirmPassword) {
      onSignup(username.trim())
      setUsername("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white border-2 border-cyan-300">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-cyan-700 text-center">{t.signUp}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signup-username" className="text-gray-700">
              {t.username}
            </Label>
            <Input
              id="signup-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-cyan-300 focus:border-cyan-500"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700">
              {t.email}
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-cyan-300 focus:border-cyan-500"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-password" className="text-gray-700">
              {t.password}
            </Label>
            <Input
              id="signup-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-cyan-300 focus:border-cyan-500"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-gray-700">
              {t.confirmPassword}
            </Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border-cyan-300 focus:border-cyan-500"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
            disabled={password !== confirmPassword}
          >
            {t.signUpButton}
          </Button>
        </form>
        <div className="text-center text-sm text-gray-600">
          {t.haveAccount}{" "}
          <button onClick={onSwitchToLogin} className="text-cyan-600 hover:text-cyan-700 font-medium">
            {t.login}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
