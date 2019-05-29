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

  fetchColorSelectorData(sku) {
    Axios.get(`${process.env.API_URL}/api/colors/${sku}`)
    .then(colors => {
      this.setState({ 
        sku: sku,
        colors: colors.data });
    })
    .catch(err => { });
  }

  componentDidMount() {
    this.fetchColorSelectorData(this.state.sku);
  }

  onClick(event) {
    console.log(event.target.getAttribute('value'));
  }

  componentDidUpdate(prevProps) {
    if (this.props.sku !== prevProps.sku) {
      this.fetchColorSelectorData(this.props.sku);
    }
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
