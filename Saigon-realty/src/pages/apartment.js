import React from "react";
import { Link } from "gatsby";
import Pagination from "react-bootstrap/Pagination";
import Layout from "../components/layout";
import Checkbox from "@material-ui/core/Checkbox";
import SEO from "../components/seo";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Carousel } from "react-bootstrap";
import HomeItem from "../components/houseItem";
import Dialog from "@material-ui/core/Dialog";
import Badge from "@material-ui/core/Badge";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import queryString, { parse } from "query-string";
import { COMPANY_CODE, houseFurnitures, houseTypes } from "../setting";
import { FormattedMessage } from "react-intl";
class ApartmentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      show: "",
      devicesArray: [],
      accommodate: "",
      bedroom: "",
      bathroom: "",
      accommodate: "",
      furniture: "",
      projectId: "",
      filter: {},
      params: {
        bedroom: "",
        bathroom: "",
        accommodate: "",
        projectId: "",
        min: "",
        max: "",
      },
      min: 0,
      max: 9999999,
      sort: "recentPost",
    };
    this.handleDevices = this.handleDevices.bind(this);
    this.showMoreFilter = this.showMoreFilter.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleApply = this.handleApply.bind(this);
    this.changePage = this.changePage.bind(this);
  }
  handleDevices(event, id) {
    if (event.target.checked === true) {
      this.setState({ devicesArray: [...this.state.devicesArray, id] });
    } else {
      this.setState({
        devicesArray: this.state.devicesArray.filter((item) => {
          return item !== id;
        }),
      });
    }
  }
  
  showMoreFilter() {
    if (this.state.show === "") {
      this.setState({ show: " show-more-filter" });
    } else {
      this.setState({ show: "" });
    }
  }
  handleSort(event) {
    let value = event.target.value;
    this.setState({ sort: value });
  }
  handleFilter() {
    const params = this.props.query;
    this.props.listCompanyRentHouses({
      ...params,
      query: { ...this.state.filter, ...params.query },
      // page: 1,
      // sort: "-date_post",
    });
  }

  async handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    await this.setState({
      [name]: value,
    });
    if (
      name === "bedroom" ||
      name === "bathroom" ||
      name === "accommodate" ||
      name === "min" ||
      name === "max"
    ) {
      value = parseInt(value);
    }
    if (name === "min" || name === "max") {
      await this.setState({
        filter: {
          ...this.state.filter,
          price: {
            $gt: parseInt(this.state.min),
            $lt: parseInt(this.state.max),
          },
        },
      });
    } else {
      await this.setState({
        filter: { ...this.state.filter, [name]: value },
      });
    }
    await this.handleFilter();
  }
  handleApply() {
    this.setState({ show: "" });
    this.setState({
      filter: { ...this.state.filter, devices: this.state.devicesArray },
    });
    this.handleFilter();
  }
  async changePage(page) {
    window.scrollTo(0, 0);
    let params = queryString.parseUrl(window.location.href).query;
    let url = queryString.parseUrl(window.location.href).url;
    params["page"] = page;
    window.history.pushState(
      null,
      null,
      url + "?" + queryString.stringify(params)
    );
    this.props.setQueryPage(parseInt(page));
    this.props.listCompanyRentHouses({ ...this.props.query, page: parseInt(page) });
  }
  async componentDidMount() {
    await this.props.loadAllDevicesRentPage();
    this.props.setHeaderMenu({ header: 1 });
    let params = queryString.parseUrl(window.location.href).query;

    // Load all houses
    let query = {};
    let page = 1;
    if (params.projectId) {
      query["projectId"] = params.projectId;
    }
    if (params.type) {
      query["type"] = params.type;
    }
    if (params.type) {
      query["type"] = params.type;
    }
    if (params.bathroom) {
      query["bathroom"] = parseInt(params.bathroom);
    }
    if (params.bedroom) {
      query["bedroom"] = parseInt(params.bedroom);
    }
    if (params.accommodate) {
      query["accommodate"] = parseInt(params.accommodate);
    }
    if (params.district) {
      query["district"] = params.district;
    }
    if (params.search) {
      query["$text"] = {
        $search: params.search,
      };
    }
    if (params.page) {
      page = parseInt(params.page);
    }
    if (params.min && params.max)
      query["price"] = {
        $gt: parseInt(params.min),
        $lt: parseInt(params.max),
      };
    await this.props.setQuery({ query: query, page: page });
    await this.props.listCompanyRentHouses(this.props.query);
  }
  render() {
    console.log(this.state.devicesArray)
    const filter = [
      {
        id: "bedroom",
        label: "bedroom",
        options: [
          {
            text: "1",
            value: 1,
          },
          {
            text: "2",
            value: 2,
          },
          {
            text: "3",
            value: 3,
          },
          {
            text: "4",
            value: 4,
          },
        ],
      },
      {
        id: "bathroom",
        label: "bathroom",
        options: [
          {
            text: "1",
            value: 1,
          },
          {
            text: "2",
            value: 2,
          },
          {
            text: "3",
            value: 3,
          },
          {
            text: "4",
            value: 4,
          },
        ],
      },
      {
        id: "min",
        label: "min",
        options: [
          {
            text: "400",
            value: 400,
          },
          {
            text: "600",
            value: 600,
          },
          {
            text: "800",
            value: 800,
          },
          {
            text: "1000",
            value: 1000,
          },
          {
            text: "1200",
            value: 1200,
          },
        ],
      },
      {
        id: "max",
        label: "max",
        options: [
          {
            text: "600",
            value: 600,
          },
          {
            text: "800",
            value: 800,
          },
          {
            text: "1000",
            value: 1000,
          },
          {
            text: "1200",
            value: 1200,
          },
          {
            text: "1000",
            value: 1000,
          },
          {
            text: "1500",
            value: 1500,
          },
          {
            text: "2000",
            value: 2000,
          },
        ],
      },
    ];
    let houses = this.props.housesByQuery
      ? this.props.housesByQuery
          .sort((a, b) => {
            switch (this.state.sort) {
              case "recentPost":
                return b.date_post - a.date_post;
              case "highToLow":
                return b.price - a.price;
              case "lowToHigh":
                return a.price - b.price;

              default:
                return b.date_post - a.date_post;
            }
          })
          .filter(item => item.available !== "Unavailable")
          .map((item, index) => {
            return <HomeItem columns={3} house={item} />;
          })
      : "";
    let numberOfPage = [];

    for (var i = 0; i < Math.ceil(this.props.numberOfHouses / 15); i++) {
      numberOfPage.push(i + 1);
    }
    let pagination = numberOfPage.map((item) => {
      let active;
      if (item === this.props.query.page) {
        active = "active";
      } else {
        active = "";
      }
      return (
        <React.Fragment>
          <li class={"page-item " + active}>
            <a class="page-link" onClick={() => this.changePage(item)}>
              {item}
            </a>
          </li>
        </React.Fragment>
      );
    });
    return (
      <Layout>
        <SEO title="Apartments" />
        {/* Filter */}
        <div className="filter-container">
          <div className="filter">
            <div className="filter-items d-flex align-items-center justify-content-between flex-wrap">
              <div className="d-flex">
                <div class="form-group mb-2 mr-2">
                  <select
                    className="form-control"
                    name="type"
                    onChange={this.handleChange}
                  >
                    <option value="all">Home Type</option>
                    {houseTypes.map((type) => {
                      return (
                        <FormattedMessage id={type.id}>
                          {(txt) => (
                            <option
                              value={type.value}
                              selected={type.value === this.state.params.type}
                            >
                              {txt}
                            </option>
                          )}
                        </FormattedMessage>
                      );
                    })}
                  </select>
                </div>
                <div class="form-group mb-2 mr-2">
                  <select
                    name="projectId"
                    onChange={this.handleChange}
                    className="form-control"
                  >
                    <FormattedMessage id="selectProject">
                      {(txt) => <option value="">{txt}</option>}
                    </FormattedMessage>
                    {this.props.projects.map((item) => {
                      return (
                        <option
                          selected={item._id === this.state.params.projectId}
                          value={item._id}
                        >
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                {filter.map((item) => {
                  return (
                    <div class="form-group mb-2 mr-2 ">
                      <select
                        className="form-control"
                        name={item.id}
                        onChange={this.handleChange}
                      >
                        <FormattedMessage id={item.label}>
                          {(txt) => <option value="">{txt}</option>}
                        </FormattedMessage>
                        {item.options.map((option) => {
                          return (
                            <option value={option.value}>{option.text}</option>
                          );
                        })}
                      </select>
                    </div>
                  );
                })}
              </div>
              <div className="right-filter">
                <Badge
                  color="secondary"
                  badgeContent={this.state.devicesArray.length}
                >
                  <FormattedMessage id="moreFilter">
                    {(txt) => (
                      <div
                        onClick={this.showMoreFilter}
                        className="more-filter-btn"
                        data-toggle="collapse"
                        href="#collapseMoreFilter"
                        role="button"
                        aria-expanded="false"
                        aria-controls="collapseMoreFilter"
                      >
                        {txt}
                        <i class="ml-2 mt-1 fas fa-angle-down" />
                      </div>
                    )}
                  </FormattedMessage>
                </Badge>
              </div>
            </div>
          </div>
        </div>
        {/* end Filter */}
        <div
          id="collapseMoreFilter"
          className={"more-filter " + this.state.show}
        >
          <div className="close-filter">
            <i onClick={this.showMoreFilter} class="fas fa-times" />
          </div>
          <div className="container d-flex flex-column">
            <FormattedMessage id="basicFeature">
              {(txt) => <div className="more-filter-title">{txt}</div>}
            </FormattedMessage>
            <div className="more-filter-items row d-flex justify-content-between">
              <div className="col-12 col-md-6 col-md-6">
                <select
                  name="accommodate"
                  onChange={this.handleChange}
                  className="form-control mb-3"
                >
                  <FormattedMessage id="accommodate">
                    {(txt) => <option value="">{txt}</option>}
                  </FormattedMessage>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                  <option value={10}>10+</option>
                </select>
              </div>
              <div className="col-12 col-md-6 col-md-6">
                <select
                  name="furniture"
                  onChange={this.handleChange}
                  className="more-filter-item form-control"
                >
                  {houseFurnitures.map((furniture) => {
                    return (
                      <FormattedMessage id={furniture.id}>
                        {(txt) => (
                          <option value={furniture.value}>{txt}</option>
                        )}
                      </FormattedMessage>
                    );
                  })}
                </select>
              </div>
            </div>
            <FormattedMessage id="requiredHomeAutomation">
              {(txt) => <div className="more-filter-title">{txt}</div>}
            </FormattedMessage>

            <div className="more-filter-amenities d-flex flex-wrap">
              {this.props.requireFactors.map((item) => {
                return (
                  <FormattedMessage id={item.name_id}>
                    {(txt) => (
                      <div className="more-filter-switch d-flex align-items-center">
                        <Checkbox
                          onChange={(event) =>
                            this.handleDevices(event, item._id)
                          }
                          value=""
                          color="primary"
                          inputProps={{
                            "aria-label": "secondary checkbox",
                          }}
                        />
                        {txt}
                      </div>
                    )}
                  </FormattedMessage>
                );
              })}
            </div>
            <FormattedMessage id="apply">
              {(txt) => (
                <button onClick={this.handleApply} className="apply-btn">
                  {txt}
                </button>
              )}
            </FormattedMessage>
          </div>
        </div>

        <FormattedMessage id="apartmentTitle">
          {(txt) => <div className="apartmentTitle container">{txt}</div>}
        </FormattedMessage>

        <div className="sort-area d-flex container align-items-center">
          <FormattedMessage id="sortBy">
            {(txt) => <p className="sort-title">{txt}</p>}
          </FormattedMessage>
          <div class="form-group mb-2 mr-2 ">
            <select
              className="filter-item form-control"
              onChange={this.handleSort}
            >
              <FormattedMessage id="recentPost">
                {(txt) => <option value="recentPost">{txt}</option>}
              </FormattedMessage>
              <FormattedMessage id="priceHighToLow">
                {(txt) => <option value="highToLow">{txt}</option>}
              </FormattedMessage>
              <FormattedMessage id="priceLowToHigh">
                {(txt) => <option value="lowToHigh">{txt}</option>}
              </FormattedMessage>
            </select>
          </div>
        </div>

        <div className=" container d-flex flex-wrap">{houses}</div>
        <div className="d-flex justify-content-center">
          <Pagination>
            <Pagination.Prev />
            {pagination}
            <Pagination.Next />
          </Pagination>
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
const mapState = (state) => ({
  housesByQuery: state.houses.housesByQuery,
  numberOfHouses: state.houses.numberOfHouses,
  allDevices: state.devices.allDevices,
  requireFactors: state.devices.requireFactors,
  projects: state.projects.projects,
  query: state.houses.query,
  loading: state.houses.loading,
  settings: state.settings.settings,
});
const mapDispatch = (dispatch) => ({
  setQuery: dispatch.houses.setState,
  setQueryFilter: dispatch.houses.setQueryFilter,
  setQuerySort: dispatch.houses.setQuerySort,
  setQueryPrice: dispatch.houses.setQueryPrice,
  setQueryPage: dispatch.houses.setQueryPage,
  setQueryDevices: dispatch.houses.setQueryDevices,
  clearQueryFilter: dispatch.houses.clearQueryFilter,
  loadHousesByQuery: dispatch.houses.loadHousesByQuery,
  loadHousesByQueryNoLimit: dispatch.houses.loadHousesByQueryNoLimit,
  loadAllDevices: dispatch.devices.loadAllDevices,
  loadAllDevicesRentPage: dispatch.devices.loadAllDevicesRentPage,
  loadAllProjects: dispatch.projects.loadAllProjects,
  setHeaderMenu: dispatch.header.setState,
  listCompanyRentHouses: dispatch.houses.listCompanyRentHouses,
  setQuery: dispatch.houses.setQuery,
});
export default connect(mapState, mapDispatch)(ApartmentPage);
