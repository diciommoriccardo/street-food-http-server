var http = require("http");
var https = require("https");
var express = require('express');
var httpProxy = require("http-proxy");
var passport = require('passport');
var session = require('express-session');
const { TARGET_SERVER, SERVER } = require("./src/config/config.js");
const Mongo = require("./src/helpers/Mongo.js");
const authRoutes = require('./src/router/Auth.js');

require('./src/config/strategies/google');


const app = express();
const mongo = new Mongo();
const target = `http://${TARGET_SERVER.HOST}:${TARGET_SERVER.PORT}`;

var proxy = httpProxy.createProxyServer({
    secure: false,
    changeOrigin: true,
    target: target
});

require('./src/middlewares/Passport.js')(passport);
app.use(session({
    secret: SERVER.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(authRoutes);
app.all('/api/*', (req, res) => {
    proxy.web(req, res);
})

proxy.on('proxyReq', (proxyReq, req, res, options) => {
    proxyReq.setHeader('X-Special', 'Foobar');
});

app.listen(SERVER.PORT, () => {
    console.log("Proxy running on port: " + SERVER.PORT);
})

