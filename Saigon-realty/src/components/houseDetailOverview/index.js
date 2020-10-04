import React from "react";
import { FormattedMessage } from "react-intl";
import { BASE_URL } from "../../setting";
class OverviewHouseDetail extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { overviews } = this.props;
    return (
        <div className="aparment-overview d-flex flex-column">
        <FormattedMessage id="overView">
          {(txt) => <div className="apartment-title">{txt}</div>}
        </FormattedMessage>

        <div className="row d-flex flex-wrap">
          {overviews.map((item) => {
            return (
              <div className="col-12 col-md-4 col-lg-4 d-flex">
                <img
                  style={{
                    height: "24px",
                    width: "24px",
                    marginRight: "5px",
                  }}
                  src={BASE_URL + item.icon}
                />
                {item.id ? (
                  <FormattedMessage id={item.id}>
                    {(txt) => <p className="mb-0 mr-1">{txt}:</p>}
                  </FormattedMessage>
                ) : (
                  ""
                )}
                <p className="mb-0 mr-1">{item.value}</p>
                {item.unit ? <p>{item.unit}</p> : ""}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default OverviewHouseDetail;