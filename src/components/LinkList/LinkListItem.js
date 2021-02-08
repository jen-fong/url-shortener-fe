import React from "react";
import { removeLink } from "../../api";
import useApiError from "../../hooks/useApiError";

function LinkListItem({ link, onRemove }) {
  const { handleApiCall } = useApiError();

  async function handleClick() {
    await handleApiCall(() => removeLink(link.slug));
    // always remove slug even 404
    // (deleted on another tab but current tab has stale data)
    onRemove(link.slug);
  }

  return (
    <li>
      <div>
        {link.url}
        {link.short_url}

        <div>
          <button type="button" onClick={handleClick}>
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}

export default LinkListItem;
