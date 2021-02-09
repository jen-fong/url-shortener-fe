import React from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import * as api from "../../../api";
import LinkListItem from "../LinkListItem";

describe("LinkListItem", () => {
  let onRemoveLink;
  let link;
  beforeEach(() => {
    onRemoveLink = jest.fn();
    link = {
      shortUrl: "short.ly/test",
      slug: "test",
      url: "test.com",
    };
  });

  it("displays short url and original url", () => {
    const { getByText } = render(
      <LinkListItem link={link} onRemove={onRemoveLink} />
    );

    expect(getByText(/test.com/i)).toBeTruthy();
    expect(getByText(/short.ly\/test/i)).toBeTruthy();
  });

  it("removes link when clicking remove button", async () => {
    api.removeLink = jest.fn(() => Promise.resolve({ data: [] }));
    const { getByTestId } = render(
      <LinkListItem link={link} onRemove={onRemoveLink} />
    );

    const btn = getByTestId("button");
    fireEvent.click(btn);

    await waitFor(() => {
      expect(api.removeLink).toHaveBeenCalledWith(link.slug);
      expect(onRemoveLink).toHaveBeenCalledWith(link.slug);
    });
  });

  describe("copy", () => {
    it("copies link and displays copied when user clicks copy icon", () => {
      window.prompt = () => {};
      const { queryByTestId } = render(
        <LinkListItem link={link} onRemove={onRemoveLink} />
      );

      const copy = queryByTestId("copy-short-url");
      fireEvent.click(copy);

      expect(queryByTestId("copy-short-url")).not.toBeInTheDocument();
    });

    it("resets to copy icon after a set period of time", async () => {
      jest.useFakeTimers();
      window.prompt = () => {};
      const { queryByTestId } = render(
        <LinkListItem link={link} onRemove={onRemoveLink} />
      );

      const copy = queryByTestId("copy-short-url");
      fireEvent.click(copy);

      expect(queryByTestId("copy-short-url")).not.toBeInTheDocument();

      act(() => {
        jest.runAllTimers();
      });

      expect(queryByTestId("copy-short-url")).toBeInTheDocument();
    });
  });
});
