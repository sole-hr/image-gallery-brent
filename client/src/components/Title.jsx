import React from "react";
import Axios from "axios";

class Title extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sku: props.sku,
      title: "Loading...",
      price: "Loading...",
      category: "Loading..."
    };
  }

  componentDidMount() {
    Axios.get(`/api/title/${this.state.sku}`)
      .then(title => {
        this.setState({
          title: title.data.productName,
          price: title.data.price,
          category: title.data.category
        });
      })
      .catch(err => {});
  }
  render() {
    return (
      <div>
        <h3>Product Name</h3>
        <div>{this.state.title}</div>
        <div>${this.state.price}</div>
        <div>Category: {this.state.category}</div>
      </div>
    );
  }
}

export default Title;
