// useArticleDetail.js
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/ApiConfig";

const useArticleDetail = (articleId) => {
  const [articleDetail, setArticleDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticleDetail = async () => {
      try {
        console.log("Fetching article detail for articleId:", articleId);
        const response = await axios.get(
          `${BASE_URL}/api/v1/article/details/${articleId}`
        );
        setArticleDetail(response.data.data);
      } catch (error) {
        console.error("Error fetching article detail:", error);

        if (error.response) {
          setError(error.response.data.message || "An error occurred");
          console.error("Backend error message:", error.response.data.message);
        } else if (error.request) {
          setError("No response received from the server");
        } else {
          setError("An error occurred while setting up the request");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchArticleDetail();
  }, [articleId]);

  return { articleDetail, loading, error };
};

export default useArticleDetail;
