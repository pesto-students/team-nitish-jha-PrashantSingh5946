let loader = `<div class="center">
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
  <div class="wave"></div>
</div>`;

const handleFormSubmit = (event) => {
  event.preventDefault();
  let searchBox = event.target.children[0];
  let input = searchBox.value;
  searchBox.value = "";
  generateQuote(input);
};

function generateQuote(topic) {
  document.getElementById("results").innerHTML = loader;

  fetch("https://api.openai.com/v1/engines/text-davinci-003/completions", {
    method: "POST",
    headers: {
      Authorization:
        "Bearer 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",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: `give me 5 quotes on ${topic} in the form of json array only containing the quotes`,
      max_tokens: 2000,
      n: 1,
      stop: null,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    }),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      document.getElementById("results").innerHTML = "";
      let response = JSON.parse(data.choices[0].text);

      response.forEach((quote) => {
        let data = quote.trim();
        document.getElementById("results").innerHTML += `<p>${data}</p>`;
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Capitalize the first letter of a string
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
