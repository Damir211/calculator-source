const url = 'https://hookb.in/eK160jgYJ6UlaRPldJ1P';

function sendCalculatorForm(data) {
  return fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then((response) => response.json())
}

export { sendCalculatorForm };
