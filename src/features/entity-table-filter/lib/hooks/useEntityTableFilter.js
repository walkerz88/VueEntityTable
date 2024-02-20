export const useEntityTableFilter = ({ props, emit }) => {
  const generateId = (name) => `filter-field-${name}`

  const handleChange = ({ name, value }) => {
    console.log(value)
    emit('update:modelValue', { ...props.modelValue, [name]: value })
  }

  const handleDrop = () => {
    const initialValues = props.filterDescriptor.reduce(
      (accum, { name, value }) => {
        return {
          ...accum,
          [name]: value
        }
      },
      {}
    )

    emit('update:modelValue', initialValues)
    emit('on-submit')
  }

  const handleSubmit = () => {
    emit('on-submit')
  }

  return { generateId, handleChange, handleDrop, handleSubmit }
}
