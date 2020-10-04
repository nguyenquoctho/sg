import React from "react";
import SEO from "../seo";
import Dialog from "@material-ui/core/Dialog";
import CircularProgress from "@material-ui/core/CircularProgress";
import Layout from "../layout";
import { connect } from "react-redux";
import QuickGuide from "./quickguide";
import FeatureProperties from "./featureproperties";
import FeatureProject from "./featureproject";
import BannerContent from "./banner-content";
import BannerFooter from "./banner-footer";

let district = [
  { area: "all", search: "all" },
  { area: "dist1", search: "1" },
  { area: "dist2", search: "2" },
  { area: "dist3", search: "3" },
  { area: "dist4", search: "4" },
  { area: "dist5", search: "5" },
  { area: "dist7", search: "7" },
  { area: "binhThanh", search: "Bình Thạnh" },
];

class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileHidden: "mobile-hidden",
      devicesArray: [],
      districtActive: 0,
      filter: [],
    };
    this.selectDistrict = this.selectDistrict.bind(this);
    this.filterDistrict = this.filterDistrict.bind(this);
    this.mobileDistrict = this.mobileDistrict.bind(this);
  }
  selectDistrict(place, index) {
    this.setState({ districtActive: index });
    if (place === "all") {
      this.props.listCompanyClientHouses({
        sort: "-date_post",
      });
    } else {
      this.props.listCompanyClientHouses({
        query: { district: place },
        sort: "-date_post",
      });
    }
  }
  mobileDistrict(event) {
    if (event.target.value === "all") {
      this.props.listCompanyClientHouses({});
    } else {
      this.props.listCompanyClientHouses({
        query: { district: event.target.value },
      });
    }
  }
  filterDistrict(district) {
    this.props.setQuerySearch(district);
  }

  async componentDidMount() {
    this.props.listCompanyClientHouses({ sort: "-date_post" });
    this.props.setHeaderMenu({ header: 0 });
  }
  render() {
    return (
      <Layout>
        <SEO title="Home" />
        <div className="d-flex flex-column">
          <BannerContent district={district} settings={this.props.settings} />
          <BannerFooter />
          <QuickGuide />
          <FeatureProperties
            district={district}
            districtActive={this.state.districtActive}
            selectDistrict={this.selectDistrict}
            houses={this.props.housesByQuery}
          />
          <FeatureProject houses={this.props.housesByQuery} />
          <Dialog open={this.props.loading}>
            <div>
              <CircularProgress size={80} color="secondary" />
            </div>
          </Dialog>
        </div>
      </Layout>
    );
  }
}
const mapState = (state) => ({
  housesByQuery: state.houses.housesByQuery,
  allDevices: state.devices.allDevices,
  query: state.houses.query,
  settings: state.settings.settings,
  loading: state.houses.loading,
  projects: state.projects.projects,
});
const mapDispatch = (dispatch) => ({
  setQuery: dispatch.houses.setState,
  setQueryFilter: dispatch.houses.setQueryFilter,
  setQuerySearch: dispatch.houses.setQuerySearch,
  setQueryPrice: dispatch.houses.setQueryPrice,
  setQueryDevices: dispatch.houses.setQueryDevices,
  clearQueryFilter: dispatch.houses.clearQueryFilter,
  clearQuery: dispatch.houses.clearQuery,
  loadHousesByQuery: dispatch.houses.loadHousesByQuery,
  loadHousesByQueryNoLimit: dispatch.houses.loadHousesByQueryNoLimit,
  setHeaderMenu: dispatch.header.setState,
  listCompanyClientHouses: dispatch.houses.listCompanyClientHouses,
});
export default connect(mapState, mapDispatch)(HomeView);
