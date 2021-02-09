import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { removeLink } from "../../api";
import useApiError from "../../hooks/useApiError";
import Button from "../Button";

import "./LinkListItem.scss";

function LinkListItem({ link, onRemove }) {
  const [isCopied, setIsCopied] = useState(false);
  const { handleApiCall } = useApiError();

  async function handleClick() {
    await handleApiCall(() => removeLink(link.slug));
    // always remove slug from the list even if 404
    // (deleted on another tab but current tab has stale data)
    onRemove(link.slug);
  }

  function handleCopyClick() {
    setIsCopied(true);
  }

  useEffect(() => {
    let copyTimeout;
    if (isCopied) {
      copyTimeout = setTimeout(() => setIsCopied(false), 2000);
    }

    return () => {
      clearTimeout(copyTimeout);
    };
  }, [isCopied]);

  return (
    <li className="link-list-item" data-testid="link-list-item">
      <div className="link-list-item__url-wrapper">
        <span className="link-list-item__full-url">{link.url}</span>

        <div>
          <Button btnType="transparent" onClick={handleClick}>
            <img className="remove-icon" src="/images/trash.svg" alt="remove" />
          </Button>
        </div>
      </div>

      <div>
        <span className="link-list-item__short-url">{link.shortUrl}</span>

        <span className="link-list-item__copy">
          {isCopied ? (
            "Copied!"
          ) : (
            <CopyToClipboard text={link.shortUrl} onCopy={handleCopyClick}>
              <img
                data-testid="copy-short-url"
                className="icon-copy"
                src="/images/copy.svg"
                alt="copy"
              />
            </CopyToClipboard>
          )}
        </span>
      </div>
    </li>
  );
}

export default LinkListItem;
