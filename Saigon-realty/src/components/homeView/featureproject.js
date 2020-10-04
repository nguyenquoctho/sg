import React, { Component } from "react";
import HouseSlider from "../houseSlider";
import { FormattedMessage } from "react-intl";
class FeatureProject extends Component {
  render() {
    return (
      <>
        <div className="feature-project d-flex flex-column align-items-center">
          <h2 className="project-tilte text-center">
            <FormattedMessage id="featurePropertiesOnProjects">
              {(txt) => txt}
            </FormattedMessage>
          </h2>
          {/* List projects desktop */}
          <HouseSlider houses={this.props.houses} />
        </div>
      </>
    );
  }
}
export default FeatureProject;
