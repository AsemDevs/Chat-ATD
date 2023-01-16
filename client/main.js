import './style.css'

import { API_KEY as apiKey } from './env';

const apiKey = process.env.API_KEY; // Replace with your own API key
const form = document.querySelector("#chat-form");
const responseEl = document.querySelector("#response");

form.addEventListener("submit", e => {
  e.preventDefault();
  const prompt = document.querySelector("#prompt").value;
  
  // Make the API request to ChatGPT
  fetch("https://api.openai.com/v1/engines/davinci/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    })
  })
  .then(response => response.json())
  .then(data => {
    // Display the response on the webpage
    const responseText = data.choices[0].text;
    responseEl.innerHTML = responseText;
  })
  .catch(error => {
    console.log(error);
    responseEl.innerHTML = "Error getting response from ChatGPT. Please try again.";
  });
});
