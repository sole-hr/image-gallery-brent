import React from "react";
import ReactDOM from "react-dom";
import "../styles/cartfavorite-buttons.css";

class CartFavoriteButtons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sku: "CJ0066-900",
      size: null,
      color: ""
    };
    this.onFavoriteClick = this.onFavoriteClick.bind(this);
    this.onCartClick = this.onCartClick.bind(this);
  }

  componentDidMount() {
    window.addEventListener(
      "productClickEvent",
      event => {
        this.setState({ sku: event.detail.sku }, () => {});
      },
      false
    );

    window.addEventListener(
      "sizeClickEvent",
      event => {
        this.setState({ size: event.detail.size }, () => {
          // console.log("NEW BUTTON STATE: ", this.state.size);
        });
      },
      false
    );

    window.addEventListener(
      "colorClickEvent",
      event => {
        this.setState({ color: event.detail.color }, () => {
          console.log("COLOR STATE CHANGED: ", this.state.color);
        });
      },
      false
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.sku !== prevProps.sku) {
      this.setState({ sku: this.props.sku });
    }
  }

  onFavoriteClick(event) {
    const onFavoriteClick = new CustomEvent("onFavoriteClick", {
      detail: { favorite: this.state.sku }
    });
    window.dispatchEvent(onFavoriteClick);
  }

  onCartClick() {
    const onCartClick = new CustomEvent("onCartClick", {
      detail: {
        sku: this.state.sku,
        color: this.state.color,
        size: this.state.size
      }
    });
    window.dispatchEvent(onCartClick);
    window.alert(
      `Product ID: ${this.state.sku}\nColor: ${this.state.color}\nSize: ${
        this.state.size
      }`
    );
  }

  render() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-dark rounded-pill cart-button my-2"
          onClick={this.onCartClick}
        >
          Add to cart
        </button>
        <button
          type="button"
          className="btn btn-outline-dark rounded-pill favorite-button my-2"
          onClick={this.onFavoriteClick}
        >
          Favorite
        </button>
      </div>
    );
  }
}

window.CartFavoriteButtons = CartFavoriteButtons;
export default CartFavoriteButtons;

ReactDOM.render(
  <CartFavoriteButtons />,
  document.getElementById("cart-favorite-buttons")
);
