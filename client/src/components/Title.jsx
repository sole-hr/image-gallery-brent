import React from "react";
import Axios from "axios";

class Title extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sku: props.sku,
      productName: "Loading..."
    };
  }

  componentDidMount() {
    Axios.get(`http://localhost:3001/api/productName/${this.state.sku}`)
      .then(productName => {
        this.setState({ productName: productName.data });
      })
      .catch(err => {});
  }
  render() {
    return (
      <div>
        <h3>Product Name</h3>
        <div>{this.state.productName}</div>
      </div>
    );
  }
}

export default Title;
