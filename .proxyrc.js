const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Proxy middleware for the /search endpoint
  app.use(
    '/search',
    createProxyMiddleware({
      target: 'https://api.genius.com',
      changeOrigin: true,
      pathRewrite: {
        '^/search': '/search', // Remove '/search' from the request path
      },
    })
  );

  // Proxy middleware for the /songs endpoint
  app.use(
    '/songs',
    createProxyMiddleware({
      target: 'https://api.genius.com',
      changeOrigin: true,
      pathRewrite: {
        '^/songs': '/songs', // Remove '/songs' from the request path
      },
    })
  );
};