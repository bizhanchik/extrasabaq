'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Sparkles, User, GraduationCap, Target, Globe, PenTool } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface FormData {
  age: string
  grade: string
  interests: string
  englishLevel: string
  essaySkills: string
}

interface Recommendation {
  title: string
  description: string
  reason: string
  category: string
  level: string
  format: string
  deadline?: string
  organizer?: string
}

export default function RecommendationsPage() {
  const [formData, setFormData] = useState<FormData>({
    age: '',
    grade: '',
    interests: '',
    englishLevel: '',
    essaySkills: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [showResults, setShowResults] = useState(false)

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        throw new Error('Failed to get recommendations')
      }
      
      const data = await response.json()
      setRecommendations(data.recommendations || [])
      setShowResults(true)
    } catch (error) {
      console.error('Error getting recommendations:', error)
      alert('Произошла ошибка при получении рекомендаций. Попробуйте еще раз.')
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setShowResults(false)
    setRecommendations([])
    setFormData({
      age: '',
      grade: '',
      interests: '',
      englishLevel: '',
      essaySkills: ''
    })
  }

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

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад на главную
        </Link>

        {!showResults ? (
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-green-600 p-3 rounded-full">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-700 to-green-700 bg-clip-text text-transparent mb-4">
                Персональные рекомендации
              </h1>
              <p className="text-gray-600 text-lg">
                Ответьте на несколько вопросов, и мы подберем идеальные внеклассные активности для вас
              </p>
            </div>

            {/* Form */}
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-t-lg">
                <CardTitle className="text-xl">Расскажите о себе</CardTitle>
                <CardDescription className="text-blue-100">
                  Все поля обязательны для заполнения
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Age */}
                  <div className="space-y-2">
                    <Label htmlFor="age" className="flex items-center text-sm font-medium">
                      <User className="w-4 h-4 mr-2 text-blue-600" />
                      Возраст
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      min="10"
                      max="25"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      placeholder="Введите ваш возраст"
                      required
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  {/* Grade */}
                  <div className="space-y-2">
                    <Label htmlFor="grade" className="flex items-center text-sm font-medium">
                      <GraduationCap className="w-4 h-4 mr-2 text-blue-600" />
                      Класс
                    </Label>
                    <Select value={formData.grade} onValueChange={(value) => handleInputChange('grade', value)} required>
                      <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Выберите ваш класс" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 класс</SelectItem>
                        <SelectItem value="6">6 класс</SelectItem>
                        <SelectItem value="7">7 класс</SelectItem>
                        <SelectItem value="8">8 класс</SelectItem>
                        <SelectItem value="9">9 класс</SelectItem>
                        <SelectItem value="10">10 класс</SelectItem>
                        <SelectItem value="11">11 класс</SelectItem>
                        <SelectItem value="university">Университет</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Interests */}
                  <div className="space-y-2">
                    <Label htmlFor="interests" className="flex items-center text-sm font-medium">
                      <Target className="w-4 h-4 mr-2 text-blue-600" />
                      Сфера, в которой хотели бы развиваться
                    </Label>
                    <Textarea
                      id="interests"
                      value={formData.interests}
                      onChange={(e) => handleInputChange('interests', e.target.value)}
                      placeholder="Опишите ваши интересы и области, в которых хотите развиваться (например: программирование, математика, искусство, наука, спорт, предпринимательство и т.д.)"
                      required
                      rows={3}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  {/* English Level */}
                  <div className="space-y-2">
                    <Label htmlFor="englishLevel" className="flex items-center text-sm font-medium">
                      <Globe className="w-4 h-4 mr-2 text-blue-600" />
                      Уровень владения английским языком (CEFR)
                    </Label>
                    <Select value={formData.englishLevel} onValueChange={(value) => handleInputChange('englishLevel', value)} required>
                      <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Выберите ваш уровень английского" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A1">A1 - Начальный</SelectItem>
                        <SelectItem value="A2">A2 - Элементарный</SelectItem>
                        <SelectItem value="B1">B1 - Средний</SelectItem>
                        <SelectItem value="B2">B2 - Выше среднего</SelectItem>
                        <SelectItem value="C1">C1 - Продвинутый</SelectItem>
                        <SelectItem value="C2">C2 - Профессиональный</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Essay Skills */}
                  <div className="space-y-2">
                    <Label htmlFor="essaySkills" className="flex items-center text-sm font-medium">
                      <PenTool className="w-4 h-4 mr-2 text-blue-600" />
                      Как вы оцениваете ваши навыки написания эссе?
                    </Label>
                    <Select value={formData.essaySkills} onValueChange={(value) => handleInputChange('essaySkills', value)} required>
                      <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Оцените ваши навыки написания эссе" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Начинающий - только начинаю изучать структуру эссе</SelectItem>
                        <SelectItem value="intermediate">Средний - могу написать простое эссе с помощью</SelectItem>
                        <SelectItem value="advanced">Продвинутый - уверенно пишу эссе разных типов</SelectItem>
                        <SelectItem value="expert">Эксперт - участвую в конкурсах эссе и получаю призы</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Анализируем ваши данные...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        Получить рекомендации
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Results */
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-700 to-green-700 bg-clip-text text-transparent mb-4">
                Ваши персональные рекомендации
              </h1>
              <p className="text-gray-600 text-lg mb-6">
                На основе ваших ответов мы подобрали следующие активности
              </p>
              <Button
                onClick={resetForm}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Пройти тест заново
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {recommendations && recommendations.length > 0 ? recommendations.map((rec, index) => (
                <Card key={index} className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
                    <CardTitle className="text-lg">{rec.title}</CardTitle>
                    <CardDescription className="text-blue-100">
                      {rec.category} • {rec.level}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-gray-700 mb-4">{rec.description}</p>
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Почему это подходит вам:</h4>
                      <p className="text-gray-600 text-sm">{rec.reason}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm">
                      {rec.format && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                          {rec.format}
                        </span>
                      )}
                      {rec.deadline && (
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full font-medium">
                          Дедлайн: {rec.deadline}
                        </span>
                      )}
                      {rec.organizer && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                          {rec.organizer}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )) : (
                <div className="col-span-2 text-center py-8">
                  <p className="text-gray-500">Не удалось найти подходящие рекомендации. Попробуйте изменить параметры поиска.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}