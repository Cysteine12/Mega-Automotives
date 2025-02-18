export const useThrottle = (callback, limit) => {
  let lastCallback
  let lastRan
  return (...args) => {
    if (!lastRan) {
      callback.apply(null, args)
      lastRan = Date.now()
    } else {
      clearTimeout(lastCallback)
      lastCallback = setTimeout(
        () => {
          if (Date.now() - lastRan >= limit) {
            callback.apply(null, args)
            lastRan = Date.now()
          }
        },
        limit - (Date.now() - lastRan),
      )
    }
  }
}
