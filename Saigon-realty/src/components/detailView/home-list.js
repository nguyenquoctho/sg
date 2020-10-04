import React from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import HouseItem from "../houseItem";
import { FormattedMessage } from "react-intl";

class HomeList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { sliderSetting, title } = this.props;
    return (
      <div className="similar-list-item">
        <FormattedMessage id={title}>
          {(txt) => (
            <div style={{ paddingLeft: "15px" }} className="apartment-title">
              {txt}
            </div>
          )}
        </FormattedMessage>
        {this.props.houses.length < 3 ? (
          <div>
            {this.props.houses
            .filter(item => item.available !== "Unavailable")
            .map((item) => {
              return (
                <div className="d-flex">
                  <HouseItem columns={3} house={item} />
                </div>
              );
            })}
          </div>
        ) : (
          <Slider {...sliderSetting}>
            {this.props.houses
            .filter(item => item.available !== "Unavailable")
            .map((item) => {
              return (
                <div className="d-flex">
                  <HouseItem columns={1} house={item} />
                </div>
              );
            })}
          </Slider>
        )}
      </div>
    );
  }
}

const mapState = (state) => ({});
const mapDispatch = (dispatch) => ({});
export default connect(mapState, mapDispatch)(HomeList);
