export const debounce = (callback, ms) => {
  let timer = null

  return (props) => {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      callback(props)
    }, ms)
  }
}
