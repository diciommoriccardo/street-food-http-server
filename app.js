var http = require("http");
var https = require("https");
var express = require('express');
var httpProxy = require("http-proxy");
var passport = require('passport');
var session = require('express-session');
var cors = require('cors')
const cookieParser = require("cookie-parser");
const { TARGET_SERVER, SERVER } = require("./src/config/config.js");
const Mongo = require("./src/helpers/Mongo.js");
const authRoutes = require('./src/router/Auth.js');
const ifLoggedIn = require('./src/middlewares/isLogged.js');
const getCertificate = require('./src/utils/ssl/getCertificate.js')

require('./src/config/strategies/google');


const app = express();
const mongo = new Mongo();
const target = `http://${TARGET_SERVER.HOST}:${TARGET_SERVER.PORT}`;
const credentials = getCertificate();
console.log(credentials)

var proxy = httpProxy.createServer({
    secure: true,
    changeOrigin: true,
    target: target,
    ssl: getCertificate(),
});

console.log(proxy);


app.use(cors({ origin: "http://localhost:3000", credentials: true}));
app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret: SERVER.SESSION_SECRET,
    name: 'Session',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: true,
        maxAge: 10800,
        sameSite: "none"
    }
}));
require('./src/middlewares/Passport.js')(passport);

app.use(passport.initialize());
app.use(passport.session());

app.use(authRoutes);
app.all('/api/*', ifLoggedIn, (req, res) => {
    console.log(req)
    proxy.web(req, res);
})

proxy.on('proxyReq', (proxyReq, req, res, options) => {
    if (req.body) {
        const bodyData = JSON.stringify(req.body);
        proxyReq.setHeader('Content-Type','application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
    }
});


var httpsServer = https.createServer(credentials, app)
var httpServer = http.createServer(app)
httpsServer.listen(SERVER.PORT_SECURE);
httpServer.listen(SERVER.PORT);

