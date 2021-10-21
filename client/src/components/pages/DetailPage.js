import Detail from "../shared/Detail";
import { useLocation } from "react-router";
import React from "react";
import { TagCloud } from "react-tagcloud";
import { useEffect, useState } from "react";
import axios from "axios";

function DetailPage({ match, productlists }) {
    // const location = useLocation();
    // const product = location.state.product;
    // const price = location.state.price;
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/product/detail/${match.params.id}`)
            .then((res) => {
                setData(res.data.data);
            })
            .catch((e) => console.error(e));
    }, []);

    return (
        <div className="List-container">{data.length !== 0 && <Detail pdata={data} productdata={productlists} />}</div>
    );
}

export default DetailPage;
