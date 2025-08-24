import OpenAI from 'openai'
import { hackathons } from '@/data/hackathons'
import { essays } from '@/data/essays'
import { startups } from '@/data/startups'
import { summerPrograms } from '@/data/summer-programs'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Combine all activities
const allActivities = [
  ...hackathons.map(h => ({ ...h, category: 'Хакатоны' })),
  ...essays.map(e => ({ ...e, category: 'Конкурсы эссе' })),
  ...startups.map(s => ({ ...s, category: 'Стартап конкурсы' })),
  ...summerPrograms.map(sp => ({ ...sp, category: 'Летние программы' }))
]

export async function POST(request: Request) {
  try {
    const { age, grade, interests, englishLevel, essaySkills } = await request.json()

    // Validate input
    if (!age || !grade || !interests || !englishLevel || !essaySkills) {
      return Response.json(
        { error: 'Все поля обязательны для заполнения' },
        { status: 400 }
      )
    }

    // Filter activities based on user criteria
     const filteredActivities = allActivities.filter(activity => {
       // Filter by age if specified
       const ageLimit = (activity as any).age_limit || (activity as any).ageLimit
       if (ageLimit) {
         if (typeof ageLimit === 'string') {
           // Parse age ranges like "15-18 лет", "16-25 лет", etc.
           const ageMatch = ageLimit.match(/(\d+)-(\d+)/)
           if (ageMatch) {
             const minAge = parseInt(ageMatch[1])
             const maxAge = parseInt(ageMatch[2])
             const userAge = parseInt(age)
             if (userAge < minAge || userAge > maxAge) {
               return false
             }
           }
         }
       }

       // Filter by English level for international competitions
       if (activity.language && activity.language.includes('Английский') && englishLevel === 'A1-A2') {
         return false
       }

       return true
     })

    // Create a prompt for ChatGPT with real activities
     const activitiesData = filteredActivities.slice(0, 20).map(activity => ({
        title: activity.title,
        description: activity.description,
        category: activity.category,
        subject: activity.subject,
        level: activity.level,
        format: activity.format,
        language: activity.language,
        organizer: activity.organizer,
        deadline: activity.deadline,
        teamSize: (activity as any).teamSize || (activity as any).team_size,
        location: (activity as any).location,
        prizes: (activity as any).prizes
      }))

    const prompt = `
      Пользователь предоставил следующую информацию:
      - Возраст: ${age}
      - Класс: ${grade}
      - Сфера интересов: ${interests}
      - Уровень английского: ${englishLevel}
      - Навыки написания эссе: ${essaySkills}

      Вот список доступных активностей из нашей базы данных:
      ${JSON.stringify(activitiesData, null, 2)}

      На основе информации о пользователе и списка доступных активностей, выбери 3-5 наиболее подходящих активностей.
      Для каждой выбранной активности объясни, почему она подходит пользователю.

      Ответ должен быть в формате JSON:
      {
        "recommendations": [
          {
            "title": "Точное название активности из списка",
            "description": "Описание из базы данных",
            "reason": "Почему эта конкретная активность подходит пользователю",
            "category": "Категория из базы данных",
            "level": "Уровень из базы данных",
            "format": "Формат из базы данных",
            "deadline": "Дедлайн из базы данных",
            "organizer": "Организатор из базы данных"
          }
        ]
      }
    `

    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        {
          role: 'system',
          content: 'Ты эксперт по образовательным программам и внеклассным активностям для школьников. Выбирай только из предоставленного списка активностей. Отвечай только на русском языке.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
    })

    const responseText = completion.choices[0].message.content
    
    try {
      const recommendations = JSON.parse(responseText || '{}')
      return Response.json(recommendations)
    } catch (parseError) {
      // Fallback with real activities if JSON parsing fails
      const fallbackRecommendations = filteredActivities.slice(0, 3).map(activity => ({
        title: activity.title,
        description: activity.description,
        reason: `Подходит для вашего возраста и интересов в области ${activity.subject}`,
        category: activity.category,
        level: activity.level,
        format: activity.format,
        deadline: activity.deadline,
        organizer: activity.organizer
      }))
      
      return Response.json({
        recommendations: fallbackRecommendations
      })
    }

  } catch (error) {
    console.error('Error getting recommendations:', error)
    return Response.json(
      { error: 'Ошибка при получении рекомендаций' },
      { status: 500 }
    )
  }
}