import React from "react";

import Breadcrumb from "../breadcrumb";
class CodeHouseDetail extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { houseBySlug } = this.props;
    const { houseCode = "", project = "" } = houseBySlug;
    return (
      <div className="container mb-3">
        <Breadcrumb house={houseCode} project={project} />
      </div>
    );
  }
}
export default CodeHouseDetail;
