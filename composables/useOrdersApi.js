import { ref } from 'vue'
import { useApi } from '~/composables/useApi'
import { transformOrderForUI, sortOrdersByState, getNextOrderState } from '~/utils/orderHelpers'

export function useOrdersApi(locationId) {
  const { apiGet, apiPatch } = useApi()
  const orders = ref([])
  const tableRequests = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  /**
   * Fetch all orders for the location
   */
  async function fetchOrders() {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await apiGet(`orders?locationId=${locationId}`)
      const transformedOrders = response.map(transformOrderForUI)
      orders.value = sortOrdersByState(transformedOrders)
      return orders.value
    } catch (err) {
      error.value = err
      console.error('Failed to fetch orders:', err)
      return []
    } finally {
      isLoading.value = false
    }
  }

  async function fetchTableRequest() {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await apiGet(`${locationId}/tables/requests?state=new,pending`)
      // store table call requests locally for UI
      tableRequests.value = (response || []).map(r => ({
        ...r,
        // ensure there's a table object for display - fall back to tableId-based label
        table: r.table || { id: r.tableId, name: `Tafel ${r.tableId}` },
        expanded: false,
        isNewFromWs: false
      }))
      return tableRequests.value
    } catch (err) {
      error.value = err
      console.error('Failed to fetch table requests:', err)
      return []
    } finally {
      isLoading.value = false
    }
  }


  /**
   * Update order state to next state in lifecycle
   */
  async function updateOrderState(order) {
    const newState = getNextOrderState(order.state)
    
    try {
      const response = await apiPatch(`orders/${order.id}/state`, {
        state: newState
      })

      if (response && !response.unauthorized) {
        // Update local state
        order.state = newState
        order.expanded = newState === 'new' || newState === 'pending'
        
        // Re-sort orders after state change
        orders.value = sortOrdersByState(orders.value)
        return true
      } else {
        console.error('Failed to update order state - unauthorized or error response')
        return false
      }
    } catch (err) {
      console.error('Error updating order state:', err)
      return false
    }
  }

  // Advance a table call request to its next state and update local list
  async function updateTableRequestState(request) {
    const newState = getNextOrderState(request.state)

    try {
      const response = await apiPatch(`${locationId}/tables/requests/${request.id}/state`, {
        state: newState
      })

      if (response && !response.unauthorized) {
        // If the new state is not visible, remove the request from local list
        const isVisibleState = newState === 'new' || newState === 'pending'
        if (!isVisibleState) {
          tableRequests.value = tableRequests.value.filter(r => r.id !== request.id)
        } else {
          tableRequests.value = tableRequests.value.map(r => {
            if (r.id === request.id) {
              return {
                ...r,
                state: newState,
                expanded: false,
                isNewFromWs: false
              }
            }
            return r
          })
        }
        return true
      } else {
        console.error('Failed to update table request state - unauthorized or error response')
        return false
      }
    } catch (err) {
      console.error('Error updating table request state:', err)
      return false
    }
  }

  return {
    orders,
    tableRequests,
    isLoading,
    error,
    fetchOrders,
    fetchTableRequest,
    updateOrderState,
    updateTableRequestState
  }
}