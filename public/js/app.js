const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const firstMsg = document.querySelector("#firstMsg");
const secondMsg = document.querySelector("#secondMsg");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  firstMsg.textContent = "loading";
  secondMsg.textContent = "";

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        firstMsg.textContent = data.error;
      } else {
        firstMsg.textContent = data.location;
        secondMsg.textContent = data.forecast;
      }
    });
  });
});
