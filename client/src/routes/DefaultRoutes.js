import { Routes, Route } from "react-router-dom";
import KeywordContainer from "../components/container/withKeyword";
import Cart from "../components/pages/Cart";
import CartDetail from "../components/pages/CartDetail";
import DetailPage from "../components/pages/DetailPage";
import HateKeywordSelect from "../components/pages/HateKeywordSelect";
import LikeKeywordSelect from "../components/pages/LikeKeywordSelect";
import Login from "../components/pages/Login";
import Main from "../components/pages/Main";
import Ranking from "../components/pages/Ranking";
import Register from "../components/pages/Register";

const DefaultRoutes = ({ socket }) => (
  <Routes>
    <Route path="/" index element={<Main socket={socket} />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/keyword" element={<Main socket={socket} />}>
      <Route
        path="like"
        element={KeywordContainer(LikeKeywordSelect, {}, socket)}
      />
      <Route
        path="hate"
        element={KeywordContainer(HateKeywordSelect, {}, socket)}
      />
    </Route>
    <Route path="/ranking" element={KeywordContainer(Ranking, {}, socket)} />
    <Route
      path="/detail/:id"
      element={KeywordContainer(DetailPage, {}, socket)}
    />
    <Route path="/cart" element={<Cart />} />
    <Route
      path="/wishlistdetail/:idx"
      element={KeywordContainer(CartDetail, {}, socket)}
    />
    {/* <Route
      exact
      path="/"
      render={(props) => <Main {...props} socket={socket} />}
    />
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
    <Route
      exact
      path="/ranking"
      render={(props) => KeywordContainer(Ranking, props, socket)}
    />

    <Route
      exact
      path="/detail/:id"
      render={(props) => KeywordContainer(DetailPage, props, socket)}
    />
    <Route exact path="/cart" component={Cart} />
    <Route
      exact
      path="/wishlistdetail/:idx"
      render={(props) => KeywordContainer(CartDetail, props, socket)}
    ></Route> */}
  </Routes>
);

export default DefaultRoutes;
