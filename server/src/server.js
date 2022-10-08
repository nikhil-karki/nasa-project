// starting our server this way using built in http server allows us to not only respond to http request but also to other type of connections for eg web socket for real time communication.

// express is just a middleware that we add on top of built in http

const http = require("http");
const app = require("./app");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log("Listening on PORT", PORT);
});
