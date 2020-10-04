import React from "react";
import { FormattedMessage } from "react-intl";
class DevicesHouseDetail extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { devices } = this.props;
   
    return (
      <>
        {devices ? (
          <div className="apartment-description d-flex flex-column">
            <FormattedMessage id="devicesUtilities">
              {(txt) => (
                <div id="_amenities" className="apartment-title">
                  {txt}
                </div>
              )}
            </FormattedMessage>
            <div className="apartment-amenities d-flex flex-wrap">
              {devices.map((item) => {
                return (
                  <FormattedMessage id={item.name_id}>
                    {(txt) => (
                      <div className="apartment-amenities-item">
                        <img
                          alt={item.name}
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
export default DevicesHouseDetail;
