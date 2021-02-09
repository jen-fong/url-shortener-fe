import React, { useEffect, useState } from "react";
import CreateLinkForm from "./components/CreateLinkForm";
import LinkList from "./components/LinkList";
import { getLinks } from "./api";
import "./App.css";

function App() {
  const [links, setLinks] = useState([]);

  function handleLinkRemove(slug) {
    const updatedLinks = links.filter((link) => link.slug !== slug);
    setLinks(updatedLinks);
  }

  async function handleAddLink(link) {
    const updatedLinks = [link, ...links];
    setLinks(updatedLinks);
  }

  useEffect(() => {
    getLinks().then((res) => {
      setLinks(res.data);
    });
  }, []);

  return (
    <div className="app">
      <header>
        <h1>Url shortener</h1>
      </header>

      <main className="content">
        <CreateLinkForm onAddLink={handleAddLink} />
        <LinkList links={links} onRemoveLink={handleLinkRemove} />
      </main>
    </div>
  );
}

export default App;
