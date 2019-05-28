import React from "react";
import Axios from "axios";
import '../styles/title.css'

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

  componentDidMount() {
    Axios.get(`http://localhost:3001/api/title/${this.state.sku}`)
      .then(title => {
        this.setState({
          title: title.data.productName,
          price: title.data.price,
          category: title.data.category
        });
      })
      .catch(err => { });
  }
  render() {
    return (
      <div>
          <div className="title-grid">
            <p>Basketball Shoe</p>
            <p id="price" className="h6">${this.state.price}</p>
            <p className="h5">{this.state.title}</p>
        </div>
      </div>
    );
  }
}

export default Title;
