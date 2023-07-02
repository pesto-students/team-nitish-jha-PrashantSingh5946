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

async function generateQuote(topic) {
  document.getElementById("results").innerHTML = loader;

  let request = fetch(
    "https://api.openai.com/v1/engines/text-davinci-003/completions",
    {
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
    }
  );

  try {
    let response = await request;

    console.log(response);

    let data = await response.json();

    console.log(data);

    document.getElementById("results").innerHTML = "";
    response = JSON.parse(data.choices[0].text);

    response.forEach((quote) => {
      let data = quote.trim();
      document.getElementById("results").innerHTML += `<p>${data}</p>`;
    });
  } catch (error) {
    console.log(error);
    document.getElementById("results").innerHTML = "";
  }
}

// Capitalize the first letter of a string
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
