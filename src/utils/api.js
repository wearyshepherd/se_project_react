const baseUrl = "http://localhost:3001";

const processServerResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }
  return res.json();
};

const getCards = () => {
  return fetch(`${baseUrl}/items`).then(processServerResponse);
};

const postCard = ({ name, imageUrl, weather }) => {
  return fetch(`${baseUrl}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      imageUrl: imageUrl,
      weather: weather,
    }),
  }).then(processServerResponse);
};

const deleteCard = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: 'DELETE',
  }).then(processServerResponse);
};

export { getCards, postCard, deleteCard };
