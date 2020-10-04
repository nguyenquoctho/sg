import { Link } from "gatsby";
import React from "react";
import { Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { BASE_URL, COMPANY_CODE } from "../../setting";
import { FormattedMessage } from "react-intl";
import { navigate } from "@reach/router";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: "english",
      nation: "english",
      search: "",
    };
    this.changeLanguage = this.changeLanguage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.scroll = this.scroll.bind(this);
  }
  changeLanguage(lang) {
    this.props.changeLanguage(lang);
  }
  handleChange(event) {
    let value = event.target.value;
    let name = event.target.name;
    this.setState({
      [name]: value,
    });
  }
  scroll() {
    if (window.pageYOffset > 100) {
      this.setState({
        background: "scroll-header",
        listItem: " scroll-list-item",
        scrollActive: " scroll-list-item-active",
        scrollText: " scroll-text",
      });
    } else {
      this.setState({
        background: "",
        listItem: "",
        scrollActive: " list-item-active",
        scrollText: "",
      });
    }
  }

  componentDidMount() {
    this.props.loadSettings({ companyCode: COMPANY_CODE });
    window.addEventListener("scroll", this.scroll);
  }
  render() {
    let headerMenus = [
      { id: "home", 
        link: "/" },
      {
        id: "rent",
        link: `/apartment`,
      },
      {
        id: "sales",
        link: `/sales`
      },
      { id: "favorite", 
        link: "/favourite" 
      },
      { id: "blog", 
        link: "/blog" 
      },
    ];
    return (
      <div
        className={"header-content align-items-center justify-content-between "}
        onScroll={this.scroll}
      >
        <div className={"header-left d-flex "}>
          <div className="header-logo">
            <Link to="/">
              <img
                height="80"
                width="80"
                alt="..."
                src={this.props.settings.companyLogo}
              />
            </Link>
          </div>
          <div className="header-list d-flex ">
            {headerMenus.map((menu, index) => {
              let active;
              if (this.props.header === index) {
                active = "list-item-active";
              } else {
                active = "";
              }
              return (
                <Link
                  key={index}
                  to={menu.link}
                  className={"list-item " + active}
                >
                  <FormattedMessage id={menu.id}>
                    {(txt) => txt}
                  </FormattedMessage>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="header-right d-flex align-items-center justify-content-end">
          <div className="header-search">
            <form action={`/apartment`}>
              <FormattedMessage id="searchPlaceHolder">
                {(txt) => (
                  <input
                    type="text"
                    class="form-control"
                    name="search"
                    onChange={this.handleChange}
                    placeholder={txt}
                  />
                )}
              </FormattedMessage>
            </form>
          </div>
          <div className="header-language">
            <Dropdown className="py-0">
              <Dropdown.Toggle id="dropdown-custom-components">
                <div class="d-flex align-items-center">
                  <img
                    alt="..."
                    height={18}
                    width={18}
                    src={`${BASE_URL}/images/${this.props.language}.png`}
                  />

                  <FormattedMessage id={this.props.language}>
                    {(txt) => <p className="language">{txt}</p>}
                  </FormattedMessage>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => this.changeLanguage("en")}>
                  <div className="d-flex align-items-center">
                    <img
                      height={24}
                      width={24}
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
                      height={24}
                      width={24}
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
          </div>
        </div>
      </div>
    );
  }
}
const mapState = (state) => ({
  query: state.houses.query,
  settings: state.settings.settings,
  header: state.header.header,
  language: state.language.language,
});
const mapDispatch = (dispatch) => ({
  setQuery: dispatch.houses.setState,
  loadHousesByQuery: dispatch.houses.loadHousesByQuery,
  loadSettings: dispatch.settings.loadSettings,
  changeLanguage: dispatch.language.changeLanguage,
  listCompanyHouses: dispatch.houses.listCompanyHouses,
});
export default connect(mapState, mapDispatch)(Header);
