import React from "react";
import { FormattedMessage } from "react-intl";
class SummaryHouseDetail extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { summary } = this.props;
    return (
      <div className="apartment-description d-flex flex-column">
        <FormattedMessage id="summary">
          {(txt) => (
            <div id="sumary" className="apartment-title">
              {txt}
            </div>
          )}
        </FormattedMessage>
        <div
          className="sumary"
          dangerouslySetInnerHTML={{ __html: summary }}
        />
      </div>
    );
  }
}
export default SummaryHouseDetail;
