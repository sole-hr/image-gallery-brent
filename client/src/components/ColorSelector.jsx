import React from "react";
import Axios from 'axios';

class ColorSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sku: props.sku,
      colors: []
    };
  }

  componentDidMount() {
    Axios.get(`http://localhost:3001/api/colors/${this.state.sku}`)
      .then(colors => {
        this.setState({ colors: colors.data });
      })
      .catch(err => {});
  }

  render() {
    return (
      <div>
        {this.state.colors.map((color, index) => {
          return (<span key={index}>{color + ' | '}</span>);
        })}
      </div>
    );
  }
}

export default ColorSelector;
