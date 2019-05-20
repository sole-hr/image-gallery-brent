import React from "react";

import ReactDOM from "react-dom";
import ImageGallery from "./components/ImageGallery.jsx";
import Title from "./components/Title.jsx";
import ColorSelector from "./components/ColorSelector.jsx";
import SizeSelector from "./components/SizeSelector.jsx";
import CartFavoriteButtons from "./components/CartFavoriteButtons.jsx";
import Description from "./components/Description.jsx";

const initialState = {
  sku: "CJ0066-900",
  isFavorite: false,
  color: '',
  size: null
};

// export default ImageGallery;
ReactDOM.render(
  <Title sku={initialState.sku} />,
  document.getElementById("title")
);
ReactDOM.render(
  <ImageGallery sku={initialState.sku} />,
  document.getElementById("image-gallery")
);
ReactDOM.render(
  <ColorSelector sku={initialState.sku} />,
  document.getElementById("color-selector")
);
ReactDOM.render(
  <SizeSelector sku={initialState.sku} />,
  document.getElementById("size-selector")
);
ReactDOM.render(
  <CartFavoriteButtons sku={initialState.sku} />,
  document.getElementById("cart-favorite-buttons")
);
ReactDOM.render(
  <Description sku={initialState.sku} />,
  document.getElementById("description")
);
