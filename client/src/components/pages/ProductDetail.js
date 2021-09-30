import { useEffect, useState } from "react";
import axios from "axios";

const ProductDetail = ({ match }) => {
    const [isLoading, setLoading] = useState(true);
    console.log(match.params);
    useEffect(() => {
        axios
            .get(`http://localhost:5000/product/detail/${match.params.id}`)
            .then((res) => console.log(res))
            .catch((e) => console.error(e));
    }, []);

    return <h1>Only for Check</h1>;
};

export default ProductDetail;

/*
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
    return <div className="List-container">{ <Detail /> }</div>;
}

export default DetailPage;
 */
