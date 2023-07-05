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

let cache = {};

const handleFormSubmit = (event) => {
  event.preventDefault();
  let searchBox = event.target.children[0];
  let input = searchBox.value;
  searchBox.value = "";
  generateQuote(input);
};

async function generateQuote(topic) {
  document.getElementById("results").innerHTML = loader;

  try {
    let data = null;

    if (!cache.hasOwnProperty(topic)) {
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
      let response = await request;

      console.log(response);

      data = await response.json();

      cache[topic] = data;

      console.log(data);
    } else {
      data = cache[topic];
    }

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
