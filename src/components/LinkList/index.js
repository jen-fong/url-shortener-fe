import React from "react";
import LinkListItem from "./LinkListItem";

import "./index.scss";

function LinkList({ links, onRemoveLink }) {
  return (
    <ul className="link-list">
      {links.map((link) => {
        return (
          <LinkListItem key={link.slug} onRemove={onRemoveLink} link={link} />
        );
      })}
    </ul>
  );
}

export default LinkList;
