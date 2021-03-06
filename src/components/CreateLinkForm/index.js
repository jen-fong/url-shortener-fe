import React, { useState } from "react";
import classNames from "classnames";
import { createLink } from "../../api";
import useApiError from "../../hooks/useApiError";
import Button from "../Button";
import "./index.scss";

function CreateLinkForm({ onAddLink }) {
  const initialForm = {
    url: "",
    slug: "",
  };
  const [shortenedUrlForm, setShortenedUrlForm] = useState(initialForm);
  const { errors, handleApiCall, setErrors } = useApiError();

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
      setErrors({
        url: ["url is required"],
      });
    }

    const shortenedUrlData = {
      url: url.trim(),
    };

    if (slug) {
      shortenedUrlData.slug = slug.trim();
    }

    const data = await handleApiCall(() => createLink(shortenedUrlData));
    if (!data.error) {
      onAddLink(data);
      setShortenedUrlForm(initialForm);
      setErrors(null);
    }
  }

  return (
    <div>
      <form className="url-form" onSubmit={handleSubmit}>
        <div
          className={classNames("form-field", {
            error: errors && errors.url,
          })}
        >
          <label htmlFor="createLink">
            <span className="form-field__label">URL to shorten:</span>
            <input
              data-testid="createLink"
              onChange={handleChange}
              name="url"
              value={shortenedUrlForm.url}
              id="createLink"
              placeholder="URL to shorten (required)"
              type="text"
            />
          </label>

          <div className="error-message" data-testid="urlErrors">
            {errors && errors.url && errors.url.join(", ")}
          </div>
        </div>

        <div
          className={classNames("form-field", {
            error: errors && errors.slug,
          })}
        >
          <label htmlFor="createSlug">
            <span className="form-field__label">Slug:</span>
            <input
              data-testid="createSlug"
              onChange={handleChange}
              name="slug"
              value={shortenedUrlForm.slug}
              id="createSlug"
              placeholder="Slug"
              type="text"
            />
          </label>

          <div className="error-message" data-testid="slugErrors">
            {errors && errors.slug && errors.slug.join(", ")}
          </div>
        </div>

        <div className="url-form__actions">
          <Button
            disabled={!shortenedUrlForm.url}
            type="submit"
            onClick={handleSubmit}
            btnType="primary"
          >
            Create
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateLinkForm;
