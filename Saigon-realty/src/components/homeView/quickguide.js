import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { Carousel } from "react-bootstrap";
import { BASE_URL } from "../../setting";
const quickGuides = [
  {
    title: "searchTitle",
    icon: "/images/quick-guide-1.png",
    message: "searchMessage",
  },
  {
    title: "visitTitle",
    icon: "/images/quick-guide-2.png",
    message: "visitMessage",
  },
  {
    title: "contractTitle",
    icon: "/images/quick-guide-3.png",
    message: "contractMassage",
  },
  {
    title: "moveTitle",
    icon: "/images/quick-guide-4.png",
    message: "moveMessage",
  },
];
class QuickGuide extends Component {
  render() {
    return (
      <>
        <div className="process d-flex flex-column align-items-center">
          <h2 className="process-title">
            <FormattedMessage id="rentingTitle">
              {(txt) => txt}
            </FormattedMessage>
          </h2>
          <div className="row process-content container justify-content-center">
            {quickGuides.map((item, index) => {
              return (
                <div
                  key={index}
                  className="col-12 col-md-3 col-lg-3 d-flex flex-column align-items-center justify-content-center"
                >
                  <img
                    className="process-item-icon"
                    src={`${BASE_URL}${item.icon}`}
                  />
                  <h3 className="process-item-title">
                    <FormattedMessage id={item.title}>
                      {(txt) => txt}
                    </FormattedMessage>
                  </h3>
                  <p className="process-item-description">
                    <FormattedMessage id={item.message}>
                      {(txt) => txt}
                    </FormattedMessage>
                  </p>
                  {index !== quickGuides.length - 1 ? (
                    <div className="position-absolute w-100 text-right">
                      <img alt="..." src={BASE_URL + "/images/angle.png"} />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </div>

          {/* end Process */}
          {/* Process in mobile screen */}
          <div className="process-carousel">
            <Carousel controls={false} indicators={true} interval={2000}>
              <Carousel.Item>
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <img
                    className="process-item-icon"
                    src={BASE_URL + "/images/quick-guide-1.png"}
                  />
                  <h3 className="process-item-title">
                    <FormattedMessage id="searchTitle">
                      {(txt) => txt}
                    </FormattedMessage>
                  </h3>
                  <p className="process-carousel-description">
                    <FormattedMessage id="searchMessage">
                      {(txt) => txt}
                    </FormattedMessage>
                  </p>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className=" d-flex flex-column align-items-center justify-content-center">
                  <img
                    className="process-item-icon"
                    src={BASE_URL + "/images/quick-guide-2.png"}
                  />
                  <h3 className="process-item-title">
                    <FormattedMessage id="visitTitle">
                      {(txt) => txt}
                    </FormattedMessage>
                  </h3>
                  <p className="process-carousel-description">
                    <FormattedMessage id="visitMessage">
                      {(txt) => txt}
                    </FormattedMessage>
                  </p>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <img
                    className="process-item-icon"
                    src={BASE_URL + "/images/quick-guide-3.png"}
                  />
                  <h3 className="process-item-title">
                    <FormattedMessage id="contractTitle">
                      {(txt) => txt}
                    </FormattedMessage>
                  </h3>
                  <p className="process-carousel-description">
                    <FormattedMessage id="contractMassage">
                      {(txt) => txt}
                    </FormattedMessage>
                  </p>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <img
                    className="process-item-icon"
                    src={BASE_URL + "/images/quick-guide-4.png"}
                  />
                  <h3 className="process-item-title">
                    <FormattedMessage id="moveTitle">
                      {(txt) => txt}
                    </FormattedMessage>
                  </h3>
                  <p className="process-carousel-description">
                    <FormattedMessage id="moveMessage">
                      {(txt) => txt}
                    </FormattedMessage>
                  </p>
                </div>
              </Carousel.Item>
            </Carousel>
          </div>
          {/* end Process in mobile */}
        </div>
      </>
    );
  }
}
export default QuickGuide;
