import React from "react";
import { removeLink } from "../../api";
import useApiError from "../../hooks/useApiError";

function LinkList({ links, onRemove }) {
  const { handleApiCall } = useApiError();

  async function handleRemove(slug) {
    await handleApiCall(() => removeLink(slug));
    // always remove slug even 404
    // (deleted on another tab but current tab has stale data)
    onRemove(slug);
  }

  return (
    <ul>
      {links.map((link) => {
        return (
          <li key={link.slug}>
            <div>
              {link.url}
              {link.short_url}

              <div>
                <button type="button" onClick={() => handleRemove(link.slug)}>
                  Remove
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default LinkList;
