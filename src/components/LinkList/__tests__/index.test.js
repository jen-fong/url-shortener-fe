import React from "react";
import { render } from "@testing-library/react";
import LinkList from "..";

describe("Links list", () => {
  it("displays a list of links", () => {
    const links = [
      {
        short_url: "short.ly/test",
        slug: "test",
        url: "test.com",
      },
      {
        short_url: "short.ly/aaa",
        slug: "aaa",
        url: "aaa.com",
      },
    ];
    const onRemoveLink = jest.fn();

    const { getAllByTestId } = render(
      <LinkList links={links} onRemoveLink={onRemoveLink} />
    );

    const linkItems = getAllByTestId("link-list-item");
    expect(linkItems).toHaveLength(2);
  });
});
