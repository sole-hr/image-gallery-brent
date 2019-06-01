import React from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
import "../styles/description.css";

class Description extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sku: "CJ0066-900",
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
    window.addEventListener(
      "productClickEvent",
      event => {
        this.setState({ sku: event.detail.sku }, () => {
          this.fetchDescriptionData(this.state.sku);
        });
      },
      false
    );
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
        <div className="my-5">{this.state.description}</div>
      </div>
    );
  }
}

window.Description = Description;
export default Description;

ReactDOM.render(<Description />, document.getElementById("description"));
