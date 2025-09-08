import { ref } from 'vue'
import { useApi } from '~/composables/useApi'
import { transformOrderForUI, sortOrdersByState, getNextOrderState } from '~/utils/orderHelpers'

export function useOrdersApi(locationId) {
  const { apiGet, apiPatch } = useApi()
  const orders = ref([])
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

  return {
    orders,
    isLoading,
    error,
    fetchOrders,
    updateOrderState
  }
}