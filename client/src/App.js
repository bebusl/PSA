import io from "socket.io-client";
import DefaultRoutes from "./routes/DefaultRoutes";
import Content from "./layout/Content";
import Nav from "./layout/Nav";

const socket = io("http://localhost:7000");

if (socket.connected === true) {
  console.log("socket connected", socket.connected);
  socket.emit("send message", (...args) => {
    console.log("받음", args);
  });
  socket.on("keywords", (...args) => {
    console.log("받음", args);
  });
} else {
  socket.connect();
  console.log("2", socket);
  socket.emit("send message");
  socket.on("keywords", (...args) => {
    console.log("받음", args);
  });
  console.log("3");
}

function App() {
  return (
    <>
      <Nav />
      <Content>
        <DefaultRoutes socket={socket} />
      </Content>
    </>
  );
}

export default App;
