import React from "react";
import { FormattedMessage } from "react-intl";
class ServicesHouseDetail extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { services } = this.props;
    return (
      <>
        {services ? (
          <div className="apartment-description d-flex flex-column">
            <FormattedMessage id="services">
              {(txt) => (
                <div id="facilities" className="apartment-title">
                  {txt}
                </div>
              )}
            </FormattedMessage>
            <div className="apartment-facilities d-flex flex-wrap">
              {services.map((item) => {
                return (
                  <FormattedMessage id={item.name_id}>
                    {(txt) => (
                      <div className="apartment-amenities-item">
                        <img
                          className="apartment-amenities-icon"
                          src={item.icon}
                          alt="..."
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
export default ServicesHouseDetail;
