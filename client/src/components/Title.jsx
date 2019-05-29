import React from "react";
import Axios from "axios";
import "../styles/title.css";

class Title extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sku: props.sku,
      title: "Loading...",
      price: "Loading...",
      category: "Loading..."
    };
  }

  fetchTitleData(sku) {
    Axios.get(`${process.env.API_URL}/api/title/${sku}`)
      .then(title => {
        this.setState({
          sku: sku,
          title: title.data.productName,
          price: title.data.price,
          category: title.data.category
        });
      })
      .catch(err => {});
  }

  componentDidMount() {
    this.fetchTitleData(this.state.sku);
  }

  componentDidUpdate(prevProps) {
    if (this.props.sku !== prevProps.sku) {
      this.fetchTitleData(this.props.sku);
    }
  }

  render() {
    return (
      <div>
        <div className="title-grid">
          <p>Basketball Shoe</p>
          <p id="price" className="h6">
            ${this.state.price}
          </p>
          <p className="h5">{this.state.title}</p>
        </div>
      </div>
    );
  }
}

export default Title;
