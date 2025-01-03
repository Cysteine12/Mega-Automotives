const formatDate = (datetime) => {
  const newDate = new Date(datetime).toString()
  return newDate.substring(0, 10)
}

const formatTime = (datetime) => {
  const newDate = new Date(datetime).toString()
  return newDate.substring(16, 21)
}

export { formatDate, formatTime }
