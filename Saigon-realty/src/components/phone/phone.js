import React from "react";
import { BASE_URL } from "../../setting";

export default class Phone extends React.Component {
  render() {
    return (
      <a href="tel:0902669972" className="phone-container rounded-circle shadow-lg">
        <img alt="..." src={BASE_URL + "/images/phone.svg"} />
      </a>
    );
  }
}
