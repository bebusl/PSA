//import React from "react";
import "./Detail.css";
import { TagCloud } from "react-tagcloud";
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useScript } from "../../hooks";
import styled from "styled-components";

function Detail({ product, price, productDetail, likeword, hateword, 
    imageUrl = "http://placehold.it/350x300" ,
    onWishlist, wishListOnClick, btnMsg, defaultdata, data
}) {
  useScript('https://use.fontawesome.com/releases/v5.2.0/js/all.js');


                resolve(result_);
            } catch (e) {
                reject(e);
            }
        });
    }

    useEffect(async () => {
        makeData().then((res) => console.log("HII", res));
        console.log("state:", state);
    }, []);

  return (
      <div>
    <div className="Detail-container">
      
     <div className="Detail productImage">
        <img src={imageUrl}></img>
      </div>
      <div className="Detail productInfo">
        <div className="Detail product"> {product} </div>
        <div className="Detail price"> {price} 원</div>
      </div>
      <div className="Detail sBasket">
        <button 
            type="button"
            disabled={onWishlist}
            onClick={(e) => {
                e.preventDefault();
                wishListOnClick();
            }}>
            {onWishlist ? styled.button.disabled : styled.button}
            <i class="fas fa-cart-plus fa-2x"></i>
        </button>
      </div>

      <div></div>
    </div>
    
    <div className="CloudPercent-container">
        <div className="Detail-WordCloud">
          <TagCloud
            minSize={12}
            maxSize={35}
            tags={defaultdata}
            className="simple-cloud"
            //onClick={tag => alert(`'${tag.value}' was selected!`)}
          />
        </div>

                        return (
                            <div key={idx}>
                                <p>{review["review"]}</p>
                                <hr />
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default Detail;
