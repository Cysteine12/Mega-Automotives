import { getChatSession } from '@/libs/gemini'

const getGeminiChat = async (history, prompt) => {
  const chatSession = getChatSession(history)

  const res = await chatSession.sendMessage(prompt)

  return res.response.text()
}

export { getGeminiChat }
