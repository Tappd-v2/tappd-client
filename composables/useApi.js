export function useApi() {
  const config = useRuntimeConfig()
  const apiGet = async (endpoint) => {
    const response = await fetch(`${config.public.apiBaseUrl}/${endpoint}`)
    return await response.json()
  }
  const apiPost = async (endpoint, data) => {
    const response = await fetch(`${config.public.apiBaseUrl}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return await response.json()
  }
  return {
    apiGet,
    apiPost,
  }
}
