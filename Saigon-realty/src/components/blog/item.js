import React from "react";
import { Link } from "gatsby";
import { connect } from "react-redux";
import { BASE_URL } from "../../setting";
import * as moment from "moment";
import "./item.css";
class BlogItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { blog } = this.props;
    if (blog) {
      return (
        <div className="d-flex border rounded mb-3 px-2 py-1">
          <img
            className="feature-blog-thumbnail"
            src={this.props.blog.image || BASE_URL + "/images/default.jpg"}
          />
          <div className="blog-detail d-flex flex-column">
            <Link
              to={`/blog-detail/${this.props.blog._id}-${this.props.blog.slug}`}
              className="h6 text-dark mb-0"
              onClick={() => this.props.loadBlogById(this.props.blog._id)}
            >
              {this.props.blog.title}
            </Link>
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
const mapDispatch = (dispatch) => ({
  loadBlogById: dispatch.blogs.loadBlogById,
});
export default connect(mapState, mapDispatch)(BlogItem);
