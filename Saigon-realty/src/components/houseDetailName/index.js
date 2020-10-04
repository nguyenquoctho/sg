import React from "react";
import { FormattedMessage } from "react-intl";
import { BASE_URL } from "../../setting";
import * as moment from "moment";
class NameHouseDetail extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { houseBySlug, mapAddress } = this.props;
   
    return (
      <div className="aparment-detail d-flex align-items-end">
        <div className="apartment-name-place d-flex flex-column">
          <div className="apartment-detail-name mb-3">{houseBySlug.name}</div>
          <div className="aparment-detail-place d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column">
              <div className="d-flex align-items-center mb-2">
                <img
                  style={{
                    height: "24px",
                    width: "24px",
                  }}
                  alt="..."
                  className="mr-2"
                  src={BASE_URL + "/images/marker.png"}
                />
                <FormattedMessage id="location">
                  {(txt) => (
                    <p className="mb-0 mr-1 d-none d-md-block d-lg-block">
                      {txt}:
                    </p>
                  )}
                </FormattedMessage>
                <a
                  href={`https://www.google.com/maps/place/${mapAddress}`}
                  target="_blank"
                >
                  {houseBySlug.street}, {houseBySlug.ward},{" "}
                  {houseBySlug.district}, {houseBySlug.city + " "}
                  <i class="fas fa-external-link-alt" />
                </a>
              </div>
              <div className="d-flex align-items-center mb-2">
                <img
                  style={{
                    height: "24px",
                    width: "24px",
                  }}
                  alt="..."
                  className="mr-2"
                  src={BASE_URL + "/images/house-code.png"}
                />
                <FormattedMessage id="houseCode">
                  {(txt) => <p className="mb-0 mr-1">{txt}:</p>}
                </FormattedMessage>
                {houseBySlug.houseCode}
              </div>
              <div className="d-flex align-items-center mb-2">
                <img
                  style={{
                    height: "24px",
                    width: "24px",
                  }}
                  alt="..."
                  className="mr-2"
                  src={BASE_URL + "/images/calendar.png"}
                />
                <FormattedMessage id="postOn">
                  {(txt) => <p className="mb-0 mr-1">{txt}:</p>}
                </FormattedMessage>
                <p className="mb-0">
                  {moment(houseBySlug.date_post).format("DD/MM/YYYY")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default NameHouseDetail;
