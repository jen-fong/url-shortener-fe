import { useState } from "react";

function useApiError() {
  const [statusCode, setStatusCode] = useState(null);
  const [errors, setErrors] = useState(null);

  async function handleApiCall(api) {
    try {
      const res = await api();
      setStatusCode(res.status);
      return res.data;
    } catch (err) {
      const { response } = err;

      setStatusCode(response.status);
      const hasErrors = response.data;
      if (hasErrors) {
        setErrors(response.data.errors);
      }
      return { error: true };
    }
  }

  return { statusCode, errors, handleApiCall, setErrors };
}

export default useApiError;
