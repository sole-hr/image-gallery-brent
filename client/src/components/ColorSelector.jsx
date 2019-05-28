import React from "react";
import '../styles/color-selector.css'
import Axios from 'axios';
import { Button } from 'reactstrap';

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
      .catch(err => { });
  }

  onClick(event) {
    console.log(event.target.getAttribute('value'));
  }

  render() {
    return (
      <div className='color-grid'>
        {this.state.colors.map((color, index) => {
          return (

            <Button onClick={this.onClick} className="color-block" key={index} style={{ backgroundColor: color }} value={color}></Button>
          );
        })}
      </div>
    );
  }
}

export default ColorSelector;
