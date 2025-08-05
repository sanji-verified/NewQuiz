"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: (username: string) => void
  onSwitchToSignup: () => void
  currentLanguage: string
}

const translations = {
  English: {
    login: "Login",
    username: "Username",
    password: "Password",
    loginButton: "Login",
    noAccount: "Don't have an account?",
    signUp: "Sign Up",
  },
  Hindi: {
    login: "लॉगिन",
    username: "उपयोगकर्ता नाम",
    password: "पासवर्ड",
    loginButton: "लॉगिन",
    noAccount: "खाता नहीं है?",
    signUp: "साइन अप",
  },
  Tamil: {
    login: "உள்நுழைய",
    username: "பயனர் பெயர்",
    password: "கடவுச்சொல்",
    loginButton: "உள்நुழைய",
    noAccount: "கணக்கு இல்லையா?",
    signUp: "பதிவு செய்க",
  },
}

export function LoginModal({ isOpen, onClose, onLogin, onSwitchToSignup, currentLanguage }: LoginModalProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const t = translations[currentLanguage as keyof typeof translations]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim()) {
      onLogin(username.trim())
      setUsername("")
      setPassword("")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white border-2 border-cyan-300">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-cyan-700 text-center">{t.login}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-gray-700">
              {t.username}
            </Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-cyan-300 focus:border-cyan-500"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700">
              {t.password}
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-cyan-300 focus:border-cyan-500"
              required
            />
          </div>
          <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white">
            {t.loginButton}
          </Button>
        </form>
        <div className="text-center text-sm text-gray-600">
          {t.noAccount}{" "}
          <button onClick={onSwitchToSignup} className="text-cyan-600 hover:text-cyan-700 font-medium">
            {t.signUp}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
