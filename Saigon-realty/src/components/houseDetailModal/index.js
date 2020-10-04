import React from "react";
import { FormattedMessage } from "react-intl";
import Modal from "react-bootstrap/Modal";
import RequestForm from "../requestForm/index";
import { BASE_URL } from "../../setting";

class ModalHouseDetail extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { houseBySlug } = this.props;
    const { showRequest,handleCloseRequest } = this.props;
    return (
      <Modal
        show={showRequest}
        onHide={handleCloseRequest}
        dialogClassName="requset-modal"
        centered
      >
        <Modal.Header closeButton>
          <div className="aparment-detail d-flex align-items-end">
            <div className="apartment-name-place d-flex flex-column">
              <div className="h5">{houseBySlug && houseBySlug.name}</div>
              <div className="d-flex flex flex-column justify-content-between">
                <div className="d-flex align-items-center mb-2">
                  <img
                    style={{
                      height: "18px",
                      width: "18px",
                    }}
                    alt="..."
                    className="mr-2"
                    src={BASE_URL + "/images/marker.png"}
                  />
                  {houseBySlug.district + " , " + houseBySlug.city}
                </div>
                <div className="d-flex align-items-center mb-2">
                  <img
                    style={{
                      height: "18px",
                      width: "18px",
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
              </div>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <RequestForm
            price={true}
            housePrice={houseBySlug.price}
            type={houseBySlug.typeSale}
          />
        </Modal.Body>
      </Modal>
    );
  }
}
export default ModalHouseDetail;
