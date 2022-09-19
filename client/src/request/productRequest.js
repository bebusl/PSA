import requests from "./request";

const request = requests;

export const getProductDetailById = (id) => {
  request.get({ url: `/product/detail/${id}` });
};

export const getWishlistDetailById = (id) => {
  request.get({ url: `/product/wishlist/${id}` });
};

export const getWishlistId = () => {
  request.get({ url: "/product/wishlistId" });
};

// http://localhost:5000/product/detail/${match.params.id}

// const
// http://localhost:5000/product/wishlistId
// http://localhost:5000/product/wishlist/${_id}
