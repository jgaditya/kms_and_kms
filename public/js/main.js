// Main application initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    const navigation = initNavigation();
    const background = initBackground();
    const experiences = initExperiences();
    const products = initProducts();
    const orders = initOrders();
    const weather = initWeather();
    
    // Weather search functionality
    document.getElementById('search-weather').addEventListener('click', () => {
        const city = document.getElementById('city-input').value;
        if (city) {
            weather.getWeatherByCity(city);
        }
    });
    
    // Load initial data
    experiences.loadExperiences();
    
    // Make modules available globally if needed
    window.App = {
        navigation,
        background,
        experiences,
        products,
        orders,
        weather
    };
});