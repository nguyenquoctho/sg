import React from "react";
import SEO from "../components/seo";
import Layout from "../components/layout";
import Dialog from "@material-ui/core/Dialog";
import CircularProgress from "@material-ui/core/CircularProgress";
import { FormattedMessage } from "react-intl";
import Checkbox from "@material-ui/core/Checkbox";
import { connect } from "react-redux";
import { Cookies } from "react-cookie";
const cookies = new Cookies();
class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.update = this.update.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.props.setCustomer({ [name]: value });
  }
  async update() {
    let customer = this.props.customer;
    let data = {
      id: customer._id,
      phone: customer.phone,
      email: customer.email,
      firstName: customer.firstName,
      lastName: customer.lastName,
      householder: customer.householder,
      renter: customer.renter
    };
    await this.props.update(data);
    let customerId = cookies.get("customer").customer._id;
    await this.props.getById({ id: customerId });
  }
  componentDidMount() {
    if (cookies.get("customer")) {
      let customerId = cookies.get("customer").customer._id;
      this.props.getById({ id: customerId });
    }
  }
  render() {
    let customer = this.props.customer;
    return (
      <Layout>
        <SEO title="Profile" />
        <div className="profile d-flex align-items-center justify-content-center">
          <div className="profile-container d-flex flex-column align-items-center">
            <FormattedMessage id="profileTitle">
              {txt => <div className="profile-title">{txt}</div>}
            </FormattedMessage>

            <div className="profile-inputs">
              <div class="form-group">
                <FormattedMessage id="phone">
                  {txt => <label>{txt}</label>}
                </FormattedMessage>

                <input
                  type="text"
                  class="form-control profile-input"
                  value={customer.phone}
                  name="phone"
                  onChange={this.handleChange}
                />
              </div>
              <div class="form-group">
                <FormattedMessage id="email">
                  {txt => <label>{txt}</label>}
                </FormattedMessage>
                <input
                  type="email"
                  class="form-control profile-input"
                  name="email"
                  value={customer.email}
                  onChange={this.handleChange}
                />
              </div>
              <div class="form-group">
                <FormattedMessage id="firstName">
                  {txt => <label>{txt}</label>}
                </FormattedMessage>
                <input
                  type="text"
                  class="form-control profile-input"
                  name="firstName"
                  value={customer.firstName}
                  onChange={this.handleChange}
                />
              </div>
              <div class="form-group">
                <FormattedMessage id="lastName">
                  {txt => <label>{txt}</label>}
                </FormattedMessage>
                <input
                  type="text"
                  class="form-control profile-input"
                  name="lastName"
                  value={customer.lastName}
                  onChange={this.handleChange}
                />
              </div>

              <div class="form-group">
                <FormattedMessage id="householder">
                  {txt => <label>{txt}</label>}
                </FormattedMessage>
                <Checkbox
                  name="householder"
                  checked={customer.householder === true}
                  onChange={this.handleChange}
                  inputProps={{
                    "aria-label": "primary checkbox"
                  }}
                />
              </div>
              <div class="form-group">
                <FormattedMessage id="renter">
                  {txt => <label>{txt}</label>}
                </FormattedMessage>
                <Checkbox
                  name="renter"
                  checked={customer.renter === true}
                  onChange={this.handleChange}
                  inputProps={{
                    "aria-label": "primary checkbox"
                  }}
                />
              </div>
            </div>
            <FormattedMessage id="update">
              {txt => (
                <button onClick={this.update} className="btn profile-btn">
                  {txt}
                </button>
              )}
            </FormattedMessage>
          </div>
        </div>
        <Dialog open={this.props.loading}>
          <div>
            <CircularProgress size={80} color="secondary" />
          </div>
        </Dialog>
      </Layout>
    );
  }
}
const mapState = state => ({
  customer: state.userCustomer.customer,
  loading: state.userCustomer.loading
});
const mapDispatch = dispatch => ({
  getById: dispatch.userCustomer.getById,
  setCustomer: dispatch.userCustomer.setCustomer,
  update: dispatch.userCustomer.update
});

export default connect(mapState, mapDispatch)(ProfilePage);
