// Background slideshow functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.bg-slide');
    let currentSlide = 0;
    
    // Show first slide
    slides[currentSlide].classList.add('active');
    
    // Change slide every 5 seconds
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 5000);
    
    // Form validation and redirection
    const loginBtn = document.getElementById('login-btn');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Basic validation
        if (!emailInput.value || !passwordInput.value) {
            showError('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            showError('Please enter a valid email address');
            return;
        }
        
        // If validation passes, redirect to main page
        // In a real application, you would authenticate with a server here
        window.location.href = 'index.html';
    });
    
    // Function to show error message
    function showError(message) {
        // Remove any existing error messages
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Create error message element
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.cssText = `
            background: #ffebee;
            color: #c62828;
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 20px;
            text-align: center;
            font-size: 14px;
        `;
        errorElement.textContent = message;
        
        // Insert error message above the form
        const formTitle = document.querySelector('.form-title');
        formTitle.parentNode.insertBefore(errorElement, formTitle.nextSibling);
        
        // Remove error after 5 seconds
        setTimeout(() => {
            errorElement.remove();
        }, 5000);
    }
    
    // Add Enter key support
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            loginBtn.click();
        }
    });
});
