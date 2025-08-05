"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RainbowAnimation } from "@/components/rainbow-animation"
import { RainyAnimation } from "@/components/rainy-animation"
import translations from "@/translations"

interface Question {
  id: number
  category: "Tech" | "History" | "Maths" | "Current Affairs"
  question: string
  options: string[]
  correctAnswer: number
  difficulty: "Easy" | "Medium" | "Hard"
}

const questionBank: Question[] = [
  // Tech Questions (60% - 36 questions)
  {
    id: 1,
    category: "Tech",
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Home Tool Markup Language",
      "Hyperlink and Text Markup Language",
    ],
    correctAnswer: 0,
    difficulty: "Easy",
  },
  {
    id: 2,
    category: "Tech",
    question: "Which programming language is known as the 'mother of all languages'?",
    options: ["C", "Assembly", "FORTRAN", "COBOL"],
    correctAnswer: 0,
    difficulty: "Medium",
  },
  {
    id: 3,
    category: "Tech",
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correctAnswer: 1,
    difficulty: "Hard",
  },
  {
    id: 4,
    category: "Tech",
    question: "Which company developed the React JavaScript library?",
    options: ["Google", "Facebook", "Microsoft", "Apple"],
    correctAnswer: 1,
    difficulty: "Easy",
  },
  {
    id: 5,
    category: "Tech",
    question: "What does CSS stand for?",
    options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
    correctAnswer: 1,
    difficulty: "Easy",
  },
  {
    id: 6,
    category: "Tech",
    question: "Which data structure uses LIFO principle?",
    options: ["Queue", "Stack", "Array", "Linked List"],
    correctAnswer: 1,
    difficulty: "Medium",
  },
  {
    id: 7,
    category: "Tech",
    question: "What is the latest version of HTTP?",
    options: ["HTTP/1.1", "HTTP/2", "HTTP/3", "HTTP/4"],
    correctAnswer: 2,
    difficulty: "Medium",
  },
  {
    id: 8,
    category: "Tech",
    question: "Which sorting algorithm has the best average time complexity?",
    options: ["Bubble Sort", "Quick Sort", "Selection Sort", "Insertion Sort"],
    correctAnswer: 1,
    difficulty: "Hard",
  },
  {
    id: 9,
    category: "Tech",
    question: "What does API stand for?",
    options: [
      "Application Programming Interface",
      "Advanced Programming Interface",
      "Creative Style Sheets",
      "Colorful Style Sheets",
    ],
    correctAnswer: 0,
    difficulty: "Easy",
  },
  {
    id: 10,
    category: "Tech",
    question: "Which database is known as a NoSQL database?",
    options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
    correctAnswer: 2,
    difficulty: "Medium",
  },
  {
    id: 11,
    category: "Tech",
    question: "What is the purpose of Git?",
    options: ["Database Management", "Version Control", "Web Development", "Mobile Development"],
    correctAnswer: 1,
    difficulty: "Easy",
  },
  {
    id: 12,
    category: "Tech",
    question: "Which protocol is used for secure web communication?",
    options: ["HTTP", "HTTPS", "FTP", "SMTP"],
    correctAnswer: 1,
    difficulty: "Easy",
  },
  {
    id: 13,
    category: "Tech",
    question: "What is the space complexity of merge sort?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctAnswer: 2,
    difficulty: "Hard",
  },
  {
    id: 14,
    category: "Tech",
    question: "Which language is primarily used for iOS app development?",
    options: ["Java", "Swift", "Kotlin", "C#"],
    correctAnswer: 1,
    difficulty: "Medium",
  },
  {
    id: 15,
    category: "Tech",
    question: "What does JSON stand for?",
    options: [
      "JavaScript Object Notation",
      "Java Standard Object Notation",
      "JavaScript Oriented Notation",
      "Java Script Object Network",
    ],
    correctAnswer: 0,
    difficulty: "Easy",
  },
  {
    id: 16,
    category: "Tech",
    question: "Which design pattern ensures only one instance of a class?",
    options: ["Factory", "Singleton", "Observer", "Strategy"],
    correctAnswer: 1,
    difficulty: "Medium",
  },
  {
    id: 17,
    category: "Tech",
    question: "What is the default port for HTTPS?",
    options: ["80", "443", "8080", "3000"],
    correctAnswer: 1,
    difficulty: "Medium",
  },
  {
    id: 18,
    category: "Tech",
    question: "Which AI technique is used in machine learning for pattern recognition?",
    options: ["Neural Networks", "Linear Programming", "Genetic Algorithms", "Expert Systems"],
    correctAnswer: 0,
    difficulty: "Hard",
  },
  {
    id: 19,
    category: "Tech",
    question: "What does DOM stand for in web development?",
    options: ["Document Object Model", "Data Object Management", "Dynamic Object Model", "Document Oriented Model"],
    correctAnswer: 0,
    difficulty: "Medium",
  },
  {
    id: 20,
    category: "Tech",
    question: "Which cloud service model provides the most control over the infrastructure?",
    options: ["SaaS", "PaaS", "IaaS", "FaaS"],
    correctAnswer: 2,
    difficulty: "Hard",
  },

  // Maths Questions (20% - 12 questions)
  {
    id: 21,
    category: "Maths",
    question: "What is the value of π (pi) approximately?",
    options: ["3.14159", "2.71828", "1.41421", "1.61803"],
    correctAnswer: 0,
    difficulty: "Easy",
  },
  {
    id: 22,
    category: "Maths",
    question: "What is the derivative of x²?",
    options: ["x", "2x", "x²", "2x²"],
    correctAnswer: 1,
    difficulty: "Medium",
  },
  {
    id: 23,
    category: "Maths",
    question: "What is the square root of 144?",
    options: ["12", "14", "16", "18"],
    correctAnswer: 0,
    difficulty: "Easy",
  },
  {
    id: 24,
    category: "Maths",
    question: "What is the integral of 2x?",
    options: ["x²", "x² + C", "2x²", "x² + 2C"],
    correctAnswer: 1,
    difficulty: "Medium",
  },
  {
    id: 25,
    category: "Maths",
    question: "What is the value of e (Euler's number) approximately?",
    options: ["2.71828", "3.14159", "1.41421", "1.73205"],
    correctAnswer: 0,
    difficulty: "Medium",
  },
  {
    id: 26,
    category: "Maths",
    question: "What is 15% of 200?",
    options: ["25", "30", "35", "40"],
    correctAnswer: 1,
    difficulty: "Easy",
  },
  {
    id: 27,
    category: "Maths",
    question: "What is the sum of angles in a triangle?",
    options: ["90°", "180°", "270°", "360°"],
    correctAnswer: 1,
    difficulty: "Easy",
  },
  {
    id: 28,
    category: "Maths",
    question: "What is the formula for the area of a circle?",
    options: ["πr", "πr²", "2πr", "πd"],
    correctAnswer: 1,
    difficulty: "Medium",
  },
  {
    id: 29,
    category: "Maths",
    question: "What is log₁₀(1000)?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 1,
    difficulty: "Medium",
  },
  {
    id: 30,
    category: "Maths",
    question: "What is the solution to the equation 2x + 5 = 15?",
    options: ["x = 5", "x = 10", "x = 7.5", "x = 2.5"],
    correctAnswer: 0,
    difficulty: "Easy",
  },
  {
    id: 31,
    category: "Maths",
    question: "What is the limit of (sin x)/x as x approaches 0?",
    options: ["0", "1", "∞", "undefined"],
    correctAnswer: 1,
    difficulty: "Hard",
  },
  {
    id: 32,
    category: "Maths",
    question: "What is the determinant of a 2x2 matrix [[a,b],[c,d]]?",
    options: ["ad + bc", "ad - bc", "ac - bd", "ac + bd"],
    correctAnswer: 1,
    difficulty: "Hard",
  },

  // History Questions (10% - 6 questions)
  {
    id: 33,
    category: "History",
    question: "In which year did World War II end?",
    options: ["1944", "1945", "1946", "1947"],
    correctAnswer: 1,
    difficulty: "Medium",
  },
  {
    id: 34,
    category: "History",
    question: "Who was the first President of the United States?",
    options: ["Thomas Jefferson", "George Washington", "John Adams", "Benjamin Franklin"],
    correctAnswer: 1,
    difficulty: "Easy",
  },
  {
    id: 35,
    category: "History",
    question: "In which year did India gain independence?",
    options: ["1946", "1947", "1948", "1949"],
    correctAnswer: 1,
    difficulty: "Easy",
  },
  {
    id: 36,
    category: "History",
    question: "Who built the Taj Mahal?",
    options: ["Akbar", "Shah Jahan", "Aurangzeb", "Humayun"],
    correctAnswer: 1,
    difficulty: "Medium",
  },
  {
    id: 37,
    category: "History",
    question: "Which ancient wonder of the world was located in Alexandria?",
    options: ["Hanging Gardens", "Lighthouse of Alexandria", "Colossus of Rhodes", "Statue of Zeus"],
    correctAnswer: 1,
    difficulty: "Hard",
  },
  {
    id: 38,
    category: "History",
    question: "Who was known as the 'Iron Lady'?",
    options: ["Indira Gandhi", "Margaret Thatcher", "Golda Meir", "Angela Merkel"],
    correctAnswer: 1,
    difficulty: "Medium",
  },

  // Current Affairs Questions (10% - 6 questions)
  {
    id: 39,
    category: "Current Affairs",
    question: "Which technology is primarily associated with Web3?",
    options: ["Artificial Intelligence", "Blockchain", "Quantum Computing", "Virtual Reality"],
    correctAnswer: 1,
    difficulty: "Medium",
  },
  {
    id: 40,
    category: "Current Affairs",
    question: "What does ChatGPT stand for?",
    options: [
      "Chat Generative Pre-trained Transformer",
      "Computer Hybrid Artificial General Purpose Technology",
      "Conversational Generative Programming Tool",
      "Chat Generated Predictive Text",
    ],
    correctAnswer: 0,
    difficulty: "Easy",
  },
  {
    id: 41,
    category: "Current Affairs",
    question: "Which company is known for developing the metaverse concept?",
    options: ["Google", "Apple", "Meta (Facebook)", "Microsoft"],
    correctAnswer: 2,
    difficulty: "Easy",
  },
  {
    id: 42,
    category: "Current Affairs",
    question: "What is the primary goal of sustainable development?",
    options: [
      "Economic Growth",
      "Environmental Protection",
      "Meeting present needs without compromising future generations",
      "Technological Advancement",
    ],
    correctAnswer: 2,
    difficulty: "Medium",
  },
  {
    id: 43,
    category: "Current Affairs",
    question: "Which renewable energy source is growing fastest globally?",
    options: ["Wind Energy", "Solar Energy", "Hydroelectric", "Geothermal"],
    correctAnswer: 1,
    difficulty: "Medium",
  },
  {
    id: 44,
    category: "Current Affairs",
    question: "What does NFT stand for?",
    options: ["New Financial Technology", "Non-Fungible Token", "Network File Transfer", "Next Future Technology"],
    correctAnswer: 1,
    difficulty: "Hard",
  },
]

