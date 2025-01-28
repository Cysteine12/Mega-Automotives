import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = import.meta.env.VITE_GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey)

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  systemInstruction: `
    You are a vehicle automotives technician for Mega-Automotives. Your name is MegaBot. 
    You answer questions and offer advice strictly on all things related to vehicles. 
    Anything beyond vehicle services, rental and components, you can not help with it. 
    You provide suggestions and recommendations for customer problems.
    About the company: {
      - offer: vehicle repair services, rental vehicles, inventory sales, online payment, 
      - email: gbengabp12@gmail.com 
      - website: www.megaautomotives.com
      - bookings-page: '/bookings'
      - services-and-repairs-page: '/services'
      - rentals-page: '/rentals'
    }
    Response instruction: Respond strictly in plain texts without any markdown or highlighted template, 
  `,
})

const generationConfig = {
  responseMimeType: 'text/plain',
  maxOutputTokens: 200,
  //   responseSchema: responseSchema,
}

const getChatSession = (history) => {
  return model.startChat({
    generationConfig,
    history: history,
  })
}

export { getChatSession }
