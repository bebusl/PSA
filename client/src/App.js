import { Switch, Route } from "react-router-dom";
import "./styles/css/App.css";
import Main from "./components/pages/Main";
import LikeKeywordSelect from "./components/pages/LikeKeywordSelect";
import HateKeywordSelect from "./components/pages/HateKeywordSelect";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Ranking from "./components/pages/Ranking";
import Nav from "./components/layout/Nav";
import Content from "./components/layout/Content";
import KeywordContainer from "./components/container/withKeyword";
import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");

function App() {
    return (
        <>
            <Nav></Nav>
            <Content>
                <Switch>
                    <Route exact path="/" render={(props) => <Main {...props} socket={socket} />} />
                    <Route exact path="/login" component={Login}></Route>
                    <Route exact path="/register" component={Register}></Route>
                    <Route exact path="/likekeyword" component={KeywordContainer(LikeKeywordSelect)} />
                    <Route exact path="/hatekeyword" component={KeywordContainer(HateKeywordSelect)} />
                    <Route exact path="/ranking" component={KeywordContainer(Ranking)} />
                </Switch>
            </Content>
        </>
    );
}

export default App;
