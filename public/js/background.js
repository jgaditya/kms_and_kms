// Background image functionality
function initBackground() {
    // Array of Kerala background image URLs - using working Unsplash URLs
    const keralaBackgrounds = [
        'https://images.unsplash.com/photo-1588416499018-d8c621b1b3cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
        'https://images.unsplash.com/photo-1585937421610-8da9a6c6d3e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
        'https://images.unsplash.com/photo-1611655336715-5ce4f5a5b1be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
        'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80',
        'https://images.unsplash.com/photo-1598890772482-9b21c2a558c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80'
    ];

    // Function to set random background
    function setRandomBackground() {
        const heroSection = document.querySelector('.hero');
        
        // Remove any existing background divs
        const existingBackgrounds = document.querySelectorAll('.hero-bg');
        existingBackgrounds.forEach(bg => bg.remove());
        
        // Select a random image from the array
        const randomImageUrl = keralaBackgrounds[Math.floor(Math.random() * keralaBackgrounds.length)];
        
        // Create new background div
        const bgDiv = document.createElement('div');
        bgDiv.className = 'hero-bg active';
        bgDiv.style.backgroundImage = `url('${randomImageUrl}')`;
        
        // Insert the background at the beginning of the hero section
        heroSection.insertBefore(bgDiv, heroSection.firstChild);
    }

    // Set initial random background
    setRandomBackground();
    
    // Change background every 10 seconds (optional)
    setInterval(setRandomBackground, 10000);
    
    return { setRandomBackground };
}