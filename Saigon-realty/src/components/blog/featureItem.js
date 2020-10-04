import React from "react";
import { Link } from "gatsby";
import { connect } from "react-redux";
import "./item.css";
import { BASE_URL } from "../../setting";
import * as moment from "moment";
class FeatureItem extends React.Component {
  render() {
    const { blog } = this.props;
    if (blog) {
      return (
        <div className="d-flex flex-column mb-3">
          <img
            className="w-100 mb-3"
            src={this.props.blog.image || BASE_URL + "/images/default.jpg"}
          />
          <div className=" d-flex flex-column">
            <Link
              to={`/blog-detail/${this.props.blog._id}-${this.props.blog.slug}`}
              className="h4 text-dark mb-0"
            >
              {this.props.blog.title}
            </Link>
            <p className="blog-description"> {this.props.blog.description}</p>
            <div className="blog-date_post">
              <Link to="">{this.props.blog.writtenBy}</Link> -
              {moment(this.props.blog.date_post).format("h:mm A, DD/MM/YYYY")}
            </div>
          </div>
        </div>
      );
    } else {
      return "";
    }
  }
}
const mapState = (state) => ({});
const mapDispatch = (dispatch) => ({});
export default connect(mapState, mapDispatch)(FeatureItem);
