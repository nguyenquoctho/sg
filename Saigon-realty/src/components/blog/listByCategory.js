import React from "react";
import { Link } from "gatsby";
import BlogItem from "../../components/blog/item";
import FeatureItem from "../../components/blog/featureItem";
import { connect } from "react-redux";

class ListByCategory extends React.Component {
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
        <div className="category-title-wrapper mb-3">
          <h6 className="category-title p-2 mb-0">
            {this.props.category.name}
          </h6>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 col-lg-6">
            <FeatureItem blog={blogItem[0]} />
          </div>
          <div className="col-12 col-md-6 col-lg-6">
            {blogItem.map((blog, index) => {
              if (index !== 0 && index < 5)
                return <BlogItem key={index} blog={blog} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}
const mapState = (state) => ({});
const mapDispatch = (dispatch) => ({});
export default connect(mapState, mapDispatch)(ListByCategory);
