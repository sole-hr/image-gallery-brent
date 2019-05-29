import React from "react";
import Axios from "axios";
import "../styles/size-selector.css";
import { Button } from "reactstrap";

class SizeSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sku: this.props.sku,
      sizes: []
    };

    this.onClick = this.onClick.bind(this);
  }

  fetchSizeData(sku) {
    Axios.get(`${process.env.API_URL}/api/sizes/${sku}`)
      .then(sizes => {
        this.setState({ 
          sku: sku,
          sizes: sizes.data });
      })
      .catch(err => {});
  }

  componentDidMount() {
    this.fetchSizeData(this.state.sku);
  }

  componentDidUpdate(prevProps) {
    if (this.props.sku !== prevProps.sku) {
      this.fetchSizeData(this.props.sku);
    }
  }

  onClick(event) {
    console.log(event.target.getAttribute("value"));
  }

  render() {
    return (
      <div>
        <div className="size-title">
          <p id="select-size">Select Size</p>
          <p id="size-guide">Size Guide</p> <br />
        </div>
        <div className="size-grid">
          {this.state.sizes.map((size, index) => {
            return (
              <Button
                color="bg-light"
                onClick={this.onClick}
                key={index}
                className="border size-button btn btn-light"
              >
                {size}
              </Button>
            );
          })}
        </div>
      </div>
    );
  }
}

export default SizeSelector;
