// Array of Kerala background image URLs
const keralaBackgrounds = [
    'https://i.pinimg.com/1200x/25/5b/db/255bdb84cc4f6222c83d8d381c8a8b0f.jpg',
    'https://in.pinterest.com/pin/26599454041330287/',
    'https://in.pinterest.com/pin/47217496092056969/',
    'https://in.pinterest.com/pin/28710516369346039/',
    'https://in.pinterest.com/pin/598978819231557619/',
    'https://in.pinterest.com/pin/405394403979953630/'

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

// Set initial random background when page loads
document.addEventListener('DOMContentLoaded', function() {
    setRandomBackground();
    
    // Change background every 10 seconds (optional)
    setInterval(setRandomBackground, 10000);
});