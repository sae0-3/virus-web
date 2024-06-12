const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://parsehub.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api/v2' // Reescribe la ruta para que coincida con la estructura de ParseHub
      }
    })
  );
};
