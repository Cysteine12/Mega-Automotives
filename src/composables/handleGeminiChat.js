import { getChatSession } from '@/libs/gemini'

const getGeminiChat = async (history, prompt) => {
  try {
    const chatSession = getChatSession(history)

    const res = await chatSession.sendMessage(prompt)

    return res.response.text()
  } catch (err) {
    console.error(err.message)
  }
}

export { getGeminiChat }
