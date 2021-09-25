import { Switch, Route } from "react-router-dom";
import "./styles/css/App.css";
import Main from "./components/pages/Main";
import LikeKeywordSelect from "./components/pages/LikeKeywordSelect";
import HateKeywordSelect from "./components/pages/HateKeywordSelect";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Ranking from "./components/pages/Ranking";
import WishList from "./components/pages/Wishlist";
import Nav from "./components/layout/Nav";
import Content from "./components/layout/Content";
import ProductDetail from "./components/pages/ProductDetail";
import KeywordContainer from "./components/container/withKeyword";
import withAuth from "./components/container/withAuth";
import io from "socket.io-client";
import { useEffect } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

const socket = io.connect("http://localhost:5000");

function App() {
    return (
        <>
            <Route path="/" component={Nav} />
            <Content>
                <Switch>
                    <Route exact path="/" render={(props) => <Main {...props} socket={socket} />} />
                    <Route exact path="/login" component={Login}></Route>
                    <Route exact path="/register" component={Register}></Route>
                    <Route
                        exact
                        path="/likekeyword"
                        render={(props) => KeywordContainer(LikeKeywordSelect, props, socket)}
                    />
                    <Route
                        exact
                        path="/hatekeyword"
                        render={(props) => KeywordContainer(HateKeywordSelect, props, socket)}
                    />
                    <Route exact path="/ranking" render={(props) => KeywordContainer(Ranking, props, socket)} />
                    <Route path="/detail/:id" component={ProductDetail} />
                    <Route path="/cart" component={WishList} />
                </Switch>
            </Content>
        </>
    );
}

export default App;
