import React from "react";
import ReactDOM from "react-dom";
import ImageGallery from "./components/ImageGallery.jsx";
import Title from "./components/Title.jsx";

// export default ImageGallery;
ReactDOM.render(<Title />, document.getElementById("title"));
ReactDOM.render(<ImageGallery />, document.getElementById("image-gallery"));
