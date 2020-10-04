import React from "react";
import { Link } from "gatsby";
import "./style.css";
import { connect } from "react-redux";

class Breadcrumb extends React.Component {
  constructor(props) {
    super(props);
    this.setId = this.setId.bind(this);
  }
  setId(id) {
    return id;
  }
  componentDidMount() {}
  render() {
    return (
      <div className="breadcrumb-content list-breadcrumb d-flex align-items-center">
        <Link to="/" className="breadcrumb-item d-flex align-items-center">
          <img height={18} width={18} src="../images/home-breadcrumb.png" />
        </Link>
        <Link to="/" className="breadcrumb-item d-flex align-items-center">
          {this.props.project.name}
        </Link>
        <Link to="/" className="breadcrumb-item d-flex align-items-center">
          {this.props.house}
        </Link>
      </div>
    );
  }
}
const mapState = state => ({
  projectById: state.projects.projectById
});
const mapDispatch = dispatch => ({
  loadProjectById: dispatch.projects.loadProjectById
});
export default connect(mapState, mapDispatch)(Breadcrumb);
