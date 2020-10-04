import React from "react";
import { FormattedMessage } from "react-intl";
class FacilitiesHouseDetail extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { facilities } = this.props;
    return (
      <>
        {facilities ? (
          <div className="apartment-description d-flex flex-column">
            <FormattedMessage id="facilities">
              {(txt) => (
                <div id="_amenities" className="apartment-title">
                  {txt}
                </div>
              )}
            </FormattedMessage>
            <div className="apartment-amenities d-flex flex-wrap">
              {facilities.map((item) => {
                return (
                  <FormattedMessage id={item.name_id} key={item.name_id}>
                    {(txt) => (
                      <div className="apartment-amenities-item">
                        <img
                          alt="..."
                          className="apartment-amenities-icon"
                          src={item.icon}
                        />
                        {txt}
                      </div>
                    )}
                  </FormattedMessage>
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
}
export default FacilitiesHouseDetail;
