// api.js
const baseUrl = "http://localhost:3000";

const processServerResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }
  return res.json();
};

const request = (url, options) => {
  return fetch(url, options).then(processServerResponse);
};

const getCards = () => {
  return request(`${baseUrl}/items`);
};

const postCard = ({ name, imageUrl, weather }) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      imageUrl: imageUrl,
      weather: weather,
    }),
  };

  return request(`${baseUrl}/items`, options);
};

const deleteCard = (id) => {
  const deleteOptions = {
    method: "DELETE",
  };

  return request(`${baseUrl}/items/${id}`, deleteOptions);
};

export { getCards, postCard, deleteCard, processServerResponse };

