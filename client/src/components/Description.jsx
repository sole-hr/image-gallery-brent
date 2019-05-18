import React from "react";
import Axios from "axios";

class Description extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sku: props.sku,
      description: "Loading..."
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
    return (
      <div>
      <h3>Description</h3>
        <div>{this.state.description}</div>
      </div>
    )
  }
}

export default Description;
