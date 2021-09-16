import { Switch, Route } from "react-router-dom";
import "./styles/css/App.css";
import Main from "./components/pages/Main";
import LikeKeywordSelect from "./components/pages/LikeKeywordSelect";
import HateKeywordSelect from "./components/pages/HateKeywordSelect";
import Ranking from "./components/pages/Ranking";
import Nav from "./components/layout/Nav";
import Content from "./components/layout/Content";
import KeywordContainer from "./components/container/KeywordContainer";
<<<<<<< HEAD
import DetailPage from "./components/pages/DetailPage";
import Cart from "./components/pages/Cart";
=======
>>>>>>> bcb639ec2c59d4a05ab7e3a878b7ec9a2464a4a4
// import Home from "./post-components/routes/Home";
// import KeywordSelect from "./post-components/routes/KeywordSelect";
// import RankingList from "./post-components/routes/RankingList";
// import Nav from "./post-components/layout/Nav";
// import styled, { createGlobalStyle } from "styled-components";

function App() {
  return (
    <>
      <Nav></Nav>
      <Content>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route
            exact
            path="/likekeyword"
            component={KeywordContainer(LikeKeywordSelect)}
          />
          <Route
            exact
            path="/hatekeyword"
            component={KeywordContainer(HateKeywordSelect)}
          />
          <Route exact path="/ranking" component={KeywordContainer(Ranking)} />
<<<<<<< HEAD
          <Route exact path="/detail" component={DetailPage} />
          <Route exact path="/cart" component={Cart} />
=======
>>>>>>> bcb639ec2c59d4a05ab7e3a878b7ec9a2464a4a4
        </Switch>
      </Content>
    </>
  );
}

export default App;
