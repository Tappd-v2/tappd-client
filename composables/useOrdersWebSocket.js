import { ref, onBeforeUnmount } from 'vue'

export function useOrdersWebSocket(locationId, onOrderUpdate) {
  const config = useRuntimeConfig(); 
  const ws = ref(null)
  const reconnectTimeout = ref(null)

  const WS_URL = config.public.wsUrl || 'ws://localhost:3030/ws'
  const RECONNECT_DELAY = 2000

  function connect() {
    try {
      const socket = new WebSocket(WS_URL)
      ws.value = socket

      socket.onopen = () => {
        try {
          socket.send(JSON.stringify({ locationId }))
        } catch (err) {
          console.error('Failed to send locationId over ws', err)
        }
      }

      socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data)
          if (message.type === 'order_created' || message.type === 'order_updated') {
            onOrderUpdate(message.order, message.type)
          } else if (message.type === 'call_created' || message.type === 'call_updated') {
            // Forward call payloads using the same callback so callers can differentiate by messageType
            // Ensure payload looks valid before forwarding
            const call = message.callRequest
            if (call && call.id && call.state) {
              onOrderUpdate(call, message.type)
            } else {
              console.warn('Ignoring malformed call websocket message', message)
            }
          }
        } catch (err) {
          console.error('Failed to handle ws message', err)
        }
      }

      socket.onclose = () => {
        console.warn('Orders websocket closed, reconnecting in 2s')
        ws.value = null
        reconnectTimeout.value = setTimeout(() => connect(), RECONNECT_DELAY)
      }

      socket.onerror = (err) => {
        console.error('Orders websocket error', err)
        try { 
          socket.close() 
        } catch (e) {
          // Ignore close errors
        }
      }
    } catch (err) {
      console.error('Failed to connect websocket', err)
      reconnectTimeout.value = setTimeout(() => connect(), RECONNECT_DELAY)
    }
  }

  function disconnect() {
    if (ws.value) {
      try { 
        ws.value.close() 
      } catch (e) {
        // Ignore close errors
      }
      ws.value = null
    }
    if (reconnectTimeout.value) {
      clearTimeout(reconnectTimeout.value)
      reconnectTimeout.value = null
    }
  }

  // Auto-cleanup on component unmount
  onBeforeUnmount(disconnect)

  return {
    connect,
    disconnect,
    isConnected: () => ws.value?.readyState === WebSocket.OPEN
  }
}