import DefaultRoutes from "./routes/DefaultRoutes";
import Content from "./layout/Content";
import Nav from "./layout/Nav";

function App() {
  return (
    <>
      <Nav />
      <Content>
        <DefaultRoutes />
      </Content>
    </>
  );
}

export default App;
