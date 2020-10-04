import React from "react";
import Header from "./header";
import NavBar from "./header/nav";
import { IntlProvider } from "react-intl";
import Footer from "./footer";
import { connect } from "react-redux";
import en from "../data/messages/en";
import vi from "../data/messages/vi";
import MessengerCustomerChat from "react-messenger-customer-chat";
import { FACEBOOK_APP_ID, FACEBOOK_PAGE_ID } from "../setting";
import Phone from "./phone/phone";
import { FormattedMessage } from "react-intl";

const messages = { en, vi };
class Layout extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.loadAllDevices();
    this.props.loadAllProjects();
  }
  render() {
    return (
      <IntlProvider
        locale={this.props.language}
        messages={messages[this.props.language]}
      >
        <Header />
        <NavBar />

        <FormattedMessage id="loggedInGreeting">
          {(txt) => (
            <MessengerCustomerChat
              pageId={FACEBOOK_PAGE_ID}
              appId={FACEBOOK_APP_ID}
              greetingDialogDisplay="hide"
              shouldShowDialog={false}
              loggedInGreeting={txt}
              themeColor="#cd2026"
            />
          )}
        </FormattedMessage>
        <main onScroll={this.scroll}>{this.props.children}</main>
        <Phone />
        <Footer />
      </IntlProvider>
    );
  }
}
const mapState = (state) => ({
  language: state.language.language,
});
const mapDispatch = (dispatch) => ({
  loadAllDevices: dispatch.devices.loadAllDevices,
  loadAllProjects: dispatch.projects.loadAllProjects,
});
export default connect(mapState, mapDispatch)(Layout);
