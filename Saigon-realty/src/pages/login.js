import React from "react";
import SEO from "../components/seo";
import { BASE_URL } from "../setting";
import Dialog from "@material-ui/core/Dialog";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import ErrorIcon from "@material-ui/icons/Error";
import { connect } from "react-redux";
import { Link } from "gatsby";
import jwt from "jsonwebtoken";
class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: " ", password: " ", showPassword: false };
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleShowPassword = this.handleShowPassword.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.login = this.login.bind(this);
  }
  handleChangeInput(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  handleShowPassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }
  login() {
    let companyCode = jwt.decode(this.props.settings.apiKey).companyCode;
    let data = {
      phone: this.state.phone,
      password: this.state.password,
      companyCode: companyCode
    };
    this.props.login(data);
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
      <>
        <SEO title="Login" />
        <div
          class="login"
          style={{
            backgroundImage: `url(${BASE_URL}/images/login-background.jpg)`
          }}
        >
          <div className="login-container">
            <img className="login-logo" src={BASE_URL + "/images/logo.png"} />
            <div class="form-group">
              <label for="email">Phone</label>
              <input
                onChange={this.handleChangeInput}
                onKeyDown={this.handlePress}
                class="form-control login-input"
                type="text"
                name="phone"
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <div className="d-flex align-items-center justify-content-end">
                <input
                  onChange={this.handleChangeInput}
                  onKeyDown={this.handlePress}
                  class="form-control login-input"
                  type={this.state.showPassword ? "text" : "password"}
                  name="password"
                />
                {this.state.showPassword ? (
                  <Visibility
                    onClick={this.handleShowPassword}
                    style={{
                      position: "absolute",
                      paddingRight: "5px"
                    }}
                  />
                ) : (
                  <VisibilityOff
                    onClick={this.handleShowPassword}
                    style={{
                      position: "absolute",
                      paddingRight: "5px"
                    }}
                  />
                )}
              </div>
            </div>
            <button onClick={this.login} class="btn login-btn">
              Sign In
            </button>
            <div className="login-footer">
              <Link className="login-footer-item" to="/">
                Forget password?
              </Link>
              <Link className="login-footer-item" to="/register">
                Create an new account
              </Link>
            </div>
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
            horizontal: "center"
          }}
          variant="error"
          open={this.props.isLogin}
          className={"login-alert"}
          onClose={() => this.props.setLogin({ isLogin: false })}
          autoHideDuration={5000}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            <div id="message-id" className="d-flex align-items-center">
              <ErrorIcon style={{ marginRight: "5px" }} />
              Login failed
            </div>
          }
        />
      </>
    );
  }
}
const mapState = state => ({
  settings: state.settings.settings,
  isLogin: state.userCustomer.isLogin,
  loading: state.userCustomer.loading
});
const mapDispatch = dispatch => ({
  login: dispatch.userCustomer.login,
  loadSettings: dispatch.settings.loadSettings,
  setLogin: dispatch.userCustomer.setState
});
export default connect(mapState, mapDispatch)(LoginPage);
