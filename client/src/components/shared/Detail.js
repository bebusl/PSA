//import React from "react";
// import "./Detail.css";
import { TagCloud } from "react-tagcloud";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useScript } from "../../hooks/useScript";

ChartJS.register(CategoryScale, LinearScale, BarElement);

function Detail({
  product,
  price,
  url,
  imageUrl = "http://placehold.it/350x300",
  onWishlist,
  wishListOnClick,
  defaultdata,
  data,
}) {
  useScript("https://use.fontawesome.com/releases/v5.2.0/js/all.js");

  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
        borderRadius: 30,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      // title: {
      //     display: true,
      //     text: "Percentage__keyword",
      // },
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    },
  };

  return (
    <div>
      <div className="Detail-container">
        <div className="Detail productImage">
          <img src={imageUrl} alt={product}></img>
        </div>
        <div className="Detail productInfo">
          <div className="Detail product"> {product} </div>
          <div className="Detail price"> {price} 원</div>
          <div className="Detail productD">
            <a
              href={url}
              style={{ color: "grey", fontSize: "small" }}
              target="_blank"
              rel="noreferrer noopener"
            >
              상세정보 보러가기
            </a>
          </div>
        </div>
        <div className="Detail sBasket">
          <button
            type="button"
            disabled={onWishlist}
            onClick={(e) => {
              e.preventDefault();
              wishListOnClick();
            }}
          >
            <i className="fas fa-cart-plus fa-2x"></i>
          </button>
        </div>

        <div></div>
      </div>

      <div className="CloudPercent-container">
        <div className="Detail-WordCloud">
          <p>워드클라우드</p>

          <TagCloud
            minSize={30}
            maxSize={80}
            tags={defaultdata}
            className="simple-cloud"
            shuffle={true}
            //onClick={tag => alert(`'${tag.value}' was selected!`)}
          />
        </div>

        <div className="Detail-percentage">
          <p>키워드차트</p>
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

export default Detail;
