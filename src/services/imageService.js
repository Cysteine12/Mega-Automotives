import { useToast } from 'vue-toastification'
import { useUserStore } from '@/stores/userStore'
import * as cloudinary from '@/libs/cloudinary'
import extractPublicId from '@/utils/extractPublicId'

const userStore = useUserStore()
const toast = useToast()

export const handleImageUpdate = async (paramsToSign, file, photoUrl) => {
  try {
    const res = await handleImageDelete(photoUrl)

    if (res.data.result !== 'ok') {
      toast.error(`Failed to update image: ${res.result}`)
      return
    }

    return await handleImageUpload(paramsToSign, file)
  } catch (err) {
    toast.error(`Failed to update image: ${err.message}`)
  }
}

export const handleImageDelete = async (photoUrl) => {
  try {
    let public_id = extractPublicId(photoUrl)
    if (!public_id) return

    let { data } = await userStore.generateSignature({
      public_id,
    })

    let formData = {
      public_id: public_id,
      signature: data.signature,
      api_key: data.api_key,
      timestamp: data.timestamp,
    }

    return await cloudinary.destroy(data.cloud_name, formData)
  } catch (err) {
    toast.error(`Failed to update image: ${err.message}`)
  }
}

export const handleImageUpload = async (paramsToSign, file) => {
  try {
    let { data } = await userStore.generateSignature({
      eager: paramsToSign.eager,
      folder: paramsToSign.folder,
    })

    let formData = new FormData()
    formData.append('file', file)
    formData.append('api_key', data.api_key)
    formData.append('timestamp', data.timestamp)
    formData.append('signature', data.signature)
    formData.append('eager', paramsToSign.eager)
    formData.append('folder', paramsToSign.folder)

    return await cloudinary.upload(data.cloud_name, formData)
  } catch (err) {
    toast.error(`Failed to update image: ${err.message}`)
  }
}
