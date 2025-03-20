function toggleDropdown() {
    let dropdownMenu = document.getElementById("myDropdown");
    dropdownMenu.style.display = (dropdownMenu.style.display === "block") ? "none" : "block";
}


const items = document.querySelector(".items")
const openMenu = document.querySelector(".openMenu")
const closeMenu = document.querySelector(".closeMenu")

openMenu.addEventListener("click", ()=>{
  items.style.display = "flex"
  items.style.top = "0"
})

closeMenu.addEventListener("click", ()=>{
  items.style.top = "-100%"
})



const apiKey = "e8db22f930ec6e6db2a3d2d77046ce19"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")


async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`)
    


    if(response.status == 404){
        document.querySelector(".error").style.display = "flex"
        document.querySelector(".weather").style.display = "none"
    }else{
        let data = await response.json()

        document.querySelector(".city").innerHTML = data.name
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp)  + "°C"
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%"
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h"

        if(data.weather[0].main == "Clear"){
            weatherIcon.innerHTML = `<div class="icon sunny">
            <div class="sun">
              <div class="rays"></div>
            </div>
          </div>`
        }else if(data.weather[0].main == "Clouds"){
            weatherIcon.innerHTML = `<div class="icon cloudy">
            <div class="cloud"></div>
            <div class="cloud"></div>
          </div>`
        }else if(data.weather[0].main == "Rain"){
            weatherIcon.innerHTML = `<div class="icon rainy">
            <div class="cloud"></div>
            <div class="rain"></div>
          </div>`
        }else if(data.weather[0].main == "Drizzle"){
            weatherIcon.innerHTML = `<div class="icon sun-shower">
            <div class="cloud"></div>
            <div class="sun">
              <div class="rays"></div>
            </div>
            <div class="rain"></div>
          </div>`
        }else if(data.weather[0].main == "Mist"){
            weatherIcon.innerHTML = `<div class="icon cloudy">
            <div class="cloud"></div>
            <div class="cloud"></div>
          </div>`
        }

        document.querySelector(".error").style.display = "none"
        document.querySelector(".weather").style.display = "flex"
    }

}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value)
})



function updateLocalStorage() {
  const list = document.querySelector(".list");
  localStorage.setItem("savedDiv", list.innerHTML);
}

const addButton = document.querySelector(".add");
addButton.addEventListener("click", () => {
  const weather = document.querySelector(".weather");
  const clonedDiv = weather.cloneNode(true);

  const removeButton = clonedDiv.querySelector(".add");
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", () => {
    clonedDiv.remove();
    updateLocalStorage();
  });

  document.querySelector(".list").appendChild(clonedDiv);
  updateLocalStorage();
});

document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector(".list");
  list.innerHTML = localStorage.getItem("savedDiv") || "";

  removeButton = document.querySelector(".list button")
  removeButton.addEventListener("click", ()=>{
    list.innerHTML = ""
    updateLocalStorage();
  })
});

document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector(".list");
  list.innerHTML = localStorage.getItem("savedDiv") || "";

  removeButton = document.querySelector(".list button")
  removeButton.addEventListener("click", ()=>{
    list.innerHTML = ""
    updateLocalStorage();
  })
});



