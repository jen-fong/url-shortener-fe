import React from "react";
import LinkListItem from "./LinkListItem";

import "./index.scss";

function LinkList({ links, onRemoveLink }) {
  return (
    <section>
      <header>
        <h2>My saved short urls</h2>
      </header>

      <ul className="link-list">
        {links.map((link) => {
          return (
            <LinkListItem key={link.slug} onRemove={onRemoveLink} link={link} />
          );
        })}
      </ul>
    </section>
  );
}

export default LinkList;
