const apiKey = '98eff692dca84cf0824120938242106';

function getWeather() {
    const city = document.getElementById('city').value;
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = document.getElementById('weather-info');
            weatherInfo.innerHTML = `
                <h2 class="text-center mb-4">Weather forecast for ${data.location.name}, ${data.location.country}</h2>
                <div class="row">
                ${data.forecast.forecastday.map(day => `
                    <div class="col-md-4">
                        <div class="card weather-card mb-4">
                            <div class="card-body text-center">
                                <h5 class="card-title">${day.date}</h5>
                                <img src="${day.day.condition.icon}" alt="Weather Icon">
                                <p class="weather-info"><strong>Condition:</strong> ${day.day.condition.text}</p>
                                <p class="weather-info"><strong>Temperature:</strong> ${day.day.avgtemp_c} °C</p>
                                <p class="weather-info"><strong>Pressure:</strong> ${day.day.avgvis_km} kPa</p>
                                <p class="weather-info"><strong>Wind:</strong> ${day.day.maxwind_kph} kph</p>
                                <p class="weather-info"><strong>Precipitation:</strong> ${day.day.totalprecip_mm} mm</p>
                            </div>
                        </div>
                    </div>
                `).join('')}
                </div>
            `;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather-info').innerHTML = '<p class="text-danger text-center">Failed to fetch weather data. Please try again.</p>';
        });
}

