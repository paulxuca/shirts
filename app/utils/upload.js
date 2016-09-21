import 'whatwg-fetch';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function uploadBase64File({ fileName, imageData }) {
  return new Promise((resolve, reject) => {
    fetch('/api/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageData,
        fileName,
      }),
    })
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => resolve(data))
    .catch((error) => reject({ error }));
  });
}

