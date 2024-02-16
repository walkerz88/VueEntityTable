export const copyToClipboard = async (value) => {
  try {
    await navigator.clipboard.writeText(value)

    return true
  } catch (e) {
    throw new Error('Could not copy text')
  }
}
