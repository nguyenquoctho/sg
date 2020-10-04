import React from "react";
import { FormattedMessage } from "react-intl";
class DescriptionHouseDetail extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { description } = this.props;
    return (
      <div className="apartment-description d-flex flex-column">
        <FormattedMessage id="description">
          {(txt) => <div className="apartment-title">{txt}</div>}
        </FormattedMessage>
        <div className="apartment-description-detail">
          <div
            className="description"
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        </div>
      </div>
    );
  }
}
export default DescriptionHouseDetail;
