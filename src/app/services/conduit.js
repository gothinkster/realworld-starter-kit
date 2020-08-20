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

export async function login(email, password) {
  const { data } = await Axios.post(`${baseUrl}/users/login`, {
    user: {
      email,
      password,
    },
  }).catch((x) => x.response);
  return data;
}

export async function getCurrentUser() {
  const {
    data: { user },
  } = await Axios.get(`${baseUrl}/user`, {
    headers: { Authorization: `Token ${localStorage.getItem('token')}` },
  });
  return user;
}

export async function updateSettings(settings) {
  const { data } = await Axios.put(
    `${baseUrl}/user`,
    { user: settings },
    {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` },
    },
  );
  return data;
}

export async function getUser(username) {
  const token = localStorage.getItem('token');
  const headers = token === null ? {} : { Authorization: `Token ${token}` };
  const {
    data: { profile },
  } = await Axios.get(`${baseUrl}/profiles/${username}`, {
    headers,
  });
  return profile;
}

export async function toggleFollowUser(follow, username) {
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Token ${token}` };
  const url = `${baseUrl}/profiles/${username}/follow`;

  const request = follow ? Axios.delete(url, { headers }) : Axios.post(url, {}, { headers });
  const {
    data: { profile },
  } = await request;

  return profile;
}
