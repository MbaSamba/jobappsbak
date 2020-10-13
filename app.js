const app = require("./index");
const http = require("http");
require("dotenv").config();

const port = process.env.PORT || 3000;

app.set(port);

const server = http.createServer(app);

server.listen(port);
