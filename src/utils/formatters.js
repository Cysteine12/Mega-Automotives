const formatDateIntl = (datetime) => {
  const newDate = new Date(datetime)

  const f = new Intl.DateTimeFormat('en-uk', {
    dateStyle: 'short',
    timeStyle: 'full',
  })

  return f.format(newDate).substring(0, 10)
}

const formatDate = (datetime) => {
  const newDate = new Date(datetime).toString()

  return newDate.substring(0, 10)
}

const formatTime = (datetime) => {
  const newDate = new Date(datetime).toString()

  return newDate.substring(16, 21)
}

export { formatDateIntl, formatDate, formatTime }
