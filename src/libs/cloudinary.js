import axios from 'axios'

const upload = (cloud_name, formData) => {
  return axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`, formData)
}

const destroy = (cloud_name, formData) => {
  return axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/destroy`, formData)
}

export { upload, destroy }
