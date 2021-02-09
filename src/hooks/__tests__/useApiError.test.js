import { waitFor } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";
import useApiError from "../useApiError";

describe("useApiError", () => {
  class TestApiError extends Error {
    constructor(response) {
      super(response);
      this.response = response;
    }
  }

  it("should set errors when there is an error from api", async () => {
    const { result } = renderHook(() => useApiError());
    const mockApiCall = jest.fn(() =>
      Promise.resolve({
        data: [],
        status: 200,
      })
    );

    result.current.handleApiCall(mockApiCall);

    await waitFor(() => {
      expect(result.current.statusCode).toBe(200);
      expect(result.current.errors).toBeNull();
    });
  });

  it("should just set status code when no errors", async () => {
    const { result } = renderHook(() => useApiError());
    const mockApiError = {
      data: {
        errors: {
          url: ["cannot be blank"],
        },
      },
      status: 400,
    };
    const mockApiCall = jest.fn(() =>
      Promise.reject(new TestApiError(mockApiError))
    );

    result.current.handleApiCall(mockApiCall);

    await waitFor(() => {
      expect(result.current.statusCode).toBe(mockApiError.status);
      expect(result.current.errors).toEqual(mockApiError.data.errors);
    });
  });
});
