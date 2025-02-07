export const useDebounce = (callback, delay) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => callback.apply(null, args), delay)
  }
}
