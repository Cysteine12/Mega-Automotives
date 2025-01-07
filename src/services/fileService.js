import { useToast } from 'vue-toastification'
import { useUserStore } from '@/stores/userStore'
import * as cloudinary from '@/libs/cloudinary'
import extractPublicId from '@/utils/extractPublicId'

const userStore = useUserStore()
const toast = useToast()

const updateFile = async (paramsToSign, file, currentFileUrl) => {
  try {
    const res = await deleteFile(currentFileUrl)

    if (res && res.data.result !== 'ok') {
      toast.error(`Failed to update file: ${res.result}`)
      return
    }

    return await uploadFile(paramsToSign, file)
  } catch (err) {
    toast.error(`Failed to update file: ${err.message}`)
  }
}

const uploadFile = async (paramsToSign, file) => {
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
    toast.error(`Failed to update file: ${err.message}`)
  }
}

const deleteFile = async (currentFileUrl) => {
  try {
    let public_id = extractPublicId(currentFileUrl)
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
    toast.error(`Failed to update file: ${err.message}`)
  }
}

export { updateFile, uploadFile, deleteFile }
