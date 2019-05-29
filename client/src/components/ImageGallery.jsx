import React from "react";
import Axios from "axios";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import "../styles/image-gallery.css";

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sku: props.sku,
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
          images: images.data
        });
      })
      .catch(err => {});
  }

  componentDidMount() {
    this.fetchImageData(this.state.sku);
  }

  componentDidUpdate(prevProps) {
    if (this.props.sku !== prevProps.sku) {
      this.fetchImageData(this.props.sku);
    }
  }

  toggleModal() {
    this.setState(prevState => ({ modal: !prevState.modal }));
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
        <Modal isOpen={this.state.modal}>
          <ModalBody>
            <div id="exit-modal">x</div>
            {this.state.images.map((image, index) => {
              return <img key={index} src={image} />;
            })}
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
//
export default ImageGallery;
