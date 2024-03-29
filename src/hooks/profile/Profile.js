import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/ApiConfig";

const useProfileApi = () => {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Get the token from sessionStorage
        const token = sessionStorage.getItem("token");

        if (!token) {
          throw new Error("No token found");
        }

        // Set Authorization header
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Make the API request to get user profile using POST method
        const response = await axios.post(
          `${BASE_URL}/api/v1/user/get-profile`,
          null, // Pass null as the request body since it's a GET request
          { headers }
        );

        // Update the state with the profile data
        setProfileData(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);

        if (error.response) {
          // The request was made, but the server responded with a status code
          // that falls out of the range of 2xx
          setError(error.response.data.message || "An error occurred");
          console.error("Backend error message:", error.response.data.message);
        } else if (error.request) {
          // The request was made but no response was received
          setError("No response received from the server");
        } else {
          // Something happened in setting up the request that triggered an Error
          setError("An error occurred while setting up the request");
        }

        setIsLoading(false);
      }
    };

    // Call the fetchProfile function
    fetchProfile();
  }, []); // Only run the effect once when the component mounts

  return { profileData, isLoading, error };
};

export default useProfileApi;
