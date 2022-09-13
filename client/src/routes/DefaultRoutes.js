import { Routes, Route } from "react-router-dom";
import Cart from "../pages/Cart";
import CartDetail from "../pages/CartDetail";
import DetailPage from "../pages/DetailPage";
import HateKeywordSelect from "../pages/HateKeywordSelect";
import LikeKeywordSelect from "../pages/LikeKeywordSelect";
import Login from "../pages/Login";
import Main from "../pages/Main";
import Ranking from "../pages/Ranking";
import Register from "../pages/Register";

const DefaultRoutes = ({ socket }) => (
  <Routes>
    <Route path="/" index element={<Main socket={socket} />} />
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="likekeyword" element={<LikeKeywordSelect />}></Route>
    <Route path="hatekeyword" element={<HateKeywordSelect />}></Route>
    <Route path="ranking" element={<Ranking />} />
    <Route path="detail/:id" element={<DetailPage />} />
    <Route path="cart" element={<Cart />} />
    <Route path="wishlistdetail/:idx" element={<CartDetail />} />
  </Routes>
);

export default DefaultRoutes;
