import React from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
import "../styles/size-selector.css";
import { Button } from "reactstrap";

class SizeSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sku: "CJ0066-900",
      sizes: [],
      selectedSize: null
    };
    this.onSizeClick = this.onSizeClick.bind(this);
  }

  fetchSizeData(sku) {
    Axios.get(`${process.env.API_URL}/api/sizes/${sku}`)
      .then(sizes => {
        this.setState({
          sku: sku,
          sizes: sizes.data
        });
      })
      .catch(err => {});
  }

  componentDidMount() {
    window.addEventListener(
      "productClickEvent",
      event => {
        this.setState({ sku: event.detail.sku }, () => {
          this.fetchSizeData(this.state.sku);
        });
      },
      false
    );
    this.fetchSizeData(this.state.sku);
  }

  componentDidUpdate(prevProps) {
    if (this.props.sku !== prevProps.sku) {
      this.fetchSizeData(this.props.sku);
    }
  }

  onSizeClick(event) {
    // console.log(event.target.value);
    this.setState({ selectedSize: event.target.value }, () => {
      const sizeClickEvent = new CustomEvent("sizeClickEvent", {
        detail: { sku: this.state.sku, size: this.state.selectedSize }
      });
      window.dispatchEvent(sizeClickEvent);
    });
  }

  render() {
    return (
      <div>
        <div className="size-title">
          <p className="h6" id="select-size">Select Size</p>
          <p className="text-muted" id="size-guide">Size Guide</p> 
        </div>api/:info/:sku
        <div className="size-grid">
          {this.state.sizes.map((size, index) => {
            return (
              <Button
                color="bg-light"
                onClick={this.onSizeClick}
                key={index}
                className="border size-button btn btn-light m-1"
                value={size}
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

window.SizeSelector = SizeSelector;
export default SizeSelector;
ReactDOM.render(<SizeSelector />, document.getElementById("size-selector"));
