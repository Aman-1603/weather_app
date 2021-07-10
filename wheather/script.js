let weather = {
    apiKey: "278fb750d83f407bac9442fe8a07ef4e",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey)
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity, pressure, feels_like, temp_max, temp_min } = data.main;
      const { speed } = data.wind;
      const { visibility } =data;
      const { country } =data.sys;
     
      document.querySelector(".city").innerText = "Weather in "+ name +"," + " " +country;
      document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".feels").innerText = "feels like : " + feels_like + "°C";
      document.querySelector(".max_temp").innerText = "max : " + temp_max + "°C";
      document.querySelector(".min_temp").innerText = "min : " + temp_min + "°C";
      document.querySelector(".humidity").innerText ="Humidity: " + humidity + "%";
        
      document.querySelector(".wind").innerText ="Wind speed: " + (speed/1.852).toPrecision(5) + " Knots/h";
      document.querySelector(".visib").innerText= "visibility : " + visibility;
      document.querySelector(".pressure").innerText = "pressure : " + pressure +"in";
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage ="url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document.querySelector(".search-bar").addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  weather.fetchWeather("Himatnagar");