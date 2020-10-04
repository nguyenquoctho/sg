import React from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "@reach/router";
import { BASE_URL } from "../../setting";
import Divider from "@material-ui/core/Divider";
import * as moment from "moment";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
class HouseItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { like: false, likeArray: [] };
    this.toogleLike = this.toogleLike.bind(this);
    this.changeProduct = this.changeProduct.bind(this);
  }

  async toogleLike() {
    await this.setState({ like: !this.state.like });
    if (this.state.like === true) {
      await this.props.setLikeHouse(this.props.house);
      await localStorage.setItem(
        "likeHouse",
        JSON.stringify(this.props.likeList)
      );
    } else {
      await this.props.removeLikeHouse(this.props.house);
      localStorage.setItem("likeHouse", JSON.stringify(this.props.likeList));
    }
  }
  async changeProduct(slug) {
    await this.props.loadHouseBySlug(slug);
  }
  async componentDidMount() {
    if (localStorage.getItem("likeHouse")) {
      let likeHouse = [];
      JSON.parse(localStorage.getItem("likeHouse")).map((item) => {
        likeHouse.push(item._id);
      });
      await this.setState({ likeArray: likeHouse });
      if (this.state.likeArray.includes(this.props.house._id)) {
        await this.setState({ like: true });
      }
    }
  }
  render() {
    return (
      <div className={`house-item column-${this.props.columns} ml-0 mr-2`}>
        <div className="house-item-img d-flex flex-column justify-content-between">
          <div className="like-icon d-flex justify-content-between">
            {this.state.like ? (
              <img
                onClick={() => this.toogleLike()}
                id={"like-icon-full-" + this.props.house._id}
                className="like-icon-full"
                height={24}
                width={24}
                src={BASE_URL + "/images/like-icon-full.png"}
              />
            ) : (
              <img
                onClick={() => this.toogleLike()}
                className="like-icon-solid"
                id={"like-icon-solid-" + this.props.house._id}
                height={24}
                width={24}
                alt="..."
                src={BASE_URL + "/images/like-icon-solid.png"}
              />
            )}
            {this.props.house.available ? (
              this.props.house.available == "Available" ? (
                <div className={"house-available " + this.props.house.typeSale}>
                  <FormattedMessage id={this.props.house.typeSale}>
                    {(txt) => txt}
                  </FormattedMessage>
                </div>
              ) : (
                <div
                  className={"house-available " + this.props.house.available}
                >
                  <FormattedMessage id={this.props.house.available}>
                    {(txt) => txt}
                  </FormattedMessage>
                </div>
              )
            ) : (
              ""
            )}
          </div>

          <Carousel interval={9999999999999} indicators={false}>
            <Carousel.Item>
              <Link
                onClick={() => this.changeProduct(this.props.house.slug)}
                to={`/detail/${this.props.house.slug}`}
                className="house-code m-0"
              >
                <img
                  className="house-item-image"
                  src={
                    this.props.house.images[0] ||
                    BASE_URL + "/images/default.jpg"
                  }
                  alt="First slide"
                />
              </Link>
            </Carousel.Item>
            <Carousel.Item>
              <Link
                onClick={() => this.changeProduct(this.props.house.slug)}
                to={`/detail/${this.props.house.slug}`}
                className="house-code m-0"
              >
                <img
                  className="house-item-image"
                  src={
                    this.props.house.images[1] ||
                    BASE_URL + "/images/default.jpg"
                  }
                  alt="Third slide"
                />
              </Link>
            </Carousel.Item>
            <Carousel.Item>
              <Link
                onClick={() => this.changeProduct(this.props.house.slug)}
                to={`/detail/${this.props.house.slug}`}
                className="house-code m-0"
              >
                <img
                  className="house-item-image"
                  src={
                    this.props.house.images[2] ||
                    BASE_URL + "/images/default.jpg"
                  }
                  alt="Third slide"
                />
              </Link>
            </Carousel.Item>
          </Carousel>
        </div>
        <Link
          onClick={() => this.changeProduct(this.props.house.slug)}
          to={`/detail/${this.props.house.slug}`}
          className="house-code m-0"
        >
          <div>
            <div className="pl-3 mb-1 mt-2">
              <NumberFormat
                value={this.props.house.price}
                displayType={"text"}
                prefix={"$"}
                className="font-weight-bold homeprice"
                thousandSeparator={true}
              />
            </div>
            <Link
              onClick={() => this.changeProduct(this.props.house.slug)}
              to={`/detail/${this.props.house.slug}`}
              className="house-code"
            >
              {this.props.house.houseCode}
            </Link>
            <Link
              onClick={() => this.changeProduct(this.props.house.slug)}
              to={`/detail/${this.props.house.slug}`}
            >
              <div className="ml-3 mt-1 projectname">
                {this.props.house.project && this.props.house.project.name}
              </div>
            </Link>
            <div className="home-detail d-flex justify-content-start">
              {this.props.house.bedroom ? (
                <div className="home-detail-item d-flex align-items-center">
                  <img
                    className="home-detail-img"
                    src={BASE_URL + "/images/bed.png"}
                  />
                  {this.props.house.bedroom}
                </div>
              ) : (
                ""
              )}
              {this.props.house.bathroom ? (
                <div className="home-detail-item d-flex align-items-center">
                  <img
                    className="home-detail-img"
                    src={BASE_URL + "/images/bath.png"}
                  />
                  {this.props.house.bathroom}
                </div>
              ) : (
                ""
              )}

              <FormattedMessage id="district">
                {(txt) => (
                  <div className="home-detail-item d-flex align-items-center">
                    <img
                      className="home-detail-img"
                      src={BASE_URL + "/images/map.png"}
                    />
                    {txt + " " + this.props.house.district}
                  </div>
                )}
              </FormattedMessage>
            </div>
            <Divider />
            <div className={"px-3 py-2 d-flex"}>
              <img
                className="home-detail-img"
                src={BASE_URL + "/images/map.png"}
              />
              <FormattedMessage id="district">
                {(txt) => (
                  <div className="house-address">
                    {this.props.house.street
                      ? `${this.props.house.street}, `
                      : ""}
                    {this.props.house.ward ? (
                      <FormattedMessage id="ward">
                        {(text) => `${text} ${this.props.house.ward}, `}
                      </FormattedMessage>
                    ) : (
                      ""
                    )}
                    {this.props.house.district ? (
                      <FormattedMessage id="district">
                        {(text) => `${text} ${this.props.house.district}, `}
                      </FormattedMessage>
                    ) : (
                      ""
                    )}
                    {this.props.house.city ? `${this.props.house.city}` : ""}
                  </div>
                )}
              </FormattedMessage>
            </div>
            <div className={"house-date d-flex justify-content-between"}>
              <img
                className="home-detail-img"
                src={BASE_URL + "/images/calendar.png"}
              />
              <div className="house-date-time">
                {moment(this.props.house.date_post).format("DD/MM/YYYY")}
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}
const mapState = (state) => ({
  likeList: state.houseList.likeList,
  projects: state.projects.projects,
  housesByQuery: state.houses.housesByQuery,
});
const mapDispatch = (dispatch) => ({
  loadHouseById: dispatch.houses.loadHouseById,
  loadHouseBySlug: dispatch.houses.loadHouseBySlug,
  loadHouseLocalStorage: dispatch.houseList.setState,
  setLikeHouse: dispatch.houseList.setLikeHouse,
  removeLikeHouse: dispatch.houseList.removeLikeHouse,
  clearServices: dispatch.services.clearServices,
  clearFacilities: dispatch.facilities.clearFacilities,
  clearDevices: dispatch.devices.clearDevices,
});
export default connect(mapState, mapDispatch)(HouseItem);
