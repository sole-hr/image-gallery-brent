import React from "react";
import Axios from "axios";
import "../styles/description.css";

class Description extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sku: props.sku,
      description: "Loading..."
    };
  }

  fetchDescriptionData(sku) {
    Axios.get(`${process.env.API_URL}/api/description/${sku}`)
      .then(description => {
        this.setState({
          sku: sku,
          description: description.data
        });
      })
      .catch(err => {});
  }

  componentDidMount() {
    this.fetchDescriptionData(this.state.sku);
  }

  componentDidUpdate(prevProps) {
    if (this.props.sku !== prevProps.sku) {
      this.fetchDescriptionData(this.props.sku);
    }
  }

  render() {
    return (
      <div>
        <h3>Description</h3>
        <div>{this.state.description}</div>
      </div>
    );
  }
}

export default Description;
