//import Detail from "../shared/Detail";
import { useLocation } from "react-router";
import React from "react";
//import { TagCloud } from "react-tagcloud";
import { useEffect } from "react";
import axios from "axios";
function DetailPage({ match }) {
    // const location = useLocation();
    // const product = location.state.product;
    // const price = location.state.price;
    useEffect(() => {
        axios
            .get(`http://localhost:5000/product/detail/${match.params.id}`)
            .then((res) => console.log(res))
            .catch((e) => console.error(e));
    }, []);
    return <div className="List-container">{/* <Detail /> */}</div>;
}

export default DetailPage;
