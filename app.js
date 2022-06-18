var http = require("http");
var https = require("https");
var express = require('express');
var httpProxy = require("http-proxy");
const { TARGET_SERVER, SERVER } = require("./src/config/config.js");
const Mongo = require("./src/helpers/Mongo.js");
const userRouter = require('./src/router/Auth.js');

const app = express();
const mongo = new Mongo();
const target = `http://${TARGET_SERVER.HOST}:${TARGET_SERVER.PORT}`;

var proxy = httpProxy.createProxyServer({
    secure: false,
    changeOrigin: true,
    target: target
});

app.use(userRouter);
app.all('/api/*', (req, res) => {
    proxy.web(req, res);
})

proxy.on('proxyReq', (proxyReq, req, res, options) => {
    proxyReq.setHeader('X-Special', 'Foobar');
});

app.listen(SERVER.PORT, () => {
    console.log("Proxy running on port: " + SERVER.PORT);
})

