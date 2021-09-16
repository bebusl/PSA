import Detail from "../shared/Detail";
import { useLocation } from "react-router";
import React from 'react'
import { TagCloud } from "react-tagcloud"

function DetailPage(props) {
  // const location = useLocation();
  // const product = location.state.product;
  // const price = location.state.price;


  return (
    <div className="List-container">
      
     <Detail />


    </div>
   
  );

}

export default DetailPage;