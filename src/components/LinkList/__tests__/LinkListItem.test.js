import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import * as api from "../../../api";
import LinkListItem from "../LinkListItem";

describe("LinkListItem", () => {
  let onRemoveLink;
  let link;
  beforeEach(() => {
    onRemoveLink = jest.fn();
    link = {
      short_url: "short.ly/test",
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
});
