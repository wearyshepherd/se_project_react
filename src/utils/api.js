const baseUrl = "http://localhost:3001";

const processServerResponce = (res) => {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }
  return res.json();
};

const getCards = () => {
  return fetch(`${baseUrl}/items`).then(processServerResponce);
};

const postCard = ({name, imageUrl, weather}) => {
  return fetch(`${baseUrl}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      imageUrl: imageUrl,
      weather: weather,
    })
  }).then(processServerResponce)
}

const deleteCard = (id) => {
  return fetch(`${baseUrl}/items/:${id}`, {
    method: 'DELETE',
  }).then(processServerResponce);
};

export { getCards, postCard, deleteCard };
