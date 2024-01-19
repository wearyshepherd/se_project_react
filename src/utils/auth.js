import { checkResponse } from "./api";

const authBaseUrl =
  process.env.NODE_ENV === "production"
    ? "52.41.36.82
54.191.253.12
44.226.122.3"
    : "http://localhost:3001";

export const registerUser = ({ email, password, name, avatar }) => {
  return fetch(`${authBaseUrl}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, avatar }),
  }).then(checkResponse);
};

export const loginUser = ({ email, password }) => {
  return fetch(`${authBaseUrl}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const getUserInfo = (token) => {
  return fetch(`${authBaseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

export const editProfile = (name, avatar, token) => {
  return fetch(`${authBaseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(checkResponse);
};
