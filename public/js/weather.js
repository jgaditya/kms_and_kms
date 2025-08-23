// Weather functionality
function initWeather() {
    const API_KEY = '2df253fa091266486999648b99c8442b'; // Replace with your OpenWeatherMap API key
    const currentContainer = document.getElementById('current-weather-container');
    const forecastContainer = document.getElementById('forecast-container');
    const searchButton = document.getElementById('search-weather');
    const cityInput = document.getElementById('city-input');
    
    // Initialize with a default Kerala city
    getWeatherByCity('Thiruvananthapuram');
    
    // Add event listeners
    if (searchButton && cityInput) {
        searchButton.addEventListener('click', handleWeatherSearch);
        cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleWeatherSearch();
        });
    }
    
    function handleWeatherSearch() {
        const city = cityInput.value.trim();
        if (city) {
            getWeatherByCity(city);
        }
    }
    
    async function getWeatherByCity(city) {
        if (!currentContainer || !forecastContainer) return;
        
        currentContainer.innerHTML = '<div class="loading">Loading current weather...</div>';
        forecastContainer.innerHTML = '<div class="loading">Loading forecast...</div>';
        
        try {
            // Get coordinates first for more accurate weather data
            const geoData = await getCityCoordinates(city);
            if (!geoData || geoData.length === 0) {
                throw new Error('City not found');
            }
            
            const { lat, lon, name, state, country } = geoData[0];
            const displayedCityName = name || city;
            
            // Fetch current weather and forecast in parallel
            const [currentWeather, forecast] = await Promise.all([
                getCurrentWeather(lat, lon),
                getWeatherForecast(lat, lon)
            ]);
            
            currentContainer.innerHTML = createCurrentWeatherHTML(currentWeather, displayedCityName, state, country);
            forecastContainer.innerHTML = createForecastHTML(forecast);
        } catch (error) {
            console.error('Error loading weather:', error);
            currentContainer.innerHTML = '<div class="error">Failed to load weather data: ' + error.message + '</div>';
            forecastContainer.innerHTML = '<div class="error">Failed to load forecast</div>';
        }
    }
    
    async function getCityCoordinates(city) {
        // Using OpenWeatherMap's Geocoding API
        const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${city},Kerala,IN&limit=1&appid=${API_KEY}`
        );
        
        if (!response.ok) {
            throw new Error('Failed to fetch city coordinates');
        }
        
        return await response.json();
    }
    
    async function getCurrentWeather(lat, lon) {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        
        if (!response.ok) {
            throw new Error('Failed to fetch current weather');
        }
        
        return await response.json();
    }
    
    async function getWeatherForecast(lat, lon) {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        
        if (!response.ok) {
            throw new Error('Failed to fetch weather forecast');
        }
        
        const data = await response.json();
        
        // Process to get one forecast per day (at 12:00)
        const dailyForecasts = [];
        const processedDays = new Set();
        
        data.list.forEach(item => {
            const date = new Date(item.dt * 1000);
            const dateString = date.toDateString();
            
            // Only take one reading per day (around noon)
            if (!processedDays.has(dateString) && date.getHours() >= 9 && date.getHours() <= 15) {
                dailyForecasts.push({
                    date: date,
                    temperature: item.main.temp,
                    description: item.weather[0].description,
                    icon: item.weather[0].icon
                });
                processedDays.add(dateString);
            }
        });
        
        return dailyForecasts.slice(0, 5); // Return next 5 days
    }
    
    function createCurrentWeatherHTML(data, city, state, country) {
        const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        
        return `
            <div class="current-weather">
                <div class="weather-main">
                    <div class="temp">${Math.round(data.main.temp)}°C</div>
                    <div class="weather-desc">${data.weather[0].description}</div>
                    <img src="${iconUrl}" alt="${data.weather[0].description}" class="weather-icon">
                </div>
                <div class="weather-details">
                    <div class="detail-item">
                        <span class="label">Feels like:</span>
                        <span class="value">${Math.round(data.main.feels_like)}°C</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Humidity:</span>
                        <span class="value">${data.main.humidity}%</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Wind:</span>
                        <span class="value">${data.wind.speed} m/s</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Pressure:</span>
                        <span class="value">${data.main.pressure} hPa</span>
                    </div>
                </div>
            </div>
            <div class="location">${city}${state ? ', ' + state : ''}, ${country}</div>
        `;
    }
    
    function createForecastHTML(forecastData) {
        if (!forecastData || forecastData.length === 0) {
            return '<div class="error">No forecast data available</div>';
        }
        
        let html = '<div class="forecast-container">';
        
        forecastData.forEach(day => {
            const iconUrl = `https://openweathermap.org/img/wn/${day.icon}@2x.png`;
            const dateStr = day.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
            
            html += `
                <div class="forecast-item">
                    <div class="forecast-date">${dateStr}</div>
                    <img src="${iconUrl}" alt="${day.description}" class="forecast-icon">
                    <div class="forecast-temp">${Math.round(day.temperature)}°C</div>
                    <div class="forecast-desc">${day.description}</div>
                </div>
            `;
        });
        
        html += '</div>';
        return html;
    }
}

// Initialize weather when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initWeather();
});