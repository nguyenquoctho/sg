import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import HomeItem from "../components/houseItem";
import Dialog from "@material-ui/core/Dialog";
import { Carousel } from "react-bootstrap";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
class FavouritePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { likeHouse: [] };
  }
  async componentDidMount() {
    this.props.setHeaderMenu({ header: 3 });
    if (localStorage.getItem("likeHouse")) {
      this.setState({
        likeHouse: JSON.parse(localStorage.getItem("likeHouse")),
      });
    }
  }
  render() {
    let houses;
    houses = this.state.likeHouse.map((item, index) => {
      return <HomeItem columns={3} house={item} />;
    });

    let numberOfPage = [];
    for (var i = 0; i < Math.ceil(this.props.numberOfHouses / 15); i++) {
      numberOfPage.push(i);
    }

    return (
      <Layout>
        <SEO title="Apartments" />
        <div className="container">
          <FormattedMessage id="favouriteApartment">
            {(txt) => <div className="apartmentTitle">{txt}</div>}
          </FormattedMessage>
          <div className="list-apartment d-flex flex-wrap">{houses}</div>
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
const mapState = (state) => ({ settings: state.settings.settings });
const mapDispatch = (dispatch) => ({ setHeaderMenu: dispatch.header.setState });
export default connect(mapState, mapDispatch)(FavouritePage);
