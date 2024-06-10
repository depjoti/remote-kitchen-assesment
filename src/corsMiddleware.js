// corsMiddleware.js
module.exports = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins (use specific domains in production)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Pragma');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    
    next();
  };
  