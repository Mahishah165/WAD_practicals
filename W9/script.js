function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
  
    if (!city) {
      document.getElementById("result").innerHTML = "Please enter a city name.";
      return;
    }
  
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "weather.json", true);
    xhr.onload = function () {
      if (this.status === 200) {
        const data = JSON.parse(this.responseText);
        const weather = data[city];
  
        if (weather) {
          document.getElementById("result").innerHTML = `
            <strong>${city}</strong><br>
            Temperature: ${weather.temperature}<br>
            Humidity: ${weather.humidity}<br>
            Condition: ${weather.condition}
          `;
        } else {
          document.getElementById("result").innerHTML = `No data found for <strong>${city}</strong>.`;
        }
      } else {
        document.getElementById("result").innerHTML = "Failed to load weather data.";
      }
    };
    xhr.send();
  }
  