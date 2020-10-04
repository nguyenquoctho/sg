import React from "react";
import { Link } from "gatsby";
import { Dropdown } from "react-bootstrap";
import SearchIcon from "@material-ui/icons/Search";
import { BASE_URL, COMPANY_CODE } from "../../setting";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import SearchForm from "../search/form";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: "",
      search: "",
      language: "en",
      nation: "en",
    };
    this.handleCollapse = this.handleCollapse.bind(this);
    this.handleCollapseSearch = this.handleCollapseSearch.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
  }

  handleCollapse() {
    this.setState({ search: "" });
    if (this.state.collapse === "show") {
      this.setState({ collapse: "" });
    } else {
      this.setState({ collapse: "show" });
    }
  }
  handleCollapseSearch() {
    this.setState({ collapse: "" });
    if (this.state.search === "show") {
      this.setState({ search: "" });
    } else {
      this.setState({ search: "show" });
    }
  }
  changeLanguage(lang) {
    if (lang === "en") {
      this.setState({ nation: "en" });
      this.props.changeLanguage("en");
    } else if (lang === "vi") {
      this.setState({ nation: "vi" });
      this.props.changeLanguage("vi");
    }
    this.setState({ language: lang });
  }
  render() {
    let headerMenus = [
      { id: "home", link: "/" },
      {
        id: "rent",
        link: `/apartment`,
      },
      {
        id: "sales",
        link: "/sales"
      },
      { id: "favorite", link: "/favourite" },
      { id: "blog", link: "/blog" },
    ];
    return (
      <nav class="navbar-header navbar navbar-expand-lg navbar-light">
        <button
          class="navbar-toggler header-toggler"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={this.handleCollapse}
        >
          <span class="navbar-toggler-icon" />
        </button>
        <Link to="/">
          <img height="100" width="100" src={this.props.settings.companyLogo} />
        </Link>

        <button
          class="header-toggler"
          data-toggle="collapse"
          data-target="#search-collapse"
          aria-controls="search-collapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={this.handleCollapseSearch}
        >
          <SearchIcon />
        </button>

        <div
          className={"collapse navbar-collapse " + this.state.collapse}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mr-auto">
            {headerMenus.map((menu) => {
              return (
                <li className="nav-item">
                  <Link to={menu.link}>
                    <FormattedMessage id={menu.id}>
                      {(txt) => txt}
                    </FormattedMessage>
                  </Link>
                </li>
              );
            })}
            <li className="nav-item">
              <Dropdown>
                <Dropdown.Toggle id="dropdown-custom-components">
                  <div class="d-flex align-items-center">
                    <img
                      height={14}
                      width={14}
                      alt="..."
                      src={`${BASE_URL}/images/${this.state.language}.png`}
                    />
                    <FormattedMessage id={this.state.nation}>
                      {(txt) => <p className="language">{txt}</p>}
                    </FormattedMessage>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => this.changeLanguage("en")}>
                    <div className="d-flex align-items-center">
                      <img
                        height={14}
                        width={14}
                        alt="..."
                        src={BASE_URL + "/images/en.png"}
                      />
                      <FormattedMessage id="en">
                        {(txt) => <p className="language">{txt}</p>}
                      </FormattedMessage>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => this.changeLanguage("vi")}>
                    <div className="d-flex align-items-center">
                      <img
                        height={14}
                        width={14}
                        alt="..."
                        src={BASE_URL + "/images/vi.png"}
                      />
                      <FormattedMessage id="vi">
                        {(txt) => <p className="language">{txt}</p>}
                      </FormattedMessage>
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>

        <div
          className={"collapse navbar-collapse " + this.state.search}
          id="search-collapse"
        >
          <SearchForm />
        </div>
      </nav>
    );
  }
}
const mapState = (state) => ({
  housesByQuery: state.houses.housesByQuery,
  amenities: state.amenities.amenities,
  allDevices: state.devices.allDevices,
  projects: state.projects.projects,
  settings: state.settings.settings,
  query: state.houses.query,
});
const mapDispatch = (dispatch) => ({
  setQuery: dispatch.houses.setState,
  setQueryFilter: dispatch.houses.setQueryFilter,
  setQuerySort: dispatch.houses.setQuerySort,
  setQueryPrice: dispatch.houses.setQueryPrice,
  clearQueryFilter: dispatch.houses.clearQueryFilter,
  loadHousesByQuery: dispatch.houses.loadHousesByQuery,
  loadAllAmenities: dispatch.amenities.loadAllAmenities,
  loadAllProjects: dispatch.projects.loadAllProjects,
  loadAllDevices: dispatch.devices.loadAllDevices,
  changeLanguage: dispatch.language.changeLanguage,
  loadSettings: dispatch.settings.loadSettings,
  listCompanyHouses: dispatch.houses.listCompanyHouses,
});
export default connect(mapState, mapDispatch)(NavBar);
