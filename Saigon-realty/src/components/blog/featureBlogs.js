import React from "react";
import { Link } from "gatsby";
import BlogItem from "../../components/blog/item";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

class FeatureBlogs extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let blogItem = this.props.blogs.filter((item) => {
      return item.date_post < new Date() && item.feature === "true";
    });

    return (
      <div className="w-100">
        <div className="mb-3 category-title w-100">
          <FormattedMessage id="feature_posts">
            {(txt) => <h6 className="category-title p-2 mb-0">{txt}</h6>}
          </FormattedMessage>
        </div>
        {blogItem.map((blog, index) => {
          if (index < 4) return <BlogItem key={index} blog={blog} />;
        })}
      </div>
    );
  }
}
const mapState = (state) => ({});
const mapDispatch = (dispatch) => ({});
export default connect(mapState, mapDispatch)(FeatureBlogs);
