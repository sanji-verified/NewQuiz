"use client"
import { ChevronDown, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface NavbarProps {
  currentLanguage: string
  setCurrentLanguage: (lang: string) => void
  isLoggedIn: boolean
  username: string
  onLoginClick: () => void
  onSignupClick: () => void
  onLogout: () => void
}

const languages = ["Hindi", "English", "Tamil"]

const translations = {
  English: {
    welcome: "Welcome to Quiz Students",
    language: "Language",
    login: "Login",
    signup: "Sign Up",
    logout: "Logout",
  },
  Hindi: {
    welcome: "क्विज़ छात्रों में आपका स्वागत है",
    language: "भाषा",
    login: "लॉगिन",
    signup: "साइन अप",
    logout: "लॉगआउट",
  },
  Tamil: {
    welcome: "வினாடி வினா மாணவர்களுக்கு வரவேற்கிறோம்",
    language: "மொழி",
    login: "உள்நுழைய",
    signup: "பதிவு செய்க",
    logout: "வெளியேறு",
  },
}

export function Navbar({
  currentLanguage,
  setCurrentLanguage,
  isLoggedIn,
  username,
  onLoginClick,
  onSignupClick,
  onLogout,
}: NavbarProps) {
  const t = translations[currentLanguage as keyof typeof translations]

  return (
    <nav className="bg-white/90 backdrop-blur-sm shadow-lg border-b-2 border-cyan-300 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Moving Welcome Text */}
          <div className="flex-1 overflow-hidden min-w-0">
            <div className="animate-marquee whitespace-nowrap">
              <span className="text-xl font-bold text-cyan-700 mx-4 sm:text-lg">{t.welcome}</span>
              <span className="text-xl font-bold text-cyan-700 mx-4 sm:text-lg">{t.welcome}</span>
              <span className="text-xl font-bold text-cyan-700 mx-4 sm:text-lg">{t.welcome}</span>
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex flex-wrap justify-end items-center gap-2 ml-4">
            {/* Language Selection */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-cyan-100 border-cyan-300 hover:bg-cyan-200 text-sm px-3 py-1 h-auto"
                >
                  {t.language}: {currentLanguage}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border-cyan-300">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang}
                    onClick={() => setCurrentLanguage(lang)}
                    className="hover:bg-cyan-50 text-sm"
                  >
                    {lang}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Login/Signup or User Menu */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-green-100 border-green-300 hover:bg-green-200 text-sm px-3 py-1 h-auto"
                  >
                    <User className="mr-1 h-4 w-4" />
                    <span className="max-w-[80px] truncate">{username}</span>
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border-green-300">
                  <DropdownMenuItem onClick={onLogout} className="hover:bg-red-50 text-red-600 text-sm">
                    <LogOut className="mr-1 h-4 w-4" />
                    {t.logout}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2">
                <Button
                  onClick={onLoginClick}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white text-sm px-3 py-1 h-auto"
                >
                  {t.login}
                </Button>
                <Button
                  onClick={onSignupClick}
                  variant="outline"
                  className="border-cyan-600 text-cyan-600 hover:bg-cyan-50 bg-transparent text-sm px-3 py-1 h-auto"
                >
                  {t.signup}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
