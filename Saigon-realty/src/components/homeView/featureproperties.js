import React, { Component } from "react";
import { Link } from "@reach/router";
import HouseItem from "../houseItem";
import { FormattedMessage } from "react-intl";

class FeatureProperties extends Component {
  render() {
    const { district, districtActive } = this.props;
    let popularArea = district.map((item, index) => {
      let active;
      if (districtActive === index) {
        active = "active-district";
      } else {
        active = "";
      }
      return (
        <FormattedMessage id={item.area}>
          {(txt) => (
            <div
              onClick={() => this.props.selectDistrict(item.search, index)}
              className={"feature-properties-district text-uppercase" + active}
            >
              {item.area === "" ? "ALL" : txt}
            </div>
          )}
        </FormattedMessage>
      );
    });

    return (
      <>
        <div className="feature-properties d-flex flex-column align-items-center">
          <h2 className="feature-properties-title">
            <FormattedMessage id="featurePropertiesOnDistrict">
              {(txt) => txt}
            </FormattedMessage>
          </h2>
          <div className="feature-properties-districts">{popularArea}</div>
          {/* Feature Properties mobile */}
          <div className="feature-properties-responsive">
            <select
              class="custom-select "
              onChange={this.mobileDistrict}
              id="feature-properties-selection"
            >
              {district.map((item, index) => {
                return (
                  <FormattedMessage id={item.area} key={index}>
                    {(txt) => (
                      <option
                        className={"feature-properties-district"}
                        value={item.search}
                      >
                        {txt}
                      </option>
                    )}
                  </FormattedMessage>
                );
              })}
            </select>
          </div>
          <div className="list-house container d-flex flex-wrap">
            {this.props.houses.filter(item => item.available !== "Unavailable").map((item, index) => {
              if (index < 6) {
                return (
                  <HouseItem columns={3} house={item} likeButton={false} />
                );
              }
            })}
          </div>
          <div />
          <Link
            to={`/apartment?projectId=&search=&page=1&min=0&max=9999999&bedroom=&bathroom=&furniture=&accommodate=&devices=&type=`}
          >
            <button className="view-all">
              <FormattedMessage id="seeMore">{(txt) => txt}</FormattedMessage>
            </button>
          </Link>
        </div>
      </>
    );
  }
}
export default FeatureProperties;
