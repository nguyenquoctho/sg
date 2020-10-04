import React from "react";
import SEO from "../components/seo";
import Layout from "../components/layout";
import RequestForm from "../components/requestForm/index";
import ReactBnbGallery from "react-bnb-gallery";
import Dialog from "@material-ui/core/Dialog";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import HomeList from "../components/detailView/home-list";
import "../../static/scss/gallery.scss";
import HomeImage from "../components/houseImage";
import DescriptionHouseDetail from "../components/houseDetailDescription";
import SummaryHouseDetail from "../components/houseDetailSummary";
import DevicesHouseDetail from "../components/houseDetailDevices";
import ServicesHouseDetail from "../components/houseDetailServices";
import FacilitiesHouseDetail from "../components/houseDetailFacilities";
import OverviewHouseDetail from "../components/houseDetailOverview";
import NameHouseDetail from "../components/houseDetailName";
import CodeHouseDetail from "../components/houseDetailCode";
import BannerHouseDetail from "../components/houseDetailBanner";
import ModalHouseDetail from "../components/houseDetailModal";
import RequestFormHouseDetail from "../components/houseDetailRequestForm";
import NextArrow from "../components/slider/nextArrow";
import PrevArrow from "../components/slider/prevArrow";

class DetailView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false, showRequest: false };
    this.slider1 = React.createRef();
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShowRequest = this.handleShowRequest.bind(this);
    this.handleCloseRequest = this.handleCloseRequest.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
    this.showMore = this.showMore.bind(this);
    this.filterTheSameDistrict = this.filterTheSameDistrict.bind(this);
    this.filterTheSamePrice = this.filterTheSamePrice.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }
  handleShow() {
    this.setState({ show: true });
  }
  handleCloseRequest() {
    this.setState({ showRequest: false });
  }

  handleShowRequest() {
    this.setState({ showRequest: true });
  }
  scrollTo(area) {
    var element = document.getElementById(`${area}`);
    element.scrollIntoView({
      behavior: "smooth",
    });
  }

  showMore() {
    document.querySelectorAll(".amenities-mobile-hidden").forEach((item) => {
      item.style.display = "block";
    });
    document.querySelector(".amenities-show-more").style.display = "none";
  }

  filterTheSameDistrict(houses) {
    let theSameDistrict = houses.filter((item) => {
      return (
        item.projectId === this.props.houseBySlug.projectId &&
        item.district === this.props.houseBySlug.district &&
        item._id !== this.props.houseBySlug._id
      );
    });
    return theSameDistrict;
  }
  filterTheSamePrice(houses) {
    let theSamePrice = houses.filter((item) => {
      return (
        Math.abs(item.price - this.props.houseBySlug.price) <= 100 &&
        item._id !== this.props.houseBySlug._id
      );
    });
    return theSamePrice;
  }

  async componentDidMount() {
    await this.props.setHeaderMenu({ header: null });
    await this.props.fetchClientHouses();
    await this.props.loadHouseBySlug(this.props.slug);
  }
  render() {
    const { houseBySlug, loading } = this.props;
    const { devices = [], services = [], facilities = [] } = houseBySlug;
    let mapAddress = `${houseBySlug.street}, phường ${houseBySlug.ward}, quận ${houseBySlug.district}, ${houseBySlug.city}`;
    mapAddress = mapAddress.replace(/ /g, "+");
    let images = [];
    houseBySlug.images.map((item) => {
      images = [
        ...images,
        {
          photo: item,
          thumbnail: item,
        },
      ];

      return;
    });
    const sliderSetting = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    };
    const overviews = [
      {
        id: "",
        icon: "/images/overview/building.png",
        value: houseBySlug.type,
      },
      {
        id: "",
        icon: "/images/overview/area-chart.png",
        value: houseBySlug.area,
        unit: "m2",
      },
      {
        id: "bathroom",
        icon: "/images/overview/bathroom.png",
        value: houseBySlug.bathroom,
      },

      {
        id: "bedroom",
        icon: "/images/overview/bedroom.png",
        value: houseBySlug.bedroom,
      },

      {
        id: "accommodate",
        icon: "/images/overview/accommodate.png",
        value: houseBySlug.accommodate,
      },

      {
        id: "",
        icon: "/images/overview/furniture.png",
        value: houseBySlug.furniture,
      },
    ];

    return (
      <Layout>
        <SEO
          title={houseBySlug.name}
          description={houseBySlug.description}
          name={houseBySlug.name}
          image={houseBySlug.images[0]}
        />

        <RequestFormHouseDetail handleShowRequest={this.handleShowRequest} />

        <ModalHouseDetail
          showRequest={this.state.showRequest}
          handleCloseRequest={this.handleCloseRequest}
          houseBySlug={houseBySlug}
        />

        <ReactBnbGallery
          show={this.state.show}
          photos={images}
          onClose={this.handleClose}
          wrap={false}
        />
        <div className="detail-apartment pt-5 d-flex flex-column align-items-center justify-content-center">
          <CodeHouseDetail houseBySlug={houseBySlug} />
          <div className="container row">
            <div className="col-12 col-md-8 col-lg-8 d-flex flex-column">
              <NameHouseDetail
                houseBySlug={houseBySlug}
                mapAddress={mapAddress}
              />

              <OverviewHouseDetail overviews={overviews} />

              <div className="apartment-images mt-5">
                {houseBySlug.images.map((item) => {
                  return (
                    <HomeImage onHide={this.handleShow} homeImage={item} />
                  );
                })}
              </div>

              <DescriptionHouseDetail description={houseBySlug.description} />

              <SummaryHouseDetail summary={houseBySlug.sumary} />

              {houseBySlug.devices && houseBySlug.devices.length > 0 && (
                <DevicesHouseDetail devices={houseBySlug.devices} />
              )}
              {houseBySlug.services && houseBySlug.services.length > 0 && (
                <ServicesHouseDetail services={houseBySlug.services} />
              )}

              <FacilitiesHouseDetail facilities={houseBySlug.facilities} />
            </div>
            <div className="request-inspection col-xl-4 col-md-4">
              <RequestForm
                price={true}
                housePrice={houseBySlug.price}
                type={houseBySlug.typeSale}
              />
            </div>
          </div>

          <div className="similar-list container">
            <HomeList
              title="similarLocation"
              houses={this.filterTheSameDistrict([...this.props.houses])}
              sliderSetting={sliderSetting}
            />
            <HomeList
              title="similarPrice"
              houses={this.filterTheSamePrice([...this.props.houses])}
              sliderSetting={sliderSetting}
            />
          </div>
        </div>
        <Dialog open={loading}>
          <div>
            <CircularProgress size={80} color="secondary" />
          </div>
        </Dialog>
      </Layout>
    );
  }
}
const mapState = (state) => ({
  houses: state.houses.houses,
  houseBySlug: state.houses.houseBySlug,
  locationList: state.houseList.locationList,
  priceList: state.houseList.priceList,
  loading: state.houses.loading,
});
const mapDispatch = (dispatch) => ({
  fetchClientHouses: dispatch.houses.fetchClientHouses,
  loadHouseBySlug: dispatch.houses.loadHouseBySlug,
  setHeaderMenu: dispatch.header.setState,
});
export default connect(mapState, mapDispatch)(DetailView);
