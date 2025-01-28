import { getChatSession } from '@/libs/gemini'
import { getBase64EncodedImage } from '@/utils/imageFormatter'

const getGeminiChat = async (history, prompt, file) => {
  try {
    if (file) {
      const base64EncodedImage = await getBase64EncodedImage(file)

      const image = {
        inlineData: {
          data: base64EncodedImage,
          mimeType: file.type,
        },
      }

      prompt = [prompt, image]
    }

    const chatSession = getChatSession(history)

    const res = await chatSession.sendMessage(prompt)

    return res.response.text()
  } catch (err) {
    console.error(err.message)
  }
}

export { getGeminiChat }
