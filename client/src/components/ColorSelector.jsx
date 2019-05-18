import React from "react";
import Axios from 'axios';

class ColorSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sku: props.sku,
      colors: []
    };
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    Axios.get(`http://localhost:3001/api/colors/${this.state.sku}`)
      .then(colors => {
        this.setState({ colors: colors.data });
      })
      .catch(err => {});
  }

  onClick(event) {
    console.log(event.target.getAttribute('value'));
  }

  render() {
    return (
      <div>
      <h3>Colors</h3>
        {this.state.colors.map((color, index) => {
          return (
            <div onClick={this.onClick} className="color-block" key={index} style={{backgroundColor: color}} value={color}></div>
            );
        })}
      </div>
    );
  }
}

export default ColorSelector;
