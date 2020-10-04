import React, { Component } from "react";
import SearchForm from "../search/form";
import { Link } from "@reach/router";
import { FormattedMessage } from "react-intl";

import CarouselBannerContent from "./carousel-banner-content";
class BannerContent extends Component {
  render() {
    const {district, settings} = this.props
    return (
      <>
        <div className="banner-content">
          <div className="banner-wrap d-flex justify-content-center">
            <div className="banner-search container d-flex flex-column align-items-center justify-content-center">
              <h1 className="text-white text-center">
                <FormattedMessage id="home_page_title">
                  {(txt) => txt}
                </FormattedMessage>
              </h1>
              <div className="popular-area ">
                {district.map((item) => {
                  return (
                    <Link
                      to={`/apartment?projectId=&district=${item.search}&page=1&bedroom=&bathroom=&furniture=&accommodate=&devices=&type=`}
                      className="area"
                    >
                      <FormattedMessage id={item.area}>
                        {(txt) => txt}
                      </FormattedMessage>
                    </Link>
                  );
                })}
              </div>
              <SearchForm />
            </div>
          </div>
          <CarouselBannerContent settings={settings}/>
        </div>
      </>
    );
  }
}
export default BannerContent;
