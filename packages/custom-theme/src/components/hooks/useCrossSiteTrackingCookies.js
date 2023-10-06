import { useEffect, useState } from "react";

function useCrossSiteTrackingCookies() {
  const [crossSiteTrackingEnabled, setCrossSiteTrackingEnabled] =
    useState(null);

  useEffect(() => {
    const checkCrossSiteTracking = () => {
      try {
        // Set a test cookie with the SameSite attribute set to "None"
        document.cookie = "crossSiteTestCookie=1; samesite=None; secure";

        // Check if the test cookie can be retrieved
        const cookieValue =
          document.cookie.indexOf("crossSiteTestCookie=") !== -1;

        // Clean up the test cookie
        document.cookie =
          "crossSiteTestCookie=; expires=Thu, 01 Jan 1970 00:00:00 GMT; samesite=None; secure";

        // Update state based on the result
        setCrossSiteTrackingEnabled(cookieValue);
      } catch (error) {
        // An error occurred while trying to set the cookie (likely due to SameSite restrictions)
        setCrossSiteTrackingEnabled(false);
      }
    };

    checkCrossSiteTracking();

    return () => {
      // Clean up by removing the test cookie when the component unmounts
      document.cookie =
        "crossSiteTestCookie=; expires=Thu, 01 Jan 1970 00:00:00 GMT; samesite=None; secure";
    };
  }, []);

  return crossSiteTrackingEnabled;
}

export default useCrossSiteTrackingCookies;
