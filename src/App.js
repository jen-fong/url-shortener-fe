import React, { useEffect, useState } from "react";
import Form from "./components/Form";
import "./App.css";
import UrlList from "./components/UrlList";
import { getLinks, removeLink } from "./api";

function App() {
  const [links, setLinks] = useState([]);

  function handleRemove(slug) {
    removeLink(slug);
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
      <Form onAddLink={handleAddLink} />
      <UrlList links={links} onRemove={handleRemove} />
    </div>
  );
}

export default App;
