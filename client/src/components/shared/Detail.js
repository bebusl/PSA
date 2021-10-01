//import React from "react";
import "./Detail.css";
import { TagCloud } from "react-tagcloud"
import React, { useState } from 'react'
import { Bar } from 'react-chartjs-2';
import { useScript } from "../../hooks";

function Detail({ product, price, productDetail, likeword, hateword }) {
  useScript('https://use.fontawesome.com/releases/v5.2.0/js/all.js');
    const defaultdata = [
        { value: 'jQuery', count: 25 },
        { value: 'MongoDB', count: 18 },
        { value: 'JavaScript', count: 38 },
        { value: 'React', count: 30 },
        { value: 'Nodejs', count: 28 },
        { value: 'Express.js', count: 25 },
        { value: 'HTML5', count: 33 },
        { value: 'CSS3', count: 20 },
        { value: 'Webpack', count: 22 },
        { value: 'Babel.js', count: 7 },
        { value: 'ECMAScript', count: 25 },
        { value: 'Jest', count: 15 },
        { value: 'Mocha', count: 17 },
        { value: 'React Native', count: 27 },
        { value: 'Angular.js', count: 30 },
        { value: 'TypeScript', count: 15 },
        { value: 'Flow', count: 30 },
        { value: 'NPM', count: 11 },
      ];
      


const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'], //키워드
  datasets: [
    {
      label: 'good',   //긍정
      data: [12, 19, 3, 5, 2, 3],  //키워드 별 퍼센트? 
      backgroundColor: 'blue',
      stack: 'Stack 0',
      // borderColor: [
      //   'rgba(255, 99, 132, 1)',
      //   'rgba(54, 162, 235, 1)',
      //   'rgba(255, 206, 86, 1)',
      //   'rgba(75, 192, 192, 1)',
      //   'rgba(153, 102, 255, 1)',
      //   'rgba(255, 159, 64, 1)',
      // ],
      borderWidth: 1,
    },
  {
    label: 'bad',   //부정
    data: [19, 3, 12, 5, 7, 9],
    backgroundColor:'red',
    stack: 'Stack 0',
    borderWidth: 1,
  },
    
  ],
};

const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Percentage__keyword',
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true
      }
    }
  },
};


  return (
      <div>
    <div className="Detail-container">
      
     <div className="Detail productImage">
        <img src="http://placehold.it/350x300"></img>
      </div>
      <div className="Detail productInfo">
        <div className="Detail product"> product </div>
        <div className="Detail price"> price</div>
      </div>
      <div className="Detail sBasket">
        <button type="button"><i class="fas fa-cart-plus fa-2x"></i></button>
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
            onClick={tag => alert(`'${tag.value}' was selected!`)}
          />
        </div>

        <div className="Detail-percentage">
          <Bar data={data} options={options} />
        </div>
    </div>
    </div>
  );
}

export default Detail;
