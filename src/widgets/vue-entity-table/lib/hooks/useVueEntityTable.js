import {
  ref,
  computed,
  inject,
  watch,
  useSlots,
  onMounted,
  onUnmounted
} from 'vue'

import { isEmptyValue } from '@/shared'

let abortController = new AbortController()

const getInitFilterValues = (filterDescriptor) => {
  if (isEmptyValue(filterDescriptor) === true) {
    return {}
  }

  return filterDescriptor.reduce((accum, item) => {
    return { ...accum, [item.name]: item.value }
  }, {})
}

export const useVueEntityTable = ({ props, emit }) => {
  const slots = useSlots()

  const stateTotal = ref(0)
  const stateOffset = ref(0)
  const stateLimit = ref(20)
  const isLoading = ref(false)
  const visibleColumns = ref(props.descriptor.map((item) => item.name))
  const filterValues = ref(getInitFilterValues(props.filterDescriptor))

  const sidebarActive = ref({
    filter: false,
    settings: false
  })

  const someSidebarActive = computed(() =>
    Object.keys(sidebarActive.value).some(
      (key) => sidebarActive.value[key] === true
    )
  )

  const showLoading = computed(() => {
    return isLoading.value === true || props.loading === true
  })

  const hasExpansionSlot = computed(() => !!slots.expansion)

  const hasFilter = computed(() => isEmptyValue(filterValues.value) === false)

  const filterIsDirty = computed(() => {
    if (hasFilter.value === false) {
      return false
    }

    return props.filterDescriptor.some(({ name, value }) => {
      if (Array.isArray(value) === true) {
        return String(value.sort()) !== String(filterValues.value[name].sort())
      }

      return value !== filterValues.value[name]
    })
  })

  const filterSubmitValues = computed(() => {
    if (isEmptyValue(filterValues.value) === true) {
      return {}
    }

    const { filterDescriptor } = props

    return filterDescriptor.reduce((accum, { name, submitTransformer }) => {
      const value = filterValues.value[name]

      if (isEmptyValue(value) === true) {
        return accum
      }

      return {
        ...accum,
        [name]:
          submitTransformer !== undefined
            ? submitTransformer({
                value,
                filterValues: filterValues.value,
                filterDescriptor
              })
            : value
      }
    }, {})
  })

  const hasSettings = computed(() => {
    return (
      props.descriptor &&
      props.descriptor.filter((item) => item.showInSettings !== false).length >
        0
    )
  })

  const closeAllSidebars = () => {
    for (let key in sidebarActive.value) {
      sidebarActive.value[key] = false
    }
  }

  const handleToggleSidebar = ({ key, value }) => {
    closeAllSidebars()

    sidebarActive.value[key] = value

    emit(`on-toggle-${key}`, value)
  }

  const handleUpdateSelectedRows = (data) => {
    emit('update:selectedRows', data)
  }

  const handleDropAllSelected = () => {
    handleUpdateSelectedRows([])
  }

  const handlePageChange = ({ page, rows }) => {
    if (stateLimit.value !== rows) {
      stateLimit.value = rows
      stateOffset.value = 0
    } else {
      stateOffset.value = stateLimit.value * page
    }

    handleUpdateData()
  }

  const onFetchData = async () => {
    abortController.abort()

    abortController = new AbortController()

    const payload = {
      limit: stateLimit.value,
      offset: stateOffset.value,
      filter: filterSubmitValues.value,
      sort: {
        key: 'id',
        direction: 'ASC'
      }
    }

    const options = { signal: abortController.signal }

    isLoading.value = true

    try {
      const { data, total } = await props.fetchDataFunction({
        payload,
        options
      })

      const transformedData = props.fetchDataTransformer(data)

      emit('update:modelValue', transformedData)

      stateTotal.value = total

      isLoading.value = false

      if (total > 0) {
        closeAllSidebars()
      }
    } catch (e) {
      if (e.isCancel !== true) {
        console.error(e)

        isLoading.value = false
      }
    }
  }

  const onUpdateExpandedRows = (value) => {
    emit('update:expandedRows', value)
  }

  const handleUpdateExpandedRows = ({ row, index }) => {
    if (props.expandedRows.includes(index)) {
      onUpdateExpandedRows(props.expandedRows.filter((i) => i !== index))

      emit('on-row-collapse', { row, index })

      return
    }

    onUpdateExpandedRows([...props.expandedRows, index])

    emit('on-row-expand', { row, index })
  }

  const handleUpdateData = () => {
    /* handleUpdateSelectedRows([]) */
    onUpdateExpandedRows([])

    if (props.fetchDataFunction === undefined) {
      return
    }

    onFetchData()
  }

  const handleSubmitFilter = () => {
    stateOffset.value = 0

    handleUpdateData()
  }
  
  onMounted(() => {
    handleUpdateData()
  })

  onUnmounted(() => {
    abortController.abort()
  })

  watch(() => props.fetchTrigger, handleUpdateData)

  return {
    showLoading,
    visibleColumns,
    hasExpansionSlot,
    stateTotal,
    stateLimit,
    stateOffset,
    slots,
    hasFilter,
    filterValues,
    filterIsDirty,
    hasSettings,
    sidebarActive,
    someSidebarActive,
    handleToggleSidebar,
    closeAllSidebars,
    handlePageChange,
    handleUpdateData,
    handleUpdateSelectedRows,
    handleDropAllSelected,
    handleUpdateExpandedRows,
    handleSubmitFilter
  }
}
