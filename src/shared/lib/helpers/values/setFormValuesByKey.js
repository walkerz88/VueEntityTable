export const setFormValuesByKey = ({ formValues, data }) => {
  const dataKeys = Object.keys(data)

  dataKeys.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(formValues, key) === true) {
      formValues[key] = data[key]
    }
  })
}
