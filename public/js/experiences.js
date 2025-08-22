// Experiences functionality
function initExperiences() {
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
    
    // Using Kerala-themed images from Unsplash
    const imageUrl = experience.title.includes('Kathakali') 
        ? 'https://images.unsplash.com/photo-1588416499018-d8c621b1b3cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        : experience.title.includes('Cooking')
        ? 'https://images.unsplash.com/photo-1585937421610-8da9a6c6d3e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        : experience.title.includes('Houseboat')
        ? 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        : 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    
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
    
    return { loadExperiences };
}