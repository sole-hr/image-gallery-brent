import React from "react";
import ReactDOM from "react-dom";
import "../styles/color-selector.css";
import Axios from "axios";
import { Button } from "reactstrap";

class ColorSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sku: "1",
      //"CJ0066-900
      colors: [],
      selectedColor: null
    };
    this.onColorClick = this.onColorClick.bind(this);
  }

  shuffle(array) {
    var currentIndex = array.length;
    var temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  fetchColorSelectorData(sku) {
    Axios.get(`${process.env.API_URL}/api/colors/${sku}`)
      .then(colors => {
        this.setState({
          sku: sku,
          colors: this.shuffle(colors.data)
        });
      })
      .catch(err => {});
  }

  componentDidMount() {
    window.addEventListener(
      "productClickEvent",
      event => {
        this.setState({ sku: event.detail.sku }, () => {
          this.fetchColorSelectorData(this.state.sku);
        });
      },
      false
    );

    this.fetchColorSelectorData(this.state.sku);
  }

  onColorClick(event) {
    this.setState({ selectedColor: event.target.value }, () => {
      const colorClickEvent = new CustomEvent("colorClickEvent", {
        detail: { sku: this.state.sku, color: this.state.selectedColor }
      });
      window.dispatchEvent(colorClickEvent);
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.sku !== prevProps.sku) {
      this.fetchColorSelectorData(this.props.sku);
    }
  }

  render() {
    return (
      <div className="color-grid mb-4">
        {this.state.colors.map((color, index) => {
          return (
            <Button
              onClick={this.onColorClick}
              className="color-block my-1"
              key={index}
              style={{ backgroundColor: color }}
              value={color}
            />
          );
        })}
      </div>
    );
  }
}

window.ColorSelector = ColorSelector;
export default ColorSelector;
ReactDOM.render(<ColorSelector />, document.getElementById("color-selector"));
