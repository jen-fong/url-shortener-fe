import React from "react";
import classNames from "classnames";

import "./index.scss";

function Button({ type, disabled, onClick, btnType, children }) {
  return (
    <button
      // Open bug so disable the rule for now
      // eslint-disable-next-line react/button-has-type
      type={type || "submit"}
      className={classNames("btn", `btn--${btnType}`, {
        "btn--disabled": disabled,
      })}
      onClick={onClick}
      disabled={disabled}
      data-testid="button"
    >
      {children}
    </button>
  );
}

export default Button;
