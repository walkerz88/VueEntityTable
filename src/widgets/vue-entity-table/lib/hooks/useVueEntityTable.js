import {
  ref,
  computed,
  watch,
  useSlots,
  onMounted,
  onUnmounted,
  nextTick
} from 'vue'

import { isEmptyValue, debounce } from '@/shared'

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
  const isSearchLoading = ref(false)
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

  const onFetchData = async () => {
    abortController.abort()

    abortController = new AbortController()

    const { sortKey, sortDirection } = props

    const payload = {
      limit: stateLimit.value,
      offset: stateOffset.value,
      filter: filterSubmitValues.value
    }

    if (isEmptyValue(sortKey) === false) {
      payload.sort = {
        key: sortKey,
        direction: sortDirection
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

  const dropBeforeFetch = () => {
    handleUpdateSelectedRows([])
    onUpdateExpandedRows([])
  }

  const handleUpdateData = () => {
    dropBeforeFetch()

    if (props.fetchDataFunction === undefined) {
      return
    }

    onFetchData()
  }

  const handleSubmitFilter = () => {
    stateOffset.value = 0

    handleUpdateData()
  }

  const onSearchData = async () => {
    dropBeforeFetch()

    if (props.search === '') {
      isSearchLoading.value = false

      onFetchData()

      return
    }

    abortController.abort()

    abortController = new AbortController()

    const payload = {
      query: props.search,
      limit: stateLimit.value,
      offset: stateOffset.value
    }

    const options = { signal: abortController.signal }

    isLoading.value = true

    try {
      const { data, total } = await props.searchDataFunction({
        payload,
        options
      })

      const transformedData = props.fetchDataTransformer(data)

      emit('update:modelValue', transformedData)

      stateTotal.value = total

      isSearchLoading.value = false
      isLoading.value = false

      if (total > 0) {
        closeAllSidebars()
      }
    } catch (e) {
      if (e.isCancel !== true) {
        console.error(e)

        isSearchLoading.value = false
        isLoading.value = false
      }
    }
  }

  const onSearch = debounce(onSearchData, 1000)

  const handleSearch = (value) => {
    isSearchLoading.value = true
    stateOffset.value = 0

    emit('update:search', value)

    onSearch()
  }

  const initFetchData = () => {
    if (props.search !== undefined && props.search !== '') {
      onSearchData()

      return
    }

    handleUpdateData()
  }

  const handlePageChange = ({ page, rows }) => {
    if (stateLimit.value !== rows) {
      stateLimit.value = rows
      stateOffset.value = 0
    } else {
      stateOffset.value = stateLimit.value * page
    }

    initFetchData()
  }

  const handleSort = async () => {
    await nextTick()

    if (isLoading.value === true) {
      return
    }

    initFetchData()
  }

  const handleUpdateSortKey = async (value) => {
    emit('update:sortKey', value)

    handleSort()
  }

  const handleUpdateSortDirection = (value) => {
    emit('update:sortDirection', value)

    handleSort()
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
    isSearchLoading,
    handleToggleSidebar,
    closeAllSidebars,
    handlePageChange,
    handleUpdateData,
    handleUpdateSelectedRows,
    handleDropAllSelected,
    handleUpdateExpandedRows,
    handleSubmitFilter,
    handleSearch,
    handleUpdateSortKey,
    handleUpdateSortDirection
  }
}
