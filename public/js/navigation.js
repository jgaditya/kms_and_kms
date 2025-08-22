// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('nav a, .footer-column a');
    
    // Function to switch tabs
    function switchTab(tabName) {
        // Update nav links
        navLinks.forEach(link => {
            if (link.dataset.tab === tabName) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        // Update tab contents
        const tabContents = document.querySelectorAll('.tab-content');
        tabContents.forEach(content => {
            if (content.id === `${tabName}-tab`) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
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
    
    // Add event listeners to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab(link.dataset.tab);
        });
    });
    
    return { switchTab };
}