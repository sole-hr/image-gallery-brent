import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";
import ReactDOM from "react-dom";
import ImageGallery from "./components/ImageGallery.jsx";
import ColorSelector from "./components/ColorSelector.jsx";
import Title from "./components/Title.jsx";
import SizeSelector from "./components/SizeSelector.jsx";
import CartFavoriteButtons from "./components/CartFavoriteButtons.jsx";
import Description from "./components/Description.jsx";

// AJ6900-401
// AO2924-400
// AH8050-002

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sku: "CJ0066-900",
      isFavorite: false,
      color: "",
      size: null,
      textbox: ""
    };

    this.onTextChange = this.onTextChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onTextChange(event) {
    this.setState({ textbox: event.target.value }, () => {});
  }

  onClick(event) {
    this.setState({ sku: this.state.textbox }, () => {
      console.log(this.state.sku);
    });
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.onTextChange} />
        <button onClick={this.onClick}>FIND NEW SHOE</button>
        <Title sku={this.state.sku} />
        <ImageGallery sku={this.state.sku} />
        <ColorSelector sku={this.state.sku} />
        <SizeSelector sku={this.state.sku} />
        <CartFavoriteButtons sku={this.state.sku} />
        <Description sku={this.state.sku} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
