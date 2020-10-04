import React from "react";
import SEO from "../components/seo";
import Layout from "../components/layout";
import Dialog from "@material-ui/core/Dialog";
import { FormattedMessage } from "react-intl";
import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import ErrorIcon from "@material-ui/icons/Error";
import { connect } from "react-redux";
import jwt from "jsonwebtoken";
class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: " ",
      password: " ",
      showPassword: false,
      agree: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleShowPassword = this.handleShowPassword.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.register = this.register.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }
  handleShowPassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }
  register() {
    let companyCode = jwt.decode(this.props.settings.apiKey).companyCode;
    let data = {
      username: this.state.username,
      phone: this.state.phone,
      password: this.state.password,
      companyCode: companyCode,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      householder: this.state.householder,
      renter: this.state.renter,
    };
    this.props.register(data);
    let customer = {
      ...data,
      age: 0,
      dob: 0,
      ward: "",
      district: "",
      city: "",
      address: "",
      identifyCard: "",
      identifyCardIssue: "",
      identifyCardPlace: "",
      identityCardExpired: "",
    };
    this.props.registerCustomer(customer);
  }
  handlePress(event) {
    if (event.keyCode === 13) {
      this.login();
    }
  }
  componentDidMount() {
    this.props.loadSettings({});
  }
  render() {
    return (
      <Layout>
        <SEO title="Register" />
        <div className="profile d-flex align-items-center justify-content-center">
          <div className="profile-container d-flex flex-column align-items-center">
            <FormattedMessage id="registerTitle">
              {(txt) => <div className="profile-title">{txt}</div>}
            </FormattedMessage>

            <div className="profile-inputs">
              <div class="form-group">
                <FormattedMessage id="username">
                  {(txt) => <label>{txt}</label>}
                </FormattedMessage>
                <input
                  type="text"
                  class="form-control profile-input"
                  name="username"
                  onChange={this.handleChange}
                />
              </div>
              <div class="form-group">
                <FormattedMessage id="password">
                  {(txt) => <label>{txt}</label>}
                </FormattedMessage>
                <input
                  type="text"
                  class="form-control profile-input"
                  name="password"
                  onChange={this.handleChange}
                />
              </div>
              <div class="form-group">
                <FormattedMessage id="phone">
                  {(txt) => <label>{txt}</label>}
                </FormattedMessage>
                <input
                  type="text"
                  class="form-control profile-input"
                  name="phone"
                  onChange={this.handleChange}
                />
              </div>
              <div class="form-group">
                <FormattedMessage id="email">
                  {(txt) => <label>{txt}</label>}
                </FormattedMessage>
                <input
                  type="email"
                  class="form-control profile-input"
                  name="email"
                  onChange={this.handleChange}
                />
              </div>
              <div class="form-group">
                <FormattedMessage id="firstName">
                  {(txt) => <label>{txt}</label>}
                </FormattedMessage>
                <input
                  type="text"
                  class="form-control profile-input"
                  name="firstName"
                  onChange={this.handleChange}
                />
              </div>
              <div class="form-group">
                <FormattedMessage id="lastName">
                  {(txt) => <label>{txt}</label>}
                </FormattedMessage>
                <input
                  type="text"
                  class="form-control profile-input"
                  name="lastName"
                  onChange={this.handleChange}
                />
              </div>

              <div class="form-group">
                <FormattedMessage id="householder">
                  {(txt) => <label>{txt}</label>}
                </FormattedMessage>
                <Checkbox
                  name="householder"
                  onChange={this.handleChange}
                  inputProps={{
                    "aria-label": "primary checkbox",
                  }}
                />
              </div>
              <div class="form-group">
                <FormattedMessage id="renter">
                  {(txt) => <label>{txt}</label>}
                </FormattedMessage>
                <Checkbox
                  name="renter"
                  onChange={this.handleChange}
                  inputProps={{
                    "aria-label": "primary checkbox",
                  }}
                />
              </div>
              <div class="form-group">
                <Checkbox
                  name="agree"
                  onChange={this.handleChange}
                  color="primary"
                />
                <FormattedMessage id="agreeTerm">
                  {(txt) => (
                    <a
                      style={{ textDecoration: "underline !important" }}
                      href="/#"
                    >
                      {txt}
                    </a>
                  )}
                </FormattedMessage>
              </div>
            </div>
            <FormattedMessage id="register">
              {(txt) => (
                <button
                  disabled={!this.state.agree}
                  onClick={this.register}
                  className="btn profile-btn"
                >
                  {txt}
                </button>
              )}
            </FormattedMessage>
          </div>
        </div>
        <Dialog open={this.props.loading}>
          <div>
            <CircularProgress color="secondary" />
          </div>
        </Dialog>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          variant="error"
          open={this.props.isLogin}
          className={"login-alert"}
          onClose={() => this.props.setLogin({ isLogin: false })}
          autoHideDuration={2000}
          ContentProps={{
            "aria-describedby": "message-id",
          }}
          message={
            <div id="message-id" className="d-flex align-items-center">
              <ErrorIcon style={{ marginRight: "5px" }} />
              Login failed
            </div>
          }
        />
      </Layout>
    );
  }
}
const mapState = (state) => ({
  settings: state.settings.settings,
  loading: state.userCustomer.loading,
});
const mapDispatch = (dispatch) => ({
  register: dispatch.userCustomer.register,
  registerCustomer: dispatch.customer.register,
  loadSettings: dispatch.settings.loadSettings,
});
export default connect(mapState, mapDispatch)(RegisterPage);
