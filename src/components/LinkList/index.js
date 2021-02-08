import React from "react";
import LinkListItem from "./LinkListItem";

function LinkList({ links, onRemoveLink }) {
  return (
    <ul>
      {links.map((link) => {
        return (
          <LinkListItem key={link.slug} onRemove={onRemoveLink} link={link} />
        );
      })}
    </ul>
  );
}

export default LinkList;
