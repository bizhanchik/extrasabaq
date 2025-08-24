import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Trophy, Code, Lightbulb, Star, Clock, Sun, PenTool } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { summerPrograms } from "@/data/summer-programs"
import { hackathons } from "@/data/hackathons"
import { essays } from "@/data/essays"
import { startups } from "@/data/startups"

const categoryInfo = {
  олимпиады: {
    title: "Олимпиады",
    description:
      "Академические соревнования по различным предметам для проверки знаний и навыков решения задач. Олимпиады помогают развивать аналитическое мышление и углублять знания в выбранной области.",
    icon: Trophy,
    color: "bg-blue-500",
  },
  хакатоны: {
    title: "Хакатоны",
    description:
      "Интенсивные соревнования по программированию и разработке, где участники создают проекты за ограниченное время. Отличная возможность применить технические навыки и поработать в команде.",
    icon: Code,
    color: "bg-green-500",
  },
  "стартап-конкурсы": {
    title: "Стартап-конкурсы",
    description:
      "Соревнования для молодых предпринимателей, где можно представить свои бизнес-идеи, получить обратную связь от экспертов и выиграть инвестиции или менторскую поддержку.",
    icon: Lightbulb,
    color: "bg-purple-500",
  },
  "эссе-конкурсы": {
    title: "Эссе-конкурсы",
    description:
      "Литературные соревнования, где участники демонстрируют свои навыки письма, критического мышления и способность выражать идеи. Помогают развивать коммуникативные навыки.",
    icon: PenTool,
    color: "bg-orange-500",
  },
  "летние-программы": {
    title: "Летние программы",
    description:
      "Образовательные программы и курсы для школьников в летний период. Возможность изучить новые предметы, развить навыки и подготовиться к поступлению в университет.",
    icon: Sun,
    color: "bg-yellow-500",
  },
}

const activeCompetitions = [
  {
    id: 1,
    title: "Международная олимпиада по математике IMO 2025",
    description: "Престижная математическая олимпиада для школьников со всего мира",
    image: "/placeholder.svg?height=200&width=300",
    deadline: "15 февраля 2025",
    level: "Международный",
    subject: "Математика",
    ageLimit: "15-18 лет",
    teamSize: "Индивидуально",
    location: "Онлайн/Офлайн",
    free: true,
    featured: true,
  },
  {
    id: 2,
    title: "Республиканская олимпиада по физике",
    description: "Национальная олимпиада по физике для учащихся 9-11 классов",
    image: "/placeholder.svg?height=200&width=300",
    deadline: "28 января 2025",
    level: "Республиканский",
    subject: "Физика",
    ageLimit: "15-17 лет",
    teamSize: "Индивидуально",
    location: "Алматы",
    free: true,
    featured: false,
  },
  {
    id: 3,
    title: "Олимпиада по информатике КазНИТУ",
    description: "Региональная олимпиада по программированию и алгоритмам",
    image: "/placeholder.svg?height=200&width=300",
    deadline: "10 марта 2025",
    level: "Региональный",
    subject: "Информатика",
    ageLimit: "16-18 лет",
    teamSize: "Индивидуально",
    location: "Алматы",
    free: false,
    featured: false,
  },
]



export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const resolvedParams = await params
  const decodedSlug = decodeURIComponent(resolvedParams.slug)
  const category = categoryInfo[decodedSlug as keyof typeof categoryInfo]
  const IconComponent = category?.icon || Trophy
  
  // Определяем какие данные использовать в зависимости от категории
  let currentData
  if (decodedSlug === "летние-программы") {
    currentData = summerPrograms
  } else if (decodedSlug === "хакатоны") {
    currentData = hackathons
  } else if (decodedSlug === "эссе-конкурсы") {
    currentData = essays
  } else if (decodedSlug === "стартап-конкурсы") {
    currentData = startups
  } else {
    currentData = activeCompetitions
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Категория не найдена</h1>
          <p className="text-gray-600">Запрашиваемая категория не существует.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Image
                  src="/logo.jpeg"
                  alt="Extrasabaq Logo"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-pink-500 font-medium">
                Главная
              </Link>
              <Link href="/team" className="text-gray-700 hover:text-orange-500 font-medium">
                Команда
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-purple-500 font-medium">
                О нас
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Category Hero */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <div className={`${category.color} rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6`}>
              <IconComponent className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{category.title}</h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">{category.description}</p>
          </div>
        </div>
      </section>

      {/* Competitions */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {currentData.map((competition) => (
              <Card key={competition.id} className="hover:shadow-lg transition-shadow h-full">
                <div className="p-6 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">{competition.level}</Badge>
                      <Badge variant="outline">{competition.subject}</Badge>
                    </div>
                    <div className="flex gap-2">
                      {competition.featured && (
                        <Badge className="bg-yellow-500 hover:bg-yellow-600">
                          <Star className="h-3 w-3 mr-1" />
                          Рекомендуем
                        </Badge>
                      )}
                      <Badge variant={(competition as any).is_free !== false && (competition as any).free !== false ? "secondary" : "destructive"}>
                        {(competition as any).is_free !== false && (competition as any).free !== false ? "Бесплатно" : "Платно"}
                      </Badge>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{competition.title}</h3>
                  <p className="text-gray-600 mb-4 flex-grow">{competition.description}</p>

                  <div className="grid grid-cols-1 gap-3 text-sm mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">Дедлайн: {competition.deadline}</span>
                    </div>
                    {(competition as any).date && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Дата: {(competition as any).date}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{(competition as any).team_size || (competition as any).teamSize}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{competition.location}</span>
                    </div>
                    {(competition as any).format && (
                      <div className="flex items-center gap-2">
                        <Code className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Формат: {(competition as any).format}</span>
                      </div>
                    )}
                    {(competition as any).organizer && (
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Организатор: {(competition as any).organizer}</span>
                      </div>
                    )}
                    {((competition as any).age_limit || (competition as any).ageLimit) && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{(competition as any).age_limit || (competition as any).ageLimit}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 mt-auto">
                    <Button asChild className="flex-1">
                      <Link href={`/competition/${competition.id}`}>Подробнее</Link>
                    </Button>
                    <Button variant="outline" size="icon">
                      <Star className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
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
