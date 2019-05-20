import React from "react";
import Axios from "axios";

class SizeSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sku: this.props.sku,
      sizes: []
    };

    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    Axios.get(`/api/sizes/${this.state.sku}`)
      .then(sizes => {
        this.setState({ sizes: sizes.data });
      })
      .catch(err => {});
  }

  onClick(event) {
    console.log(event.target.getAttribute('value'));
  }

  render() {
    return (
      <div>
        <h3>Sizes</h3>
        {this.state.sizes.map((size, index) => {
          return (
            <span onClick={this.onClick} key={index} value={size}>
              {size + " | "}
            </span>
          );
        })}
      </div>
    );
  }
}

export default SizeSelector;
