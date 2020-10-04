import React from "react";
import { BASE_URL } from "../../setting";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Divider from "@material-ui/core/Divider";
import FooterLeft from "./footer-left";
import FooterRight from "./footer-right"
class Footer extends React.Component {
  render() {
    const { settings } = this.props;
    return (
      <div className="footer">
        <div className="container mb-3 ">
          <div className="row w-100 justify-content-between">
            <FooterLeft />
            <FooterRight />
          </div>
        </div>
        <Divider />
        <div className="copy-right">{settings.companyCopyright}</div>
      </div>
    );
  }
}
const mapState = (state) => ({
  isLoading: state.guest.isLoading,
  settings: state.settings.settings,
});
const mapDispatch = (dispatch) => ({
  loadSettings: dispatch.settings.loadSettings,
  request: dispatch.guest.request,
});
export default connect(mapState, mapDispatch)(Footer);
