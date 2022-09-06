import "./styles/css/App.css";
import io from "socket.io-client";
import DefaultRoutes from "./routes/DefaultRoutes";
import Content from "./components/layout/Content";
import Nav from "./components/layout/Nav";

const socket = io.connect("http://localhost:5000");
// const socket = "socket";
function App() {
  return (
    <div>
      <Nav />
      <Content>
        <DefaultRoutes socket={socket} />
      </Content>
    </div>
  );
}

export default App;
