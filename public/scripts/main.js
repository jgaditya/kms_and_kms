// Function to load HTML partials
async function loadPartial(id, file) {
    try {
        const response = await fetch(`partials/${file}`);
        const html = await response.text();
        document.getElementById(id).innerHTML = html;
    } catch (error) {
        console.error(`Error loading ${file}:`, error);
    }
}

// Load all partials
document.addEventListener('DOMContentLoaded', function() {
    // Load partials
    loadPartial('header-container', 'header.html');
    loadPartial('hero-container', 'hero.html');
    loadPartial('explorer-container', 'explorer.html');
    loadPartial('merchant-container', 'merchant.html');
    loadPartial('weather-container', 'weather.html');
    loadPartial('footer-container', 'footer.html');
    
    // Initialize the application after partials are loaded
    setTimeout(initApp, 100);
});

function initApp() {
    // Tab navigation
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const navLinks = document.querySelectorAll('nav a');
    
    // Function to switch tabs
    function switchTab(tabName) {
        // Update tab buttons
        tabBtns.forEach(btn => {
            if (btn.dataset.tab === tabName) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Update tab contents
        tabContents.forEach(content => {
            if (content.id === `${tabName}-tab`) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
        
        // Update nav links
        navLinks.forEach(link => {
            if (link.dataset.tab === tabName) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        // Load data if needed
        if (tabName === 'explorer') {
            loadExperiences();
        } else if (tabName === 'merchant') {
            loadProducts();
            loadOrders();
        } else if (tabName === 'weather') {
            // Default weather location - Thiruvananthapuram
            getWeatherByCity('Thiruvananthapuram');
        }
    }
    
    // Add event listeners to tab buttons
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            switchTab(btn.dataset.tab);
        });
    });
    
    // Add event listeners to nav links
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                switchTab(link.dataset.tab);
                
                // Scroll to content
                document.querySelector('.tabs').scrollIntoView({ behavior: 'smooth' });
            });
        });
    }
    
    // Weather search functionality
    document.getElementById('search-weather')?.addEventListener('click', () => {
        const city = document.getElementById('city-input').value;
        if (city) {
            getWeatherByCity(city);
        }
    });
    
    // Load initial data
    loadExperiences();
    
    // API Functions
    async function loadExperiences() {
        const container = document.getElementById('experiences-container');
        if (!container) return;
        
        container.innerHTML = '<div class="loading">Loading experiences...</div>';
        
        try {
            // Simulate API call with Kerala-specific experiences
            const experiences = [
                {
                    id: 1,
                    title: "Kathakali Performance Workshop",
                    description: "Learn the basics of Kathakali, the classical dance-drama of Kerala, from renowned artists.",
                    price: "₹1,500"
                },
                {
                    id: 2,
                    title: "Traditional Kerala Cooking Class",
                    description: "Master the art of authentic Kerala cuisine with a local family in their home.",
                    price: "₹2,000"
                },
                {
                    id: 3,
                    title: "Backwater Houseboat Cruise",
                    description: "Experience the serene backwaters of Alleppey on a traditional Kettuvallam.",
                    price: "₹5,000"
                },
                {
                    id: 4,
                    title: "Ayurvedic Wellness Retreat",
                    description: "Rejuvenate with traditional Ayurvedic treatments in a peaceful setting.",
                    price: "₹4,500"
                },
                {
                    id: 5,
                    title: "Theyyam Ritual Experience",
                    description: "Witness the sacred ritual dance of Northern Kerala with local explanations.",
                    price: "₹1,200"
                },
                {
                    id: 6,
                    title: "Coir Making Demonstration",
                    description: "Learn about the traditional process of coir making from coconut husks.",
                    price: "₹800"
                }
            ];
            
            if (experiences.length > 0) {
                container.innerHTML = '';
                experiences.forEach(exp => {
                    const card = createExperienceCard(exp);
                    container.appendChild(card);
                });
            } else {
                container.innerHTML = '<div class="error">No experiences found</div>';
            }
        } catch (error) {
            console.error('Error loading experiences:', error);
            container.innerHTML = '<div class="error">Failed to load experiences</div>';
        }
    }
    
    function createExperienceCard(experience) {
        const card = document.createElement('div');
        card.className = 'card';
        
        // Using Kerala-themed images
        const imageUrl = experience.title.includes('Kathakali') 
            ? 'https://images.unsplash.com/photo-1588416499018-d8c621b1b3cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            : experience.title.includes('Cooking')
            ? 'https://images.unsplash.com/photo-1585937421610-8da9a6c6d3e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            : experience.title.includes('Houseboat')
            ? 'https://images.unsplash.com/photo-1588416499018-d8c621b1b3cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            : 'https://images.unsplash.com/photo-1585937421610-8da9a6c6d3e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
        
        card.innerHTML = `
            <div class="card-img">
                <img src="${imageUrl}" alt="${experience.title}">
            </div>
            <div class="card-content">
                <h3>${experience.title}</h3>
                <p>${experience.description}</p>
                <div class="card-price">${experience.price} per person</div>
                <button class="btn">Book Now</button>
            </div>
        `;
        
        return card;
    }
    
    async function loadProducts() {
        const container = document.getElementById('products-container');
        if (!container) return;
        
        container.innerHTML = '<div class="loading">Loading products...</div>';
        
        try {
            // Simulate API call with Kerala-specific products
            const products = [
                {
                    id: 1,
                    name: "Kathakali Mask",
                    category: "crafts",
                    price: "₹2,500"
                },
                {
                    id: 2,
                    name: "Kerala Kasavu Saree",
                    category: "textiles",
                    price: "₹5,800"
                },
                {
                    id: 3,
                    name: "Coir Handicrafts",
                    category: "crafts",
                    price: "₹1,200"
                },
                {
                    id: 4,
                    name: "Traditional Uruli",
                    category: "metalwork",
                    price: "₹3,500"
                },
                {
                    id: 5,
                    name: "Aranmula Kannadi",
                    category: "metalwork",
                    price: "₹4,200"
                },
                {
                    id: 6,
                    name: "Spices Gift Box",
                    category: "food",
                    price: "₹1,800"
                }
            ];
            
            if (products.length > 0) {
                container.innerHTML = '';
                products.forEach(product => {
                    const card = createProductCard(product);
                    container.appendChild(card);
                });
            } else {
                container.innerHTML = '<div class="error">No products found</div>';
            }
        } catch (error) {
            console.error('Error loading products:', error);
            container.innerHTML = '<div class="error">Failed to load products</div>';
        }
    }
    
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'card';
        
        // Using Kerala-themed images
        const imageUrl = product.name.includes('Mask') 
            ? 'https://images.unsplash.com/photo-1611655336715-5ce4f5a5b1be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            : product.name.includes('Saree')
            ? 'https://images.unsplash.com/photo-1588416499018-d8c621b1b3cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            : 'https://images.unsplash.com/photo-1585937421610-8da9a6c6d3e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
        
        card.innerHTML = `
            <div class="card-img">
                <img src="${imageUrl}" alt="${product.name}">
            </div>
            <div class="card-content">
                <h3>${product.name}</h3>
                <p>Handcrafted ${product.category}</p>
                <div class="card-price">${product.price}</div>
                <button class="btn">Add to Cart</button>
            </div>
        `;
        
        return card;
    }
    
    async function loadOrders() {
        const container = document.getElementById('orders-container');
        if (!container) return;
        
        container.innerHTML = '<div class="loading">Loading orders...</div>';
        
        try {
            // Simulate API call with sample orders
            const orders = [
                {
                    id: "KL1234",
                    product: "Kasavu Saree",
                    status: "completed"
                },
                {
                    id: "KL5678",
                    product: "Spices Box",
                    status: "shipped"
                }
            ];
            
            if (orders.length > 0) {
                container.innerHTML = '';
                orders.forEach(order => {
                    const card = createOrderCard(order);
                    container.appendChild(card);
                });
            } else {
                container.innerHTML = '<div class="error">No orders found</div>';
            }
        } catch (error) {
            console.error('Error loading orders:', error);
            container.innerHTML = '<div class="error">Failed to load orders</div>';
        }
    }
    
    function createOrderCard(order) {
        const card = document.createElement('div');
        card.className = 'card';
        
        card.innerHTML = `
            <div class="card-content">
                <h3>Order #${order.id}</h3>
                <p>Product: ${order.product}</p>
                <p>Status: <span style="color: ${order.status === 'completed' ? '#4caf50' : '#ff9800'}">${order.status}</span></p>
                <button class="btn">View Details</button>
            </div>
        `;
        
        return card;
    }
    
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
}