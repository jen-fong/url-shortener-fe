import React, { useState } from "react";
import { createLink } from "../../api";
import useApi from "../../hooks/useApiError";
import "./index.css";

function Form({ onAddLink }) {
  const initialForm = {
    url: "",
    slug: "",
  };
  const [shortenedUrlForm, setShortenedUrlForm] = useState(initialForm);
  const { errors, handleApiCall, setErrors } = useApi();

  function handleChange(e) {
    setShortenedUrlForm({
      ...shortenedUrlForm,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { url, slug } = shortenedUrlForm;

    if (!url) {
      console.log("error, required");
    }

    const shortenedUrlData = {
      url,
    };

    if (!slug) {
      shortenedUrlForm.slug = slug;
    }
    const data = await handleApiCall(() => createLink(shortenedUrlData));
    if (!data.error) {
      onAddLink(data);
      setShortenedUrlForm(initialForm);
    }
  }

  return (
    <div className="url-form">
      <form onSubmit={handleSubmit}>
        {errors && errors.url && "error url here"}
        <input
          onChange={handleChange}
          name="url"
          value={shortenedUrlForm.url}
        />
        {errors && errors.slug && "error slug here"}
        <input
          onChange={handleChange}
          name="slug"
          value={shortenedUrlForm.slug}
        />

        <button
          disabled={!shortenedUrlForm.url}
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
