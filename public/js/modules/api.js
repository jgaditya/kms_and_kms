
// Base API URL - adjust based on your environment
const API_BASE_URL = window.location.origin + '/api';

// Generic fetch function with error handling
async function fetchData(url, options = {}) {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
}

// Authentication APIs
export const authAPI = {
    login: async (email, password) => {
        return await fetchData(`${API_BASE_URL}/login`, {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
    },

    signup: async (userData) => {
        return await fetchData(`${API_BASE_URL}/signup`, {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    },

    logout: async () => {
        return await fetchData(`${API_BASE_URL}/logout`, {
            method: 'POST'
        });
    },

    getCurrentUser: async () => {
        return await fetchData(`${API_BASE_URL}/me`);
    }
};

// Explorer APIs
export const explorerAPI = {
    getExperiences: async (filters = {}) => {
        const queryParams = new URLSearchParams(filters).toString();
        return await fetchData(`${API_BASE_URL}/experiences?${queryParams}`);
    },

    searchExperiences: async (query, filters = {}) => {
        const allFilters = { q: query, ...filters };
        const queryParams = new URLSearchParams(allFilters).toString();
        return await fetchData(`${API_BASE_URL}/experiences/search?${queryParams}`);
    },

    getExperience: async (id) => {
        return await fetchData(`${API_BASE_URL}/experiences/${id}`);
    },

    bookExperience: async (experienceId, bookingData) => {
        return await fetchData(`${API_BASE_URL}/experiences/${experienceId}/book`, {
            method: 'POST',
            body: JSON.stringify(bookingData)
        });
    },

    getBookings: async () => {
        return await fetchData(`${API_BASE_URL}/bookings`);
    },

    cancelBooking: async (bookingId) => {
        return await fetchData(`${API_BASE_URL}/bookings/${bookingId}/cancel`, {
            method: 'POST'
        });
    },

    addReview: async (experienceId, reviewData) => {
        return await fetchData(`${API_BASE_URL}/experiences/${experienceId}/reviews`, {
            method: 'POST',
            body: JSON.stringify(reviewData)
        });
    }
};

// Merchant APIs
export const merchantAPI = {
    getListings: async () => {
        return await fetchData(`${API_BASE_URL}/listings`);
    },

    createListing: async (listingData) => {
        return await fetchData(`${API_BASE_URL}/listings`, {
            method: 'POST',
            body: JSON.stringify(listingData)
        });
    },

    updateListing: async (id, listingData) => {
        return await fetchData(`${API_BASE_URL}/listings/${id}`, {
            method: 'PUT',
            body: JSON.stringify(listingData)
        });
    },

    deleteListing: async (id) => {
        return await fetchData(`${API_BASE_URL}/listings/${id}`, {
            method: 'DELETE'
        });
    },

    getOrders: async () => {
        return await fetchData(`${API_BASE_URL}/orders`);
    },

    updateOrderStatus: async (orderId, status) => {
        return await fetchData(`${API_BASE_URL}/orders/${orderId}`, {
            method: 'PATCH',
            body: JSON.stringify({ status })
        });
    },

    getSalesAnalytics: async (timeframe = 'monthly') => {
        return await fetchData(`${API_BASE_URL}/analytics/sales?timeframe=${timeframe}`);
    }
};

// WEATHER API - FULLY IMPLEMENTED
export const weatherAPI = {
  getCurrent: async (location) => {
    const params = new URLSearchParams();
    if (location.city) params.append('city', location.city);
    if (location.lat && location.lon) {
      params.append('lat', location.lat);
      params.append('lon', location.lon);
    }
    return await fetchData(`${API_BASE_URL}/weather/current?${params}`);
  },
  
  getForecast: async (location, days = 5) => {
    const params = new URLSearchParams();
    if (location.city) params.append('city', location.city);
    if (location.lat && location.lon) {
      params.append('lat', location.lat);
      params.append('lon', location.lon);
    }
    params.append('days', days);
    return await fetchData(`${API_BASE_URL}/weather/forecast?${params}`);
  }
};

// KSRTC API - PLACEHOLDER FOR FUTURE
export const ksrtcAPI = {
  getRoutes: async (from, to) => {
    // Return sample data for demo purposes
    return Promise.resolve({
      status: 'demo',
      message: 'KSRTC integration coming soon',
      routes: [
        { 
          id: 1, 
          from: from || 'Bangalore', 
          to: to || 'Mysore', 
          departure: '08:00 AM', 
          arrival: '10:30 AM',
          fare: 450,
          type: 'AC Sleeper'
        },
        { 
          id: 2, 
          from: from || 'Bangalore', 
          to: to || 'Mysore', 
          departure: '02:00 PM', 
          arrival: '04:30 PM',
          fare: 450,
          type: 'AC Sleeper'
        }
      ]
    });
  },
  
  getSchedule: async (routeId, date) => {
    return Promise.resolve({
      status: 'demo',
      message: 'KSRTC integration coming soon',
      schedule: []
    });
  },
  
  bookTicket: async (bookingData) => {
    return Promise.resolve({
      status: 'demo',
      message: 'KSRTC integration coming soon',
      booking: null
    });
  }
};

// PAYMENT API - PLACEHOLDER FOR FUTURE
export const paymentAPI = {
  createOrder: async (amount) => {
    // Simulate payment process for demo
    return Promise.resolve({
      id: 'demo_order_' + Date.now(),
      amount: amount,
      status: 'created',
      message: 'Payment integration coming soon'
    });
  },
  
  verifyPayment: async (orderId, paymentId, signature) => {
    return Promise.resolve({
      success: true,
      message: 'Payment verification simulated - integration coming soon'
    });
  }
};

// Utility function to set auth token in localStorage and API headers
export const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem('authToken', token);
        // The fetchData function will automatically include this in requests
    } else {
        localStorage.removeItem('authToken');
    }
};

// Utility function to get auth token
export const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

// Add authorization header to all requests if token exists
const originalFetch = window.fetch;
window.fetch = async function (...args) {
    const [url, options = {}] = args;
    const token = getAuthToken();
    
    if (token && typeof url === 'string' && url.startsWith(API_BASE_URL)) {
        options.headers = {
            ...options.headers,
            'Authorization': `Bearer ${token}`
        };
    }
    
    return originalFetch.call(this, url, options);
};           