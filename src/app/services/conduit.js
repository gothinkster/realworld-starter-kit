import Axios from 'axios';

const baseUrl = 'https://conduit.productionready.io/api';

export async function getArticles(filter = {}) {
  const url =
    Object.keys(filter).length > 0
      ? `${baseUrl}/articles?${objectToQueryParams(filter)}`
      : `${baseUrl}/articles`;

  const { data } = await Axios.get(url);

  return data;
}

function objectToQueryParams(object) {
  return Object.entries(object)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
}

export async function getTags() {
  const {
    data: { tags },
  } = await Axios.get(`${baseUrl}/tags`);

  return tags;
}
