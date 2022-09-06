import "./styles/css/App.css";
import io from "socket.io-client";
import DefaultRoutes from "./routes/DefaultRoutes";
import Content from "./components/layout/Content";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./redux/store";

const socket = io.connect("http://localhost:5000");
const persistor = persistStore(store);

function App() {
  return (
    <Content>
      <PersistGate loading={null} persistor={persistor}>
        <DefaultRoutes socket={socket} />
      </PersistGate>
    </Content>
  );
}

export default App;
