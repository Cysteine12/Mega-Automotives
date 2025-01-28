const getBase64EncodedImage = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result.split(',')[1])
    reader.onerror = (err) => reject(err)
    reader.readAsDataURL(file)
  })
}

const renderBase64Image = ({ mimeType, data }) => {
  return `data:${mimeType};base64,${data}`
}

export { getBase64EncodedImage, renderBase64Image }
