import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Calendar,
  MapPin,
  Users,
  Star,
  Clock,
  Globe,
  Award,
  FileText,
  ExternalLink,
  Share2,
  BookmarkPlus,
  CalendarPlus,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { summerPrograms } from "@/data/summer-programs"
import { hackathons } from "@/data/hackathons"
import { essays } from "@/data/essays"
import { startups } from "@/data/startups"

// Функция для поиска соревнования по ID во всех источниках данных
function findCompetitionById(id: string) {
  const allCompetitions = [
    ...summerPrograms,
    ...hackathons,
    ...essays,
    ...startups
  ]
  
  return allCompetitions.find(comp => comp.id.toString() === id)
}

export default async function CompetitionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const competition = findCompetitionById(id)
  
  if (!competition) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Соревнование не найдено</h1>
          <p className="text-gray-600 mb-6">Запрашиваемое соревнование не существует или было удалено.</p>
          <Button asChild>
            <Link href="/">Вернуться на главную</Link>
          </Button>
        </div>
      </div>
    )
  }

  const comp = competition as any

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/logo.jpeg"
                  alt="Extrasabaq Logo"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/" className="text-gray-600 hover:text-gray-900">
                Главная
              </Link>
              <Link href="/team" className="text-gray-600 hover:text-gray-900">
                Команда
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
                О нас
              </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Competition Hero */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="relative mb-6">
                <Image
                  src={comp.image || "/placeholder.svg"}
                  alt={comp.title}
                  width={600}
                  height={400}
                  className="w-full h-64 lg:h-80 object-cover rounded-lg"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-yellow-500 hover:bg-yellow-600">
                    <Star className="h-3 w-3 mr-1" />
                    Рекомендуем
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant={comp.free !== false ? "secondary" : "destructive"}>
                    {comp.free !== false ? "Бесплатно" : "Платно"}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline">{comp.level}</Badge>
                <Badge variant="outline">{comp.subject}</Badge>
                <Badge variant="outline">{comp.format || 'Онлайн'}</Badge>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">{comp.title}</h1>

              <p className="text-lg text-gray-600 mb-6">{comp.description}</p>

              <div className="prose max-w-none text-gray-700">
                {(comp.fullDescription || comp.full_description || comp.description).split("\n").map(
                  (paragraph: string, index: number) =>
                    paragraph.trim() && (
                      <p key={index} className="mb-4">
                        {paragraph.trim()}
                      </p>
                    ),
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Информация о соревновании</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Дедлайн подачи</p>
                      <p className="text-sm text-gray-600">{comp.deadline}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">Дата проведения</p>
                      <p className="text-sm text-gray-600">{comp.eventDate || comp.date || 'Уточняется'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="font-medium">Место проведения</p>
                      <p className="text-sm text-gray-600">{comp.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="font-medium">Формат участия</p>
                      <p className="text-sm text-gray-600">{comp.teamSize || comp.team_size || 'Индивидуально'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Возрастные ограничения</p>
                      <p className="text-sm text-gray-600">{comp.ageLimit || comp.age_limit || 'Не указано'}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Button className="w-full" size="lg">
                      <CalendarPlus className="h-4 w-4 mr-2" />
                      Подать заявку
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <BookmarkPlus className="h-4 w-4 mr-2" />
                        В избранное
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Share2 className="h-4 w-4 mr-2" />
                        Поделиться
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-8 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Дополнительная информация
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium text-gray-700">Язык проведения</p>
                  <p className="text-gray-600">{comp.language || comp.lang || 'Русский'}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Организатор</p>
                  <p className="text-gray-600">{comp.organizer || comp.organization || 'Не указан'}</p>
                </div>
                {comp.website && (
                  <div>
                    <p className="font-medium text-gray-700">Официальный сайт</p>
                    <Link
                      href={comp.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      Перейти на сайт
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Призы и награды
                </CardTitle>
              </CardHeader>
              <CardContent>
                {comp.prizes ? (
                  <ul className="space-y-2">
                    {(comp.prizes as any)?.map((prize: any, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{prize}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">{comp.prize_fund || comp.awards || 'Информация о призах уточняется'}</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Requirements */}
      {(comp.requirements || comp.participant_requirements) && (
        <section className="py-8 px-4">
          <div className="container mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Требования к участникам
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {(comp.requirements || comp.participant_requirements.split(';')).map((req: any, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{req.trim()}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

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
