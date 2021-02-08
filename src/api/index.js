import axios from "axios";

const baseURL = "https://api.bely.me";

const options = {
  headers: {
    "GB-Access-Token": process.env.REACT_APP_GB_ACCESS_TOKEN,
  },
};

export function getLinks() {
  const url = `${baseURL}/links`;
  return axios.get(url, options);
}

export function createLink(shortenedUrlData) {
  const apiUrl = `${baseURL}/links`;

  return axios.post(apiUrl, shortenedUrlData, options);
}

export function removeLink(slug) {
  const apiUrl = `${baseURL}/links/${slug}`;
  return axios.delete(apiUrl, options);
}
