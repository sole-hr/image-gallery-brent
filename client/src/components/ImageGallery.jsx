import React from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
import { Modal, ModalBody } from "reactstrap";
import "../styles/image-gallery.css";

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sku: "CJ0066-900",
      images: [],
      modal: false
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  fetchImageData(sku) {
    Axios.get(`${process.env.API_URL}/api/images/${sku}`)
      .then(images => {
        this.setState({
          sku: sku,
          images: images.data.slice(0, 6)
        });
      })
      .catch(err => {});
  }

  componentDidMount() {
    window.addEventListener(
      "productClickEvent",
      (event) => {
        this.setState({ sku: event.detail.sku }, () => {
          this.fetchImageData(this.state.sku);
        });
      },
      false
    );

    this.fetchImageData(this.state.sku);
  }

  toggleModal() {
    this.setState({ modal: !this.state.modal });
  }

  render() {
    return (
      <div>
        <div>
          {this.state.images.map((image, index) => {
            return (
              <img
                id="shoe-image"
                onClick={this.toggleModal}
                key={index}
                src={image}
              />
            );
          })}
        </div>
        <Modal isOpen={this.state.modal} onClick={() => console.log("hi")}>
          <ModalBody>
            <div
              id="exit-modal"
              onClick={() => this.setState({ modal: false })}
            >
              x
            </div>
            {this.state.images.map((image, index) => {
              return <img key={index} src={image} />;
            })}
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

window.ImageGallery = ImageGallery;
export default ImageGallery;

ReactDOM.render(<ImageGallery />, document.getElementById("image-gallery"));
