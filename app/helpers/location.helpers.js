import api from "../services/server";

const HOST =
  process.env.NEXT_PUBLIC_API_ENDPOINT_NODE_PRODUCTION_DASHBOARD
/**
 * Requests browser coordinates via navigator.geolocation and calls our
 * backend reverse geocoding endpoint (/location/reverse-geocode).
 *
 * @returns {Promise<{success: boolean, data?: {city: string, state: string, country: string}, attribution?: string, error?: string}>}
 */
export async function detectBrowserLocation() {
  if (typeof window === "undefined" || !("geolocation" in navigator)) {
    return {
      success: false,
      error: "Geolocation not supported by this browser.",
    };
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          let result;

          try {
            const response = await api.get("/location/reverse-geocode", {
              params: { lat: latitude, lng: longitude },
            });
            result = response.data;
          } catch (apiErr) {
            // Fallback to direct fetch in case of Axios interceptor issues
            const res = await fetch(
              `${HOST}/location/reverse-geocode?lat=${latitude}&lng=${longitude}`
            );
            if (!res.ok) {
              resolve({ success: false, error: `Server error: ${res.status}` });
              return;
            }
            result = await res.json();
          }

          if (
            result &&
            result.success &&
            result.data &&
            (result.data.city || result.data.country || result.data.state)
          ) {
            resolve({
              success: true,
              data: {
                city: result.data.city || "",
                state: result.data.state || "",
                country: result.data.country || "",
              },
              attribution:
                result.attribution ||
                "Location data © OpenStreetMap contributors",
            });
          } else {
            resolve({
              success: false,
              error: "Incomplete location extracted.",
            });
          }
        } catch (err) {
          resolve({
            success: false,
            error: err.message || "Failed to reverse geocode.",
          });
        }
      },
      (geoError) => {
        let errorMsg = "Geolocation permission denied or failed.";
        if (geoError.code === geoError.PERMISSION_DENIED) {
          errorMsg = "Location permission denied.";
        } else if (geoError.code === geoError.POSITION_UNAVAILABLE) {
          errorMsg = "Location information is unavailable.";
        } else if (geoError.code === geoError.TIMEOUT) {
          errorMsg = "Location request timed out.";
        }
        resolve({ success: false, error: errorMsg });
      },
      {
        timeout: 7000,
        maximumAge: 120000,
        enableHighAccuracy: false,
      }
    );
  });
}
