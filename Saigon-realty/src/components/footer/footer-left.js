import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { BASE_URL } from "../../setting";
class FooterLeft extends Component {
  render() {
    const { settings } = this.props;
    return (
      <>
        <div className="col-12 col-md-6 col-lg-6 d-flex flex-column align-items-start">
          <FormattedMessage id="companyname">
            {(txt) => <div className="footer-item-title text-danger">{settings.companyName}</div>}
          </FormattedMessage>
          <FormattedMessage id="address">
            {(txt) => (
              <div className="company-content">
                {txt}: {settings.companyAddress}
              </div>
            )}
          </FormattedMessage>
          <FormattedMessage id="companyEmail">
            {(txt) => (
              <div className="company-content">
                {txt}: {settings.companyEmail}
              </div>
            )}
          </FormattedMessage>
          <FormattedMessage id="companyWorkTime">
            {(txt) => (
              <div className="company-content">
                {txt}: {settings.companyWorkTime}
              </div>
            )}
          </FormattedMessage>
          <FormattedMessage id="companyPhone" >
            {(txt) => (
              <div className="company-content" style={{fontWeight: "bold"}}>
                {txt}:
                <a className="ml-2">
                  {settings.companyPhone}
                </a>
              </div>
            )}
          </FormattedMessage>
          <FormattedMessage id="social">
              {(txt) => <p className="company-content mr-2 font-weight-bold">{txt}:</p>}
            </FormattedMessage>
          <div className="d-flex align-items-center">
            

            <a target="_blank" href={settings.facebook}>
              <img
                className="footer-icon"
                src={BASE_URL + "/images/social/facebook.svg"}
              />
            </a>
            <a target="_blank" href={settings.twitter}>
              <img
                className="footer-icon"
                src={BASE_URL + "/images/social/zalo-seeklogo.com.svg"}
              />
            </a>
            <a target="_blank" href={settings.instagram}>
              <img
                className="footer-icon"
                src={BASE_URL + "/images/social/instagram-sketched.svg"}
              />
            </a>
          </div>
        </div>
      </>
    );
  }
}
const mapState = (state) => ({
  settings: state.settings.settings,
});
export default connect(mapState, null)(FooterLeft);
