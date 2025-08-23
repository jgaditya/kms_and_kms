// Background slideshow functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.bg-slide');
    let currentSlide = 0;
    
    // Show first slide
    if (slides.length > 0) {
        slides[currentSlide].classList.add('active');
    }
    
    // Change slide every 5 seconds
    setInterval(() => {
        if (slides.length > 0) {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
    }, 5000);
    
    // Form validation and submission
    const signupBtn = document.getElementById('signup-btn');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const termsCheckbox = document.getElementById('terms');
    
    // Password strength indicator
    if (passwordInput) {
        passwordInput.addEventListener('input', checkPasswordStrength);
    }
    
    if (signupBtn) {
        signupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!validateForm()) {
                return;
            }
            
            // If validation passes, redirect to login page or dashboard
            // In a real application, you would send the data to a server here
            showSuccess('Account created successfully! Redirecting to login...');
            
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        });
    }
    
    // Function to validate the form
    function validateForm() {
        // Remove any existing error messages
        removeErrorMessages();
        
        let isValid = true;
        
        // Validate first name
        if (!firstNameInput.value.trim()) {
            showError(firstNameInput, 'First name is required');
            isValid = false;
        }
        
        // Validate last name
        if (!lastNameInput.value.trim()) {
            showError(lastNameInput, 'Last name is required');
            isValid = false;
        }
        
        // Validate email
        if (!emailInput.value.trim()) {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate password
        if (!passwordInput.value) {
            showError(passwordInput, 'Password is required');
            isValid = false;
        } else if (passwordInput.value.length < 8) {
            showError(passwordInput, 'Password must be at least 8 characters long');
            isValid = false;
        }
        
        // Validate confirm password
        if (passwordInput.value !== confirmPasswordInput.value) {
            showError(confirmPasswordInput, 'Passwords do not match');
            isValid = false;
        }
        
        // Validate terms agreement
        if (!termsCheckbox.checked) {
            showError(termsCheckbox, 'You must agree to the terms and conditions');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Function to show error message for a specific input
    function showError(input, message) {
        // Create error message element
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        // Add error message after the input
        input.parentNode.parentNode.appendChild(errorElement);
        
        // Highlight the input with error
        input.style.borderColor = '#e74c3c';
    }
    
    // Function to remove all error messages
    function removeErrorMessages() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
        
        // Reset input borders
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.style.borderColor = '#e9ecef';
        });
    }
    
    // Function to show success message
    function showSuccess(message) {
        // Remove any existing messages
        const existingMessage = document.querySelector('.success-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create success message element
        const successElement = document.createElement('div');
        successElement.className = 'success-message';
        successElement.textContent = message;
        
        // Insert success message above the form
        const formTitle = document.querySelector('.form-title');
        formTitle.parentNode.insertBefore(successElement, formTitle.nextSibling);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successElement.remove();
        }, 5000);
    }
    
    // Function to check password strength
    function checkPasswordStrength() {
        const password = passwordInput.value;
        const strengthMeter = document.querySelector('.strength-meter');
        const strengthText = document.querySelector('.strength-text');
        
        // Create strength meter if it doesn't exist
        if (!strengthMeter) {
            const strengthDiv = document.createElement('div');
            strengthDiv.className = 'password-strength';
            
            const meterDiv = document.createElement('div');
            meterDiv.className = 'strength-meter';
            
            const textDiv = document.createElement('div');
            textDiv.className = 'strength-text';
            
            strengthDiv.appendChild(meterDiv);
            strengthDiv.appendChild(textDiv);
            
            passwordInput.parentNode.parentNode.appendChild(strengthDiv);
        }
        
        // Calculate password strength
        let strength = 0;
        let text = '';
        let width = '0%';
        let className = '';
        
        if (password.length > 0) {
            // Length check
            if (password.length > 7) strength += 25;
            
            // Contains both lower and uppercase characters
            if (password.match(/([a-z].[A-Z])|([A-Z].[a-z])/)) strength += 25;
            
            // Contains numbers
            if (password.match(/([0-9])/)) strength += 25;
            
            // Contains special characters
            if (password.match(/([!,@,#,$,%,^,&,*,?,_,~])/)) strength += 25;
        }
        
        // Set appropriate text and width
        if (strength === 0) {
            text = '';
            width = '0%';
        } else if (strength < 50) {
            text = 'Weak';
            width = '33%';
            className = 'strength-weak';
        } else if (strength < 75) {
            text = 'Medium';
            width = '66%';
            className = 'strength-medium';
        } else {
            text = 'Strong';
            width = '100%';
            className = 'strength-strong';
        }
        
        // Update the strength meter
        const meter = document.querySelector('.strength-meter');
        const textElement = document.querySelector('.strength-text');
        
        meter.style.width = width;
        meter.className = 'strength-meter ' + className;
        textElement.textContent = text;
    }
    
    // Add Enter key support to form inputs
    const formInputs = document.querySelectorAll('input');
    formInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                signupBtn.click();
            }
        });
    });
});