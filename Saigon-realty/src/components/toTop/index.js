import React from "react";
import "./style.css";
export default class ToTop extends React.Component {
  constructor(props) {
    super(props);
    this.upToTop = this.upToTop.bind(this);
  }
  upToTop() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div onClick={this.upToTop} className="toTop">
        <img width={30} height={30} src="../images/up-arrow.png" />
      </div>
    );
  }
}
