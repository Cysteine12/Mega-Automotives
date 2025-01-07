import { handleImageUpdate, handleImageUpload } from '@/services/imageService'

const handleFileChange = async (file, userId, currentFileUrl = null) => {
  if (!file) return null

  const paramsToSign = {
    eager: 'c_pad,h_300,w_400|c_crop,h_200,w_260',
    folder: `mega-automotives/users/${userId}`,
  }

  const res = currentFileUrl
    ? await handleImageUpdate(paramsToSign, file)
    : await handleImageUpload(paramsToSign, file)

  return res.data.url
}

export default handleFileChange
