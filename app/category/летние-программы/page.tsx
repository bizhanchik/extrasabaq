import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filter, Search, Calendar, MapPin, Users, Star, Clock, Sun } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { summerPrograms } from "@/data/summer-programs"

const categoryInfo = {
  "летние-программы": {
    title: "Летние программы",
    description:
      "Образовательные программы и курсы для школьников в летний период. Возможность изучить новые предметы, развить навыки и подготовиться к поступлению в университет.",
    icon: Sun,
    color: "bg-blue-500",
  },
}

export default function SummerProgramsPage() {
  const slug = "летние-программы"
  const category = categoryInfo[slug]
  const IconComponent = category?.icon || Sun
  
  // Use summer programs data
  const currentData = summerPrograms
  const currentPastData: any[] = [] // No past data for summer programs

  if (!category) {
    return <div>Категория не найдена</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-4 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">
              Главная
            </Link>
            <span>/</span>
            <span className="text-gray-900">{category.title}</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className={`${category.color} text-white py-16`}>
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 p-4 rounded-full">
              <IconComponent className="h-12 w-12" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">{category.title}</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            {category.description}
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Поиск соревнований..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-4">
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Предмет" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все предметы</SelectItem>
                  <SelectItem value="математика">Математика</SelectItem>
                  <SelectItem value="физика">Физика</SelectItem>
                  <SelectItem value="информатика">Информатика</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Уровень" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все уровни</SelectItem>
                  <SelectItem value="школьный">Школьный</SelectItem>
                  <SelectItem value="региональный">Региональный</SelectItem>
                  <SelectItem value="республиканский">Республиканский</SelectItem>
                  <SelectItem value="международный">Международный</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Больше фильтров
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active">Активные</TabsTrigger>
            <TabsTrigger value="past">Прошедшие</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            <div className="grid gap-6">
              {currentData.map((competition) => (
                <Card key={competition.id} className="hover:shadow-lg transition-shadow">
                  <div className="flex flex-col lg:flex-row">
                    <div className="relative lg:w-80">
                      <Image
                        src={(competition as any).image_url || (competition as any).image || "/placeholder.svg"}
                        alt={competition.title}
                        width={300}
                        height={200}
                        className="w-full h-48 lg:h-full object-cover rounded-t-lg lg:rounded-l-lg lg:rounded-t-none"
                      />
                      {competition.featured && (
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-yellow-500 text-white">
                            <Star className="h-3 w-3 mr-1" />
                            Рекомендуем
                          </Badge>
                        </div>
                      )}
                      <div className="absolute top-4 right-4">
                        <Badge variant={(competition as any).is_free !== false && (competition as any).free !== false ? "secondary" : "destructive"}>
                          {(competition as any).is_free !== false && (competition as any).free !== false ? "Бесплатно" : "Платно"}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{competition.title}</h3>
                          <p className="text-gray-600 mb-4">{competition.description}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">{competition.deadline}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">{(competition as any).team_size || (competition as any).teamSize}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">{competition.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">{(competition as any).age_limit || (competition as any).ageLimit}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          <Badge variant="outline">{competition.level}</Badge>
                          <Badge variant="outline">{competition.subject}</Badge>
                        </div>
                        <Button asChild>
                          <Link href={`/competition/${competition.id}`}>
                            Подробнее
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="past">
            <div className="grid gap-6">
              {currentPastData.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">Нет прошедших программ</p>
                </div>
              ) : (
                currentPastData.map((competition) => (
                  <Card key={competition.id} className="hover:shadow-lg transition-shadow opacity-75">
                    <div className="flex flex-col lg:flex-row">
                      <div className="relative lg:w-80">
                        <Image
                          src={(competition as any).image_url || (competition as any).image || "/placeholder.svg"}
                          alt={competition.title}
                          width={300}
                          height={200}
                          className="w-full h-48 lg:h-full object-cover rounded-t-lg lg:rounded-l-lg lg:rounded-t-none"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge variant="secondary">
                            Завершено
                          </Badge>
                        </div>
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-semibold mb-2">{competition.title}</h3>
                            <p className="text-gray-600 mb-4">{competition.description}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">{competition.deadline}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">{(competition as any).team_size || (competition as any).teamSize}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">{competition.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">{(competition as any).age_limit || (competition as any).ageLimit}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex gap-2">
                            <Badge variant="outline">{competition.level}</Badge>
                            <Badge variant="outline">{competition.subject}</Badge>
                          </div>
                          <Button variant="outline" asChild>
                            <Link href={`/competition/${competition.id}`}>
                              Подробнее
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
