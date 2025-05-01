//corse configration

import cors from 'cors';


// Define the CORS configuration
const corsConfig = {
    origin: process.env.CORS_ORIGIN || '*',// Allow all origins by default
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}

// Export the CORS middleware function
export default cors(corsConfig);