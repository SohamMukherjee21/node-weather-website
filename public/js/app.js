console.log("Client side javascript loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const location = search.value;
  search.value = " ";

  messageOne.textContent = "Loading weather data.......";
  messageTwo.textContent = " ";

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.Error) {
        messageOne.textContent = data.Error;
      } else {
        console.log(data);
        messageOne.textContent = data.Location;
        messageTwo.textContent = data.Forecast;
      }
    });
  });
});
