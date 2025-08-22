// Weather functionality
function initWeather() {
    async function getWeatherByCity(city) {
        const currentContainer = document.getElementById('current-weather-container');
        const forecastContainer = document.getElementById('forecast-container');
        
        if (!currentContainer || !forecastContainer) return;
        
        currentContainer.innerHTML = '<div class="loading">Loading current weather...</div>';
        forecastContainer.innerHTML = '<div class="loading">Loading forecast...</div>';
        
        try {
            // Simulate weather API response for Kerala cities
            const weatherData = {
                temperature: 28,
                feelsLike: 32,
                humidity: 80,
                windSpeed: 3.5,
                description: "partly cloudy",
                city: city,
                country: "India"
            };
            
            currentContainer.innerHTML = createCurrentWeatherHTML(weatherData);
            
            // Simulate forecast data
            const forecastData = [
                { date: new Date(Date.now() + 86400000), temperature: 29, description: "Sunny" },
                { date: new Date(Date.now() + 172800000), temperature: 28, description: "Partly cloudy" },
                { date: new Date(Date.now() + 259200000), temperature: 27, description: "Light rain" },
                { date: new Date(Date.now() + 345600000), temperature: 28, description: "Cloudy" },
                { date: new Date(Date.now() + 432000000), temperature: 29, description: "Sunny" }
            ];
            
            forecastContainer.innerHTML = createForecastHTML(forecastData);
        } catch (error) {
            console.error('Error loading weather:', error);
            currentContainer.innerHTML = '<div class="error">Failed to load weather data</div>';
            forecastContainer.innerHTML = '<div class="error">Failed to load forecast</div>';
        }
    }
    
    function createCurrentWeatherHTML(data) {
        return `
            <div class="current-weather">
                <div>
                    <div class="temp">${Math.round(data.temperature)}°C</div>
                    <div class="weather-desc">${data.description}</div>
                </div>
                <div class="weather-icon">☀️</div>
                <div>
                    <div>Feels like: ${Math.round(data.feelsLike)}°C</div>
                    <div>Humidity: ${data.humidity}%</div>
                    <div>Wind: ${data.windSpeed} m/s</div>
                </div>
            </div>
            <div class="location">${data.city}, ${data.country}</div>
        `;
    }
    
    function createForecastHTML(forecastData) {
        if (!forecastData || forecastData.length === 0) {
            return '<div class="error">No forecast data available</div>';
        }
        
        let html = '<div class="weather-details">';
        
        forecastData.forEach(day => {
            html += `
                <div class="detail-item">
                    <div>${new Date(day.date).toLocaleDateString()}</div>
                    <div>${Math.round(day.temperature)}°C</div>
                    <div>${day.description}</div>
                </div>
            `;
        });
        
        html += '</div>';
        return html;
    }
    
    return { getWeatherByCity };
}