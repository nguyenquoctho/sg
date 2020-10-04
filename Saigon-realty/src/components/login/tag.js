import React from "react";
import { BASE_URL } from "../../setting";
import { Link } from "gatsby";
import { Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { Cookies } from "react-cookie";
const cookies = new Cookies();
class LoginTag extends React.Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }
  logOut() {
    cookies.remove("customer", { path: "/" });
    window.location.reload();
  }
  render() {
    return (
      <div className="header-login">
        <Dropdown>
          <Dropdown.Toggle id="dropdown-custom-components">
            <div class="d-flex align-items-center">
              <img
                height={18}
                width={18}
                src={`${BASE_URL}/images/login-user.png`}
              />
              <p class="language">{this.props.customer.username}</p>
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>
              <Link to="/profile">Profile</Link>
            </Dropdown.Item>
            <Dropdown.Item onClick={this.logOut}>Log Out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}
const mapState = state => ({});
const mapDispatch = dispatch => ({});
export default connect(mapState, mapDispatch)(LoginTag);
