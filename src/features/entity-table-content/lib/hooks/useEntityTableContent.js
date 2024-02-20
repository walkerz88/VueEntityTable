import { ref, computed, useSlots } from 'vue'

export const useEntityTableContent = ({ props, emit }) => {
  const slots = useSlots()

  const lastShiftSelectId = ref(null)

  const selectableRows = computed(() =>
    props.modelValue.filter((row) => row.selectable !== false)
  )

  const isSelectedAll = computed(() => {
    if (selectableRows.value.length === 0 || props.selectedRows.length === 0) {
      return false
    }

    return selectableRows.value.every((item) =>
      props.selectedRows.find(
        (row) => item[props.rowUniqueKey] === row[props.rowUniqueKey]
      )
    )
  })

  const selectCheckboxExist = computed(() => props.selectedRows !== undefined)

  const expandable = computed(() => props.expandedRows !== undefined)

  const totalCols = computed(() => {
    let count = props.descriptor.length

    if (selectCheckboxExist.value === true) {
      count += 1
    }

    if (props.editable === true) {
      count += 1
    }

    if (expandable.value === true) {
      count += 1
    }

    return count
  })

  const onChangeSelectedAll = (nextValue) => {
    const { selectedRows, rowUniqueKey } = props

    if (nextValue === true) {
      const prevRows = selectedRows.filter(
        (item) =>
          selectableRows.value.find(
            (row) => item[rowUniqueKey] === row[rowUniqueKey]
          ) === undefined
      )

      emit('update:selectedRows', [...prevRows, ...selectableRows.value])

      return
    }

    emit(
      'update:selectedRows',
      selectedRows.filter(
        (item) =>
          selectableRows.value.find(
            (row) => item[rowUniqueKey] === row[rowUniqueKey]
          ) === undefined
      )
    )
  }

  const onChangeSelectedRow = ({ event, row }) => {
    const { selectedRows, rowUniqueKey } = props
    const isSelected =
      selectedRows.find((item) => item[rowUniqueKey] === row[rowUniqueKey]) !==
      undefined
    const nextValue = !isSelected
    const prevShiftSelectId = lastShiftSelectId.value

    lastShiftSelectId.value = row[rowUniqueKey]

    if (event.shiftKey === true && prevShiftSelectId) {
      const startIndex = selectableRows.value.findIndex(
        (item) => item[rowUniqueKey] === prevShiftSelectId
      )
      const lastIndex = selectableRows.value.findIndex(
        (item) => item[rowUniqueKey] === row[rowUniqueKey]
      )
      const indexDiff = [startIndex, lastIndex].sort((a, b) => a - b)

      let result = [...selectedRows]

      for (let i = indexDiff[0]; i <= indexDiff[1]; i++) {
        const currentRow = selectableRows.value[i]

        result = result.filter(
          (item) => item[rowUniqueKey] !== currentRow[rowUniqueKey]
        )

        if (nextValue === true) {
          result = [...result, currentRow]
        }
      }

      emit('update:selectedRows', [...result])

      return
    }

    if (nextValue === true) {
      emit('update:selectedRows', [...selectedRows, row])

      return
    }

    emit(
      'update:selectedRows',
      selectedRows.filter((item) => item[rowUniqueKey] !== row[rowUniqueKey])
    )
  }

  const getColumnValue = ({ column, row }) => {
    const value = row[column.name]

    return column.dataTransform === undefined
      ? value
      : column.dataTransform({ row, column, value })
  }

  const isRowSelected = (row) => {
    const { selectedRows, rowUniqueKey } = props

    if (selectedRows === undefined) {
      return false
    }

    return (
      selectedRows.find((item) => item[rowUniqueKey] === row[rowUniqueKey]) !==
      undefined
    )
  }

  return {
    slots,
    selectableRows,
    isSelectedAll,
    selectCheckboxExist,
    expandable,
    totalCols,
    onChangeSelectedAll,
    onChangeSelectedRow,
    getColumnValue,
    isRowSelected
  }
}
