import "./styles/css/App.css";
import io from "socket.io-client";
import DefaultRoutes from "./routes/DefaultRoutes";
import Content from "./components/layout/Content";

const socket = io.connect("http://localhost:5000");

function App() {
  return (
    <Content>
      <DefaultRoutes socket={socket} />
    </Content>
  );
}

export default App;
