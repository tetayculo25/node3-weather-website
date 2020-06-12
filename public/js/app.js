

const clima = (city) => {
  fetch(`http://localhost:3000/weather?address=${city}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        let main = document.querySelector(".main-content");
        let power = document.querySelector("#powerfull");
        let div = document.createElement("div");
        div.innerHTML = `
              
            <span>Descripcion: ${data.description}</span>
            <span>FeelsLike: ${data.feelslike}</span>
            <span>Location: ${data.location}</span>
            <span>Temperature: ${data.temperature}</span>              
        `;
        main.insertBefore(div, power);
      }
    });
  });
};

const city = document.querySelector("#city");
const weatherForm = document.querySelector("form");

weatherForm.addEventListener("submit", (e) => {
  if (city.value) {
    clima(city.value);
  } else console.log("ENTER A CITY!!!");

  city.value = "";
  e.preventDefault();
});
