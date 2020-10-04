import React from "react";
import { FormattedMessage } from "react-intl";
import "./style.css";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { Alert, Spinner } from "react-bootstrap";

class RequestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    this.requestInspection = this.requestInspection.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  async requestInspection(event) {
    event.preventDefault();
    const { name, phone, email, message } = this.state;
    const data = {
      subject: "Request Inspection",
      name: name,
      phone: phone,
      email: email,
      message: message,
    };
    const code = await this.props.request(data);
    this.setState({ show: code });
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    const { companyPhone } = this.props.settings;

    return (
      <div className="d-flex flex-column align-items-center border rounded p-4 bg-light">
        <div className="apartment-price d-flex flex-column">
          {this.props.type ? (
            <div className="w-100 d-flex justify-content-center">
              <FormattedMessage id="price_for">
                {(txt) => <p className="mb-0 mr-1">{txt}</p>}
              </FormattedMessage>
              <FormattedMessage id={this.props.type}>
                {(txt) => <p className="mb-0 mr-1">{txt}</p>}
              </FormattedMessage>
              {this.props.type === "Rent" ? (
                <FormattedMessage id="perMonth">
                  {(txt) => <p className="mb-0 mr-1">{txt}</p>}
                </FormattedMessage>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}

          <div className="text-center text-info">
            <NumberFormat
              value={this.props.housePrice}
              displayType={"text"}
              prefix={"$"}
              className="mr-2 h1"
              thousandSeparator={true}
            />
          </div>
        </div>
        <hr className="w-100" />
        <form onSubmit={(event) => this.requestInspection(event)}>
          <FormattedMessage id="name">
            {(txt) => (
              <input
                className="form-control mb-3"
                type="text"
                name="name"
                required={true}
                onChange={this.onChange}
                placeholder={txt}
              />
            )}
          </FormattedMessage>
          <FormattedMessage id="phone">
            {(txt) => (
              <input
                className="form-control mb-3"
                type="text"
                name="phone"
                required={true}
                onChange={this.onChange}
                placeholder={txt}
              />
            )}
          </FormattedMessage>
          <FormattedMessage id="email">
            {(txt) => (
              <input
                className="form-control mb-3"
                type="email"
                name="email"
                required={true}
                onChange={this.onChange}
                placeholder={txt}
              />
            )}
          </FormattedMessage>
          <FormattedMessage id="message">
            {(txt) => (
              <textarea
                className="form-control mb-3"
                name="message"
                required={true}
                onChange={this.onChange}
                placeholder={txt}
              />
            )}
          </FormattedMessage>

          {this.state.show ? (
            <Alert
              variant="success"
              className="mb-3"
              onClose={() => this.setState({ show: false })}
              dismissible
            >
              <FormattedMessage id="sendMailMessage">
                {(txt) => <p>{txt}</p>}
              </FormattedMessage>
            </Alert>
          ) : (
            ""
          )}
          <FormattedMessage id="requestInspection">
            {(txt) => (
              <button
                type="submit"
                disabled={this.props.isLoading}
                className="btn btn-info w-100 mb-3"
              >
                {this.props.isLoading ? (
                  <Spinner animation="border" size="sm" variant="danger" />
                ) : (
                  ""
                )}
                {txt}
              </button>
            )}
          </FormattedMessage>

          <a href={`tel:${companyPhone}`} className="btn btn-danger w-100">
            <span className="text-white">
              <i className="fas fa-phone-alt mr-1" /> {companyPhone}
            </span>
          </a>
        </form>
      </div>
    );
  }
}
const mapState = (state) => ({
  settings: state.settings.settings,
  isLoading: state.guest.isLoading,
});
const mapDispatch = (dispatch) => ({
  loadSettings: dispatch.settings.loadSettings,
  request: dispatch.guest.request,
});
export default connect(mapState, mapDispatch)(RequestForm);
