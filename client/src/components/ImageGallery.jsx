import React from "react";
import Axios from "axios";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import '../styles/image-gallery.css';

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

  componentDidMount() {
    Axios.get(`http://localhost:3001/api/images/${this.state.sku}`)
      .then(images => {
        this.setState({ images: images.data });
      })
      .catch(err => { });
  }

  toggleModal() {
    this.setState(prevState => ({ modal: !prevState.modal }));
  }

  render() {
    return (
      <div>
        <div>
          {this.state.images.map((image, index) => {
            return <img id="shoe-image" onClick={this.toggleModal} key={index} src={image} />;
          })}
        </div>
        <Modal isOpen={this.state.modal}>
          <ModalBody>
            <div id="exit-modal">x</div>
            {this.state.images.map((image, index) => {
              return <img key={index} src={image} />
            })}
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
//
export default ImageGallery;
