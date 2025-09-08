export function useApi() {
   const config = useRuntimeConfig();
   const apiGet = async (endpoint, locationId = null) => {
      try {
         const url = locationId
            ? `${config.public.apiBaseUrl}/${locationId}/${endpoint}`
            : `${config.public.apiBaseUrl}/${endpoint}`;
         const response = await fetch(url, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
            },
            credentials: "include",
         });
         if (!response.ok) {
            if (response.status === 401) {
               // Unauthorized, return a specific object
               return { unauthorized: true };
            }
            throw new Error(`HTTP error! status: ${response.status}`);
         }
         return await response.json();
      } catch (error) {
         console.error(`Error fetching ${endpoint}`, error);
         return null;
      }
   };
   const apiPost = async (endpoint, data, locationId = null) => {
      try {
         const url = locationId
            ? `${config.public.apiBaseUrl}/${locationId}/${endpoint}`
            : `${config.public.apiBaseUrl}/${endpoint}`;
         const response = await fetch(url, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: data ? JSON.stringify(data) : undefined,
            credentials: "include",
         });
         if (!response.ok) {
            console.error('Response not ok:', response);
            if (response.status === 401) {
               return { unauthorized: true };
            }
            if(response.status === 400) {
               return await response.json(); // Return the error details from the response body
            }
            throw new Error(`HTTP error! status: ${response.status}`);
         }
         // some endpoints might return an empty body
         const text = await response.text();
         return text ? JSON.parse(text) : {};
      } catch (error) {
         console.error(`Error posting to ${endpoint}`, error);
         return null;
      }
   };
   const apiPatch = async (endpoint, data, locationId = null) => {
      try {
         const url = locationId
            ? `${config.public.apiBaseUrl}/${locationId}/${endpoint}`
            : `${config.public.apiBaseUrl}/${endpoint}`;
         const response = await fetch(url, {
            method: "PATCH",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
         });
         if (!response.ok) {
            if (response.status === 401) {
               return { unauthorized: true };
            }
            throw new Error(`HTTP error! status: ${response.status}`);
         }
         return await response.json();
      } catch (error) {
         console.error(`Error patching ${endpoint}`, error);
         return null;
      }
   };
   const getLocationName = async (locationId) => {
      const location = await apiGet(`locations/${locationId}`);
      return location ? location.name : null;
   };
   return {
      apiGet,
      apiPost,
      apiPatch,
      getLocationName,
   };
}
