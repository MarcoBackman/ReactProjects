let {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/user',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true
        })
    );

    app.use(
        '/movie',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true
        })
    );

    app.use(
        '/credential',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true
        })
    );
};
