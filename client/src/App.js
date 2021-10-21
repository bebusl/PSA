import { Switch, Route } from "react-router-dom";
import "./styles/css/App.css";
import Main from "./components/pages/Main";
import LikeKeywordSelect from "./components/pages/LikeKeywordSelect";
import HateKeywordSelect from "./components/pages/HateKeywordSelect";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Ranking from "./components/pages/Ranking";
import DetailPage from "./components/pages/DetailPage";
import Cart from "./components/pages/Cart";
import ProductDetail from "./components/pages/ProductDetail";
import WishList from "./components/pages/Wishlist";
import Nav from "./components/layout/Nav";
import Content from "./components/layout/Content";
import KeywordContainer from "./components/container/withKeyword";
import io from "socket.io-client";

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
                    {/* <Route path="/detail/:id" render={(props) => KeywordContainer(ProductDetail, props, socket)} />
                    <Route path="/cart" component={WishList} /> */}
                    <Route exact path="/detail/:id" render={(props) => KeywordContainer(DetailPage, props, socket)} />
                    <Route exact path="/cart" component={Cart} />
                </Switch>
            </Content>
        </>
    );
}

export default App;
