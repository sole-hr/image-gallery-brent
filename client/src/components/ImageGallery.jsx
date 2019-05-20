import React from "react";
import Axios from "axios";

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sku: props.sku,
      images: []
    };
  }

  componentDidMount() {
    Axios.get(`/api/images/${this.state.sku}`)
      .then(images => {
        this.setState({ images: images.data });
      })
      .catch(err => {});
  }

  render() {
    return (
      <div>
        <h3>Images</h3>
        {this.state.images.map((image, index) => {
          return <img id="shoe-image" key={index} src={image} />;
        })}
      </div>
    );
  }
}

export default ImageGallery;
