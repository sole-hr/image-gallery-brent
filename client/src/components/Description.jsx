import React from "react";
import Axios from "axios";

class Description extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sku: "CJ0066-900",
      description: ""
    };
  }

  componentDidMount() {
    Axios.get(`http://localhost:3001/api/description/${this.state.sku}`)
      .then(description => {
        this.setState({ description: description.data });
      })
      .catch(err => {});
  }

  render() {
    return <div>{this.state.description}</div>;
  }
}

export default Description;
