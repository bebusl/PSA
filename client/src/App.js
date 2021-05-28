import { Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/routes/Home";
import KeywordSelect from "./components/routes/KeywordSelect";
import RankingList from "./components/routes/RankingList";
import Nav from "./components/layout/Nav";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%
  }
	body {
		padding: 0;
    margin: 0;
  }
  #root {
    height: 100%;
  }
`;

const Content = styled.div`
  height: 80vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Nav></Nav>
      <Content>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/keyword" component={KeywordSelect} />
          <Route exact path="/ranking" component={RankingList} />
        </Switch>
      </Content>
    </>
  );
}

export default App;
