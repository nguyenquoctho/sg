import React, { Component } from "react";
import { Carousel } from "react-bootstrap";
class CarouselBannerContent extends Component {
  render() {
    const {settings} = this.props
    return (
      <>
        <Carousel
          fade={true}
          slide={true}
          indicators={false}
          nextIcon=""
          prevIcon=""
        >
          {settings.slideImages.map((item) => {
            return (
              <Carousel.Item>
                <img className="banner-img" src={item} alt="" />
              </Carousel.Item>
            );
          })}
        </Carousel>
      </>
    );
  }
}
export default CarouselBannerContent;
