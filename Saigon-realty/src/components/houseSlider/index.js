import React from "react";
import Slider from "react-slick";
import { BASE_URL, COMPANY_CODE } from "../../setting";
import { connect } from "react-redux";
import HouseItem from "../houseItem";

class HouseSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { slideIndex: 1, projectId: "" };
  }
  render() {
    let current = this;
    const sliderSetting = {
      dots: true,
      infinite: true,
      swipeToSlide: true,
      speed: 500,
      dotsClass: "slick-dots",
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      beforeChange: (current, next) => this.setState({ slideIndex: current }),
      customPaging: function(i) {
        const array =
          current.props.settings.hotProject.length === 0
            ? [{ name: "" }, { name: "" }, { name: "" }]
            : current.props.settings.hotProject;
        return <div className="project-item-text">{array[i].name}</div>;
      },
    };

    const sliderSettingMobile = {
      dots: true,
      infinite: true,
      swipeToSlide: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      beforeChange: (current, next) => this.setState({ slideIndex: current }),
      customPaging: function(i) {
        const array =
          current.props.settings.hotProject.length === 0
            ? [{ name: "" }, { name: "" }, { name: "" }]
            : current.props.settings.hotProject;

        return <div className="project-item-text">{array[i].name}</div>;
      },
    };

    function NextArrow(props) {
      const { className, style, onClick } = props;
      return (
        <div
          className={className + " next-arrow-detail"}
          style={{ ...style }}
          onClick={onClick}
        >
          <div className="detail-arrow-content">
            <img
              className="next-arrow-icon"
              src={BASE_URL + "/images/right-arrow-black.png"}
            />
          </div>
        </div>
      );
    }
    function PrevArrow(props) {
      const { className, style, onClick } = props;
      return (
        <div
          className={className + " prev-arrow-detail"}
          style={{ ...style }}
          onClick={onClick}
        >
          <div className="detail-arrow-content">
            <img
              className="next-arrow-icon"
              src={BASE_URL + "/images/left-arrow-black.png"}
            />
          </div>
        </div>
      );
    }

    return (
      <React.Fragment>
        <div className="list-project projects-desktop container">
          <Slider {...sliderSetting}>
            {this.props.settings.hotProject.map((project) => {
              return (
                <div className="d-flex">
                  {this.props.houses
                    .filter((item) => {
                      return (
                        item.projectId === project._id &&
                        item.available !== "Unavailable"
                      );
                    })

                    .map((item, index) => {
                      if (index < 3) {
                        return (
                          <HouseItem columns={3} house={item} like={false} />
                        );
                      }
                    })}
                </div>
              );
            })}
          </Slider>
        </div>
        {/* List projects moblile */}
        <div
          className="list-project projects-mobile container"
          style={{ paddingRight: "24px", paddingLeft: "24px" }}
        >
          <Slider {...sliderSettingMobile}>
            {this.props.settings.hotProject.map((project, index) => {
              if (index < 3) {
                return (
                  <div className="d-flex">
                    {this.props.houses
                      .filter((item, index) => {
                        return item.projectId === project._id;
                      })
                      .map((item, index) => {
                        if (index < 1) {
                          return (
                            <HouseItem columns={3} house={item} like={false} />
                          );
                        }
                      })}
                  </div>
                );
              }
            })}
          </Slider>
        </div>
      </React.Fragment>
    );
  }
}
const mapState = (state) => ({
  settings: state.settings.settings,
});
const mapDispatch = (dispatch) => ({
  loadSettings: dispatch.settings.loadSettings,
});
export default connect(mapState, mapDispatch)(HouseSlider);
