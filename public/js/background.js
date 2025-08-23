// Background image functionality
function initBackground() {
    // Array of Kerala background image URLs - using working Unsplash URLs
    const keralaBackgrounds = [
  "https://i.pinimg.com/1200x/25/5b/db/255bdb84cc4f6222c83d8d381c8a8b0f.jpg",
  "https://i.pinimg.com/1200x/52/67/79/5267799539d251fa6ee16470de28c1fd.jpg",
  "https://i.pinimg.com/736x/cf/47/32/cf473267e502a271bc214b0ef28c3f6e.jpg",
  "https://i.pinimg.com/1200x/ad/31/fb/ad31fb203d8c34e555e47fbe76e7af89.jpg",
  "https://i.pinimg.com/1200x/fc/b0/16/fcb0163f8a3714122a3c5cbdd0735be6.jpg",
  "https://i.pinimg.com/736x/5f/1c/1e/5f1c1ebe6b59f41f5cb10335e5f4c187.jpg"
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