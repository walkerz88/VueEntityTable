export const getHighlightText = ({ text, search }) => {
  if (!text) {
    return
  }

  if (!search) {
    return text
  }

  const regex = new RegExp(search, 'gi')

  // eslint-disable-next-line
  return text.replaceAll(regex, `<mark>\$&</mark>`)
}
