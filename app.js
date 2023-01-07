const tickerInput = document.querySelector("input");

const nameRes = document.querySelector("#name");
const priceRes = document.querySelector("#price");
const failureRes = document.querySelector("#fail");

failureRes.textContent = null;
nameRes.textContent = null;
priceRes.textContent = null;

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  axios
    .get(
      "https://financialmodelingprep.com/api/v3/quote/" +
        tickerInput.value.toUpperCase() +
        "?apikey=b8c495a52f0b8b43185f20eaaeefa031" // Free API so meh 🤷🏽‍♂️
    )
    .then((res) => {
      tickerInput.value = null;

      failureRes.textContent = null;
      nameRes.textContent = res.data[0].name;

      if (res.data[0].change < 0) {
        priceRes.style.color = "red";
        priceRes.textContent = `$` + res.data[0].price;
        priceRes.append(`  (` + res.data[0].changesPercentage + `%)    👇🏽`);
      } else {
        priceRes.style.color = "green";
        priceRes.textContent = `$` + res.data[0].price;
        priceRes.append(`  (` + res.data[0].changesPercentage + `%)    👆🏽`);
      }
    })
    .catch((err) => {
      nameRes.textContent = null;
      priceRes.textContent = null;
      failureRes.textContent = "Invalid Ticker Symbol ✋🏽";
    });
});