const difficultyMap = {
  Easy: 0,
  Medium: 1,
  Hard: 2,
}

const reverseDifficultyMap = ["Easy", "Medium", "Hard"]

const increaseDifficulty = (current: keyof typeof difficultyMap): keyof typeof difficultyMap => {
  const currentNum = difficultyMap[current]
  const nextNum = Math.min(currentNum + 1, reverseDifficultyMap.length - 1)
  return reverseDifficultyMap[nextNum] as keyof typeof difficultyMap
}

const decreaseDifficulty = (current: keyof typeof difficultyMap): keyof typeof difficultyMap => {
  const currentNum = difficultyMap[current]
  const nextNum = Math.max(currentNum - 1, 0)
  return reverseDifficultyMap[nextNum] as keyof typeof difficultyMap
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const QUIZ_QUESTION_COUNT = 15 // Define the fixed number of questions per quiz

interface QuizInterfaceProps {
  currentLanguage: string
}

export function QuizInterface({ currentLanguage }: QuizInterfaceProps) {
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null) // Holds the current question
  const [askedQuestionIds, setAskedQuestionIds] = useState<Set<number>>(new Set()) // Tracks asked questions
  const [currentDifficultyLevel, setCurrentDifficultyLevel] = useState<keyof typeof difficultyMap>("Medium") // Dynamic difficulty
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [answered, setAnswered] = useState(false)
  const [showRainbow, setShowRainbow] = useState(false)
  const [showRainy, setShowRainy] = useState(false)
  const [questionCount, setQuestionCount] = useState(0) // Tracks how many questions have been asked in current quiz

  const t = translations[currentLanguage as keyof typeof translations]

  // Function to get the next question based on difficulty and unasked status
  const getNextQuestion = useCallback(
    (targetDifficulty: keyof typeof difficultyMap): Question | null => {
      const unaskedQuestions = questionBank.filter((q) => !askedQuestionIds.has(q.id))

      if (unaskedQuestions.length === 0) {
        return null // No more questions left in the entire bank
      }

      // Try to find a question of the target difficulty
      let filteredQuestions = unaskedQuestions.filter((q) => q.difficulty === targetDifficulty)

      // If no questions of target difficulty, try adjacent difficulties
      if (filteredQuestions.length === 0) {
        const targetNum = difficultyMap[targetDifficulty]
        // Try one level easier
        if (targetNum > 0) {
          const easierDifficulty = reverseDifficultyMap[targetNum - 1] as keyof typeof difficultyMap
          filteredQuestions = unaskedQuestions.filter((q) => q.difficulty === easierDifficulty)
        }
      }
      if (filteredQuestions.length === 0) {
        const targetNum = difficultyMap[targetDifficulty]
        // Try one level harder (only if easier didn't yield results or was already at lowest)
        if (targetNum < reverseDifficultyMap.length - 1) {
          const harderDifficulty = reverseDifficultyMap[targetNum + 1] as keyof typeof difficultyMap
          filteredQuestions = unaskedQuestions.filter((q) => q.difficulty === harderDifficulty)
        }
      }

      // If still no questions (e.g., after trying adjacent difficulties), pick any random unasked question
      if (filteredQuestions.length === 0) {
        filteredQuestions = unaskedQuestions
      }

      // Pick a random question from the filtered list
      const nextQuestion = shuffleArray(filteredQuestions)[0]

      if (nextQuestion) {
        setAskedQuestionIds((prev) => new Set(prev).add(nextQuestion.id))
      }
      return nextQuestion || null
    },
    [askedQuestionIds],
  )

  // Function to load the next question, potentially advancing the question count
  const loadNextQuestion = useCallback(
    (advanceQuestionSlot: boolean) => {
      setSelectedAnswer(null)
      setAnswered(false)

      let newQuestionCount = questionCount
      if (advanceQuestionSlot) {
        newQuestionCount = questionCount + 1
        setQuestionCount(newQuestionCount)
      }

      if (newQuestionCount > QUIZ_QUESTION_COUNT) {
        setShowResult(true)
        return
      }

      const nextQ = getNextQuestion(currentDifficultyLevel)
      if (nextQ) {
        setCurrentQuestion(nextQ)
      } else {
        // Fallback if no more questions, or if specific difficulty questions are exhausted
        setShowResult(true) // End quiz if no more questions can be found
      }
    },
    [questionCount, askedQuestionIds, currentDifficultyLevel, getNextQuestion], // Added getNextQuestion to dependencies
  )

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null || !currentQuestion) {
      alert(t.selectAnswer)
      return
    }

    setAnswered(true)

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1)
      setShowRainbow(true)
      setCurrentDifficultyLevel(increaseDifficulty(currentDifficultyLevel)) // Increase difficulty
      setTimeout(() => {
        setShowRainbow(false)
        loadNextQuestion(true) // Advance to next question slot
      }, 500)
    } else {
      setShowRainy(true)
      setCurrentDifficultyLevel(decreaseDifficulty(currentDifficultyLevel)) // Decrease difficulty
      setTimeout(() => {
        setShowRainy(false)
        loadNextQuestion(false) // Refresh current question slot with new question
      }, 500)
    }
  }

  const handleStartQuiz = () => {
    setQuizStarted(true)
    setAskedQuestionIds(new Set())
    setCurrentDifficultyLevel("Medium") // Start with Medium difficulty
    setScore(0)
    setQuestionCount(1) // Start at question 1
    setShowResult(false)
    setSelectedAnswer(null)
    setAnswered(false)
    const firstQuestion = getNextQuestion("Medium") // Get the very first question
    if (firstQuestion) {
      setCurrentQuestion(firstQuestion)
    } else {
      // Handle case where no questions are available at all
      alert("No questions available to start the quiz! Please add questions to the question bank.")
      setQuizStarted(false)
    }
  }

  const restartQuiz = () => {
    setQuizStarted(false)
    setCurrentQuestion(null)
    setAskedQuestionIds(new Set())
    setCurrentDifficultyLevel("Medium")
    setScore(0)
    setShowResult(false)
    setAnswered(false)
    setQuestionCount(0)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Tech":
        return "bg-blue-500"
      case "History":
        return "bg-amber-500"
      case "Maths":
        return "bg-green-500"
      case "Current Affairs":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!quizStarted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-2 border-cyan-300">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-cyan-700 mb-4">Online Education Quiz Portal</CardTitle>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-100 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">60%</div>
                    <div className="text-sm text-blue-800">Tech</div>
                  </div>
                  <div className="bg-amber-100 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-amber-600">10%</div>
                    <div className="text-sm text-amber-800">History</div>
                  </div>
                  <div className="bg-green-100 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">20%</div>
                    <div className="text-sm text-green-800">Maths</div>
                  </div>
                  <div className="bg-purple-100 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">10%</div>
                    <div className="text-sm text-purple-800">Current Affairs</div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleStartQuiz}
                className="bg-cyan-600 hover:bg-cyan-700 text-white text-lg px-8 py-3"
                size="lg"
              >
                {t.startQuiz}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (showResult) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-2 border-cyan-300">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-cyan-700">{t.quizComplete}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-6xl font-bold text-cyan-600">
                {score}/{QUIZ_QUESTION_COUNT}
              </div>
              <div className="text-xl text-gray-700">
                {t.yourScore}: {Math.round((score / QUIZ_QUESTION_COUNT) * 100)}%
              </div>
              <Button onClick={restartQuiz} className="bg-cyan-600 hover:bg-cyan-700 text-white">
                {t.restartQuiz}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!currentQuestion) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-white">
        Loading questions or no questions available...
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 relative">
      {showRainbow && <RainbowAnimation />}
      {showRainy && <RainyAnimation />}

      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Progress value={(questionCount / QUIZ_QUESTION_COUNT) * 100} className="h-3 bg-white/50" />
          <div className="text-center mt-2 text-white font-semibold">
            {t.question} {questionCount} {t.of} {QUIZ_QUESTION_COUNT}
          </div>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-2 border-cyan-300">
          <CardHeader>
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-2">
                <Badge className={`${getCategoryColor(currentQuestion.category)} text-white`}>
                  {t.category}: {currentQuestion.category}
                </Badge>
                <Badge className={getDifficultyColor(currentQuestion.difficulty)}>
                  {t.difficulty}: {currentQuestion.difficulty}
                </Badge>
              </div>
            </div>
            <CardTitle className="text-xl font-bold text-gray-800">{currentQuestion.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === index ? "default" : "outline"}
                  className={`p-4 h-auto text-left justify-start ${
                    selectedAnswer === index
                      ? "bg-cyan-600 text-white border-cyan-600"
                      : "bg-white hover:bg-cyan-50 border-gray-300"
                  } ${
                    answered && index === currentQuestion.correctAnswer
                      ? "bg-green-500 text-white border-green-500"
                      : answered && selectedAnswer === index && index !== currentQuestion.correctAnswer
                        ? "bg-red-500 text-white border-red-500"
                        : ""
                  }`}
                  onClick={() => !answered && setSelectedAnswer(index)}
                  disabled={answered}
                >
                  <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </Button>
              ))}
            </div>

            <div className="flex justify-center pt-4">
              {!answered ? (
                <Button
                  onClick={handleAnswerSubmit}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white px-8"
                  disabled={selectedAnswer === null}
                >
                  {t.submitAnswer}
                </Button>
              ) : (
                <div className="text-center space-y-4">
                  <div
                    className={`text-lg font-bold ${
                      selectedAnswer === currentQuestion.correctAnswer ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {selectedAnswer === currentQuestion.correctAnswer ? t.correct : t.incorrect}
                  </div>
                  {/* No explicit "Next Question" button needed here, as it's handled automatically */}
                  <div className="text-sm text-gray-500">
                    {selectedAnswer === currentQuestion.correctAnswer
                      ? "Moving to next question..."
                      : "Getting a new question at lower difficulty..."}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
