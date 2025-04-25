// API Configuration
const DEV_API_URL = 'http://10.10.6.234:5000';  // For physical devices
const PROD_API_URL = 'http://10.10.6.234:5000'; // For physical devices

// Determine which API URL to use based on environment
const API_BASE_URL = __DEV__ ? DEV_API_URL : PROD_API_URL;

// Log the current API configuration
console.log('Current API Configuration:', {
  isDev: __DEV__,
  apiBaseUrl: API_BASE_URL,
  endpoints: {
    RESTAURANT_POST: `${API_BASE_URL}/api/restaurant/post`,
    RESTAURANT_ALL: `${API_BASE_URL}/api/restaurant/all`,
    RESTAURANT_MEAL: (mealId) => `${API_BASE_URL}/api/restaurant/${mealId}`,
    VOLUNTEER_TASKS: `${API_BASE_URL}/api/volunteer/tasks`,
    PENDING_TASKS: `${API_BASE_URL}/api/volunteer/pending-tasks`,
    ACCEPT_TASK: (taskId) => `${API_BASE_URL}/api/volunteer/tasks/${taskId}/accept`,
    CONFIRM_DELIVERY: (taskId) => `${API_BASE_URL}/api/volunteer/pending-tasks/${taskId}/confirm-delivery`,
    FARMER_FOOD_REQUESTS: `${API_BASE_URL}/api/farmer/food-requests`,
    FARMER_FOOD_REQUEST: (id) => `${API_BASE_URL}/api/farmer/food-requests/${id}`,
  }
});

export const API_ENDPOINTS = {
  RESTAURANT_POST: `${API_BASE_URL}/api/restaurant/post`,
  RESTAURANT_ALL: `${API_BASE_URL}/api/restaurant/all`,
  RESTAURANT_MEAL: (mealId) => `${API_BASE_URL}/api/restaurant/${mealId}`,
  VOLUNTEER_TASKS: `${API_BASE_URL}/api/volunteer/tasks`,
  PENDING_TASKS: `${API_BASE_URL}/api/volunteer/pending-tasks`,
  ACCEPT_TASK: (taskId) => `${API_BASE_URL}/api/volunteer/tasks/${taskId}/accept`,
  CONFIRM_DELIVERY: (taskId) => `${API_BASE_URL}/api/volunteer/pending-tasks/${taskId}/confirm-delivery`,
  FARMER_FOOD_REQUESTS: `${API_BASE_URL}/api/farmer/food-requests`,
  FARMER_FOOD_REQUEST: (id) => `${API_BASE_URL}/api/farmer/food-requests/${id}`,
};

// API Error handling
export const handleApiError = (error) => {
  console.error('API Error:', error);
  
  // Check if the error is a JSON parse error
  if (error instanceof SyntaxError && error.message.includes('JSON')) {
    console.error('JSON Parse Error - Server might be down or returning HTML');
    return { 
      message: 'Server connection error. Please check if the server is running.',
      details: error.message 
    };
  }

  if (error.response) {
    console.error('Response data:', error.response.data);
    console.error('Response status:', error.response.status);
    return error.response.data;
  } else if (error.request) {
    console.error('No response received:', error.request);
    return { 
      message: 'No response from server. Please check your internet connection.',
      details: error.request 
    };
  } else {
    console.error('Error setting up request:', error.message);
    return { 
      message: error.message || 'Error setting up request. Please try again.',
      details: error 
    };
  }
}; 