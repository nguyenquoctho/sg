import React from "react";
import { FormattedMessage } from "react-intl";

class BannerHouseDetail extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { houseBySlugImg } = this.props;
    const { onHide } = this.props;
    return (
        <div className="apartment-banner mb-3">
        <FormattedMessage id="viewPhoto">
          {(txt) => (
            <div
              onClick={onHide}
              className="apartment-banner-view"
            >
              {txt}
            </div>
          )}
        </FormattedMessage>

        <img className="apartment-banner-img" src={houseBySlugImg} />
      </div>
    );
  }
}
export default BannerHouseDetail;