import React from "react";
import classNames from "classnames";

import "./index.scss";

function Button({ type, disabled, onChange, btnType, children }) {
  return (
    <button
      // Open bug so disable the rule for now
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={classNames("btn", `btn--${btnType}`, {
        "btn--disabled": disabled,
      })}
      onChange={onChange}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
