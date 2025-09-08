// Order state constants
export const ORDER_STATES = {
  NEW: 'new',
  PENDING: 'pending',
  FULFILLED: 'fulfilled'
}

// Order state priority for sorting
const STATE_PRIORITY = {
  [ORDER_STATES.NEW]: 0,
  [ORDER_STATES.PENDING]: 1,
  [ORDER_STATES.FULFILLED]: 2
}

/**
 * Sort orders by state priority (new -> pending -> fulfilled)
 */
export function sortOrdersByState(orders) {
  return [...orders].sort((a, b) => 
    (STATE_PRIORITY[a.state] ?? 99) - (STATE_PRIORITY[b.state] ?? 99)
  )
}

/**
 * Get the next state in the order lifecycle
 */
export function getNextOrderState(currentState) {
  const states = Object.values(ORDER_STATES)
  const currentIndex = states.indexOf(currentState)
  const nextIndex = (currentIndex + 1) % states.length
  return states[nextIndex]
}

/**
 * Check if order should be expanded by default
 */
export function shouldExpandOrder(state) {
  return state === ORDER_STATES.NEW || state === ORDER_STATES.PENDING
}

/**
 * Get CSS classes for order status styling
 */
export function getOrderStatusClass(state, variant = 'base') {
  const colorMap = {
    [ORDER_STATES.NEW]: {
      base: 'bg-blue-500',
      dark: 'bg-blue-600',
      brighter: 'bg-blue-400'
    },
    [ORDER_STATES.PENDING]: {
      base: 'bg-orange-500',
      dark: 'bg-orange-600',
      brighter: 'bg-orange-400'
    },
    [ORDER_STATES.FULFILLED]: {
      base: 'bg-green-500',
      dark: 'bg-green-600',
      brighter: 'bg-green-400'
    }
  }
  
  return colorMap[state]?.[variant] || colorMap[ORDER_STATES.NEW].base
}

/**
 * Transform raw order data for UI display
 */
export function transformOrderForUI(order) {
  return {
    ...order,
    expanded: shouldExpandOrder(order.state),
    items: order.items || [],
    isNewFromWs: false
  }
}

/**
 * Apply incoming order update to orders list
 */
export function applyOrderUpdate(orders, orderData, isNewOrder = false) {
  const existingIndex = orders.findIndex(o => o.id === orderData.id)
  
  if (existingIndex !== -1) {
    // Update existing order
    orders[existingIndex] = {
      ...orders[existingIndex],
      ...orderData,
      items: orderData.items || orders[existingIndex].items,
      expanded: shouldExpandOrder(orderData.state)
    }
  } else {
    // Add new order
    const newOrder = {
      ...transformOrderForUI(orderData),
      isNewFromWs: isNewOrder
    }
    orders.unshift(newOrder)
    
    // Remove bounce animation after delay
    if (isNewOrder) {
      setTimeout(() => {
        const order = orders.find(o => o.id === orderData.id)
        if (order) {
          order.isNewFromWs = false
        }
      }, 3000)
    }
  }
  
  return sortOrdersByState(orders)
}