import React from "react";
import { removeLink } from "../../api";
import useApiError from "../../hooks/useApiError";
import Button from "../Button";

import "./LinkListItem.scss";

function LinkListItem({ link, onRemove }) {
  const { handleApiCall } = useApiError();

  async function handleClick() {
    await handleApiCall(() => removeLink(link.slug));
    // always remove slug from the list even if 404
    // (deleted on another tab but current tab has stale data)
    onRemove(link.slug);
  }

  return (
    <li className="link-list-item" data-testid="link-list-item">
      <div className="link-list-item__url-wrapper">
        <span className="link-list-item__full-url">{link.url}</span>

        <div>
          <Button btnType="transparent" onClick={handleClick}>
            <img className="icon" src="/images/trash.svg" alt="remove" />
          </Button>
        </div>
      </div>

      <span className="link-list-item__short-url">{link.short_url}</span>
    </li>
  );
}

export default LinkListItem;
