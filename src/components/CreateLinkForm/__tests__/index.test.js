import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import * as api from "../../../api";
import CreateLinkForm from "..";

describe("CreateLinkForm", () => {
  let onAddLink;
  beforeEach(() => {
    onAddLink = jest.fn();
  });

  describe("url and slug inputs", () => {
    class TestApiError extends Error {
      constructor(response) {
        super(response);
        this.response = response;
      }
    }

    it("displays the url in input and allows submit btn to be clicked", () => {
      const { getByTestId } = render(<CreateLinkForm />);

      const input = getByTestId("createLink");
      fireEvent.change(input, {
        target: {
          value: "http://blah.com",
        },
      });

      expect(getByTestId("createLink").value).toBe("http://blah.com");
      expect(getByTestId("button")).not.toBeDisabled();
    });

    it("displays the slug in input and submit btn is disabled", () => {
      const { getByTestId } = render(<CreateLinkForm />);

      const input = getByTestId("createSlug");
      fireEvent.change(input, {
        target: {
          value: "slug",
        },
      });

      expect(getByTestId("createSlug").value).toBe("slug");
      expect(getByTestId("button")).toBeDisabled();
    });

    it("displays errors from api", async () => {
      const apiError = {
        status: 422,
        data: {
          errors: {
            url: ["url cannot be blank"],
          },
        },
      };

      api.createLink = jest.fn(() =>
        Promise.reject(new TestApiError(apiError))
      );
      const onAddLink = jest.fn();
      const { getByTestId } = render(<CreateLinkForm onAddLink={onAddLink} />);

      const urlInput = getByTestId("createLink");
      fireEvent.change(urlInput, {
        target: {
          value: " ",
        },
      });
      fireEvent.click(getByTestId("button"));

      await waitFor(() => {
        expect(onAddLink).not.toHaveBeenCalled();
        expect(getByTestId("urlErrors").textContent).toBe(
          "url cannot be blank"
        );
      });
    });
  });

  describe("submit", () => {
    const createReturnValue = {
      url: "http://blah.com",
      short_url: "short.ly/blah",
      slug: "blah",
    };

    beforeEach(() => {
      api.createLink = jest.fn(() =>
        Promise.resolve({
          data: createReturnValue,
        })
      );
    });

    it("submits form successfully when url is filled", async () => {
      const onAddLink = jest.fn();
      const { getByTestId } = render(<CreateLinkForm onAddLink={onAddLink} />);

      const input = getByTestId("createLink");
      fireEvent.change(input, {
        target: {
          value: createReturnValue.url,
        },
      });
      fireEvent.click(getByTestId("button"));

      await waitFor(() => {
        expect(onAddLink).toHaveBeenCalledWith(createReturnValue);
      });
    });

    it("submits form successfully when url and slug is filled", async () => {
      const onAddLink = jest.fn();
      const { getByTestId } = render(<CreateLinkForm onAddLink={onAddLink} />);

      const urlInput = getByTestId("createLink");
      fireEvent.change(urlInput, {
        target: {
          value: createReturnValue.url,
        },
      });
      const slugInput = getByTestId("createSlug");
      fireEvent.change(slugInput, {
        target: {
          value: "slug",
        },
      });
      fireEvent.click(getByTestId("button"));

      await waitFor(() => {
        expect(onAddLink).toHaveBeenCalledWith(createReturnValue);
      });
    });
  });
});
