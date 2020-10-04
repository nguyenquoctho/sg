import React from "react";
import BlogItem from "./allBlogItem";

import { connect } from "react-redux";

class ListAllBlogs extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let blogItem = this.props.blogs.filter((item) => {
      return (
        item.date_post < new Date() && item.category == this.props.category.name
      );
    });
    return (
      <div className="w-100">
        {blogItem.map((blog, index) => {
          if (index > 5) return <BlogItem key={index} blog={blog} />;
        })}
      </div>
    );
  }
}
const mapState = (state) => ({});
const mapDispatch = (dispatch) => ({});
export default connect(mapState, mapDispatch)(ListAllBlogs);
