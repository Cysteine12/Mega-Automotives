import * as fileService from '@/services/fileService'

const handleFileChange = async (folder, file, currentFileUrl = null) => {
  if (!file) return null

  const paramsToSign = {
    eager: 'c_pad,h_300,w_400|c_crop,h_200,w_260',
    folder: `mega-automotives/${folder}`,
  }

  const res = currentFileUrl
    ? await fileService.updateFile(paramsToSign, file, currentFileUrl)
    : await fileService.uploadFile(paramsToSign, file)

  return res.data.url
}

export default handleFileChange
