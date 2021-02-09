import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Button from "..";

describe("Button", () => {
  let handleClick;
  beforeEach(() => {
    handleClick = jest.fn();
  });

  it("is disabled when it has disabled prop", () => {
    const { getByText } = render(
      <Button disabled onClick={handleClick}>
        Click
      </Button>
    );

    expect(getByText("Click")).toBeDisabled();
  });

  it("fires onClick handler when clicked", () => {
    const { getByText } = render(<Button onClick={handleClick}>Click</Button>);
    const btn = getByText("Click");
    fireEvent.click(btn);

    expect(handleClick).toHaveBeenCalled();
  });

  it("has button style type", () => {
    const { getByText } = render(
      <Button btnType="primary" onClick={handleClick}>
        Click
      </Button>
    );

    expect(getByText("Click")).toHaveClass("btn--primary");
  });

  it("displays children from props", () => {
    const { getByText } = render(
      <Button btnType="primary" onClick={handleClick}>
        Click
      </Button>
    );

    expect(getByText("Click")).toBeTruthy();
  });
});
