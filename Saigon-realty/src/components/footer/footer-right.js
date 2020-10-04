import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert, Spinner } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
class FooterRight extends Component {
constructor(props) {
    super(props)

    this.state = {
        show: false
    }
    this.sendContact = this.sendContact.bind(this);
    this.onChange = this.onChange.bind(this);
}
async sendContact(event) {
    event.preventDefault();
    const { name, phone, email, message } = this.state;
    const data = {
      subject: "Contact",
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
    return (
      <>
        <div className="col-12 col-md-6 col-lg-6 contact-us d-flex flex-column">
          <form onSubmit={(event) => this.sendContact(event)}>
            <FormattedMessage id="contactUs">
              {(txt) => <div className="footer-item-title">{txt}</div>}
            </FormattedMessage>
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
            <div className="d-flex justify-content-start">
              <button type="submit" className="footer-item-btn mt-0 send">
                {this.props.isLoading ? (
                  <Spinner animation="border" size="sm" variant="light" />
                ) : (
                  ""
                )}
                <FormattedMessage id="send">{(txt) => txt}</FormattedMessage>
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}
const mapState = (state) => ({
    isLoading: state.guest.isLoading,
});
const mapDispatch = (dispatch) => ({
    loadSettings: dispatch.settings.loadSettings,
    request: dispatch.guest.request,
});
export default connect(mapState, mapDispatch)(FooterRight);
