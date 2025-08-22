// Products functionality
function initProducts() {
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
    
    // Using Kerala-themed images from Unsplash
    const imageUrl = product.name.includes('Mask') 
        ? 'https://images.unsplash.com/photo-1611655336715-5ce4f5a5b1be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        : product.name.includes('Saree')
        ? 'https://images.unsplash.com/photo-1598890772482-9b21c2a558c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
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
    
    return { loadProducts };
}