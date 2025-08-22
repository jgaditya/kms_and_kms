// Orders functionality
function initOrders() {
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
    
    return { loadOrders };
}