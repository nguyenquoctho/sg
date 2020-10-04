import React from "react";
import { FormattedMessage } from "react-intl";

class RequestFormHouseDetail extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
   
    const { handleShowRequest } = this.props;
    return (
     
        <div className="request-form-nav">
          <a
            href="tel:0902669972"
            className="btn btn-outline-secondary direct-call"
          >
            <FormattedMessage id="directCall">
              {(txt) => (
                <span className="text-dark">
                  <i className="fas fa-phone-alt mr-1" /> {txt}
                </span>
              )}
            </FormattedMessage>
          </a>

          <FormattedMessage id="requestInspection">
            {(txt) => (
              <button
                onClick={handleShowRequest}
                className="btn btn-danger inspection"
              >
                {txt}
              </button>
            )}
          </FormattedMessage>
        </div>
    );
  }
}
export default RequestFormHouseDetail;