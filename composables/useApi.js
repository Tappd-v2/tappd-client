export function useApi() {
  const config = useRuntimeConfig()
  const apiGet = async (endpoint, locationId = null) => {
    try{
      const url = locationId ? `${config.public.apiBaseUrl}/${locationId}/${endpoint}` : `${config.public.apiBaseUrl}/${endpoint}`
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json()
    } catch (error) {
      console.error(`Error fetching ${endpoint}`, error)
      return null
    }
  }
  const apiPost = async (endpoint, data, locationId = null) => {
    try{
      const url = locationId ? `${config.public.apiBaseUrl}${locationId}/${endpoint}` : `${config.public.apiBaseUrl}/${endpoint}`

      const response = await fetch( url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      return await response.json()
    } catch (error) {
      console.error(`Error posting to ${endpoint}`, error)
      return null
    }
  }
  return {
    apiGet,
    apiPost,
  }
}
