const extractPublicId = (url) => {
  // Remove the base URL and transformations
  const parts = url.split('/')
  const index = parts.findIndex((part) => part === 'upload')

  // Ensure 'upload' exists in the URL
  if (index === -1) {
    console.error('Invalid Cloudinary URL')
    return null
  }

  // Ignore the 'v...' version number if present
  const publicIdParts = parts
    .slice(index + 1)
    .filter((part) => !part.startsWith('v') || isNaN(part.substring(1)))

  // Join the remaining parts and remove the file extension
  const publicIdWithExtension = publicIdParts.join('/')
  const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, '') // Remove extension

  return publicId
}

export default extractPublicId
