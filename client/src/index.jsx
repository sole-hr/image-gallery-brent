import React from "react";

import ReactDOM from "react-dom";
import ImageGallery from "./components/ImageGallery.jsx";
import Title from "./components/Title.jsx";
import ColorSelector from "./components/ColorSelector.jsx";
import SizeSelector from "./components/SizeSelector.jsx";
import CartFavoriteButtons from "./components/CartFavoriteButtons.jsx";
import Description from "./components/Description.jsx";

// export default ImageGallery;
ReactDOM.render(<Title />, document.getElementById("title"));
ReactDOM.render(<ImageGallery />, document.getElementById("image-gallery"));
ReactDOM.render(<ColorSelector />, document.getElementById("color-selector"));
ReactDOM.render(<SizeSelector />, document.getElementById("size-selector"));
ReactDOM.render(
  <CartFavoriteButtons />,
  document.getElementById("cart-favorite-buttons")
);
ReactDOM.render(<Description />, document.getElementById("description"));
