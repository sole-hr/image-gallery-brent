import React from "react";
import Axios from "axios";

class SizeSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sku: this.props.sku,
      sizes: []
    };
  }

  componentDidMount() {
    Axios.get(`http://localhost:3001/api/sizes/${this.state.sku}`)
      .then(sizes => {
        this.setState({ sizes: sizes.data });
      })
      .catch(err => {});
  }

  render() {
    return (
      <div>
        {this.state.sizes.map((size, index) => {
          return <span key={index}>{size + ' | '}</span>;
        })}
      </div>
    );
  }
}

export default SizeSelector;
