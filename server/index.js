const http = require("http");

const app = require("./app");
const User = require("./models/@main");

const { SERVER_PORT } = require("./env");

const server = http.createServer(app);

const io = require("socket.io")(server);

io.on("connection", function (socket) {
  console.log("connected");

  socket.on("disconnect", function () {
    console.log("disconnected");
  });
});

server.listen(+SERVER_PORT);
server.on("listening", () => {
  const addr = server.address();
  console.log(`Server running on ${addr.address}:${addr.port}`);
});
