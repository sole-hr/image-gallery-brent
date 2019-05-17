import React from "react";
import ReactDOM from "react-dom";

// const ImageGallery = (props) => (
//  <div>TEST COMPONENT IS RUNNING</div>
// )

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>IMAGE GALLERY</div>;
  }
}

// export default ImageGallery;
ReactDOM.render(<ImageGallery />, document.getElementById("image-gallery"));
