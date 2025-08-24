import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Filter,
  Calendar,
  Code,
  Lightbulb,
  PenTool,
  Sun,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const activities = [
  { name: "Летние программы", icon: Sun, color: "bg-yellow-500", count: 15 },
  { name: "Стартап конкурсы", icon: Lightbulb, color: "bg-green-500", count: 18 },
  { name: "Хакатоны", icon: Code, color: "bg-orange-500", count: 23 },
  { name: "Конкурсы Эссе", icon: PenTool, color: "bg-blue-500", count: 32 },
]

const recentCompetitions = [
  {
    title: "Международная олимпиада по математике",
    type: "Олимпиада",
    deadline: "15 февраля 2025",
    level: "Международный",
    free: true,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "AI Hackathon 2025",
    type: "Хакатон",
    deadline: "28 января 2025",
    level: "Республиканский",
    free: false,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Стартап Питч Конкурс",
    type: "Стартап конкурс",
    deadline: "10 марта 2025",
    level: "Региональный",
    free: true,
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src="/logo.jpeg"
                alt="Extrasabaq Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
                Главная
              </Link>
              <Link href="/team" className="text-gray-700 hover:text-teal-600 font-medium">
                Команда
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-slate-600 font-medium">
                О нас
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-teal-500 to-green-600 bg-clip-text text-transparent mb-6">
            Найди свое соревнование
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Платформа для школьников, где можно найти олимпиады, хакатоны и другие соревнования по своему профилю
          </p>
          <div className="flex justify-center">
            <Link href="/recommendations">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                🎯 Узнай какие внеклассные активности подходят тебе
              </Button>
            </Link>
          </div>
        </div>
      </section>



      {/* Activities Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Выберите направление</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {activities.map((activity, index) => {
              const Icon = activity.icon
              return (
                <Link
                  key={index}
                  href={`/category/${activity.name.toLowerCase().replace(/\s+/g, "-").replace(/ё/g, "е")}`}
                >
                  <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                    <CardContent className="p-6 text-center">
                      <div
                        className={`${activity.color} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2">{activity.name}</h3>
                      <p className="text-sm text-gray-500">{activity.count} активных</p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Recent Competitions */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Последние соревнования</h2>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              Фильтры
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentCompetitions.map((competition, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative">
                  <Image
                    src={competition.image || "/placeholder.svg"}
                    alt={competition.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                        competition.free ? "bg-green-500" : "bg-orange-500"
                      }`}
                    >
                      {competition.free ? "Бесплатно" : "Платно"}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">{competition.type}</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{competition.level}</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{competition.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    Дедлайн: {competition.deadline}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Показать больше соревнований
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Image
                src="/logo.jpeg"
                alt="Extrasabaq Logo"
                width={120}
                height={40}
                className="h-10 w-auto mb-4 brightness-0 invert"
              />
              <p className="text-gray-400">Платформа для поиска соревнований и формирования команд</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Навигация</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white">
                    Главная
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="hover:text-white">
                    Команды
                  </Link>
                </li>

              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Категории</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Олимпиады
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Хакатоны
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Стартапы
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Летние программы
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-gray-400">
                <li>info@extrasabaq.com</li>
                <li>+7 (XXX) XXX-XX-XX</li>
                <li>Алматы, Казахстан</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Extrasabaq. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
