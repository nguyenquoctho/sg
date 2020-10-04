import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
class BannerFooter extends Component {
  render() {
    return (
      <>
        <div className="banner-footer d-flex justify-content-center align-items-center">
          <div className="banner-footer-item">
            <i class="fa fa-trophy mr-2"></i>
            <FormattedMessage id="clientServices">
              {(txt) => txt}
            </FormattedMessage>
          </div>
          <div className="banner-footer-item">
            <i class="fa fa-hands-helping mr-2"></i>
            <FormattedMessage id="multiChoices">
              {(txt) => txt}
            </FormattedMessage>
          </div>
          <div className="banner-footer-item">
            <i class="fa fa-comments mr-2"></i>
            <FormattedMessage id="freeAgentFreeForClient">
              {(txt) => txt}
            </FormattedMessage>
          </div>
        </div>
      </>
    );
  }
}
export default BannerFooter;
