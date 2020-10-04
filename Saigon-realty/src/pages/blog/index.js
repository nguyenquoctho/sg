import React from "react";
import SEO from "../../components/seo";
import Layout from "../../components/layout";
import Dialog from "@material-ui/core/Dialog";
import CircularProgress from "@material-ui/core/CircularProgress";
import ListAllBlogs from "../../components/blog/listAllBlogs";
import { connect } from "react-redux";
import ListByCategory from "../../components/blog/listByCategory";
import FeatureBlogs from "../../components/blog/featureBlogs";
import { FormattedMessage } from "react-intl";

class BlogPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { category: "", openMenu: false, number: 0 };
    this.loadMore = this.loadMore.bind(this);
  }
  async componentDidMount() {
    this.props.setHeaderMenu({ header: 4 });
    await this.props.loadCategories();
    await this.props.loadBlogByQuery(this.props.query);
  }
  async loadMore() {
    await this.props.setQuery({ limit: this.props.query.limit + 5 });
    await this.props.loadBlogByQuery(this.props.query);
  }
  render() {
    let { categories = [] } = this.props;

    return (
      <Layout>
        <SEO title="Blogs" />
        <div className="container mt-5">
          <div className="row">
            <div className="col-12 col-md-8 col-lg-8">
              <div className="d-flex flex-column ">
                {categories.map((category) => {
                  return (
                    <ListByCategory
                      key={category._id}
                      blogs={this.props.blogsByQuery}
                      category={category}
                    />
                  );
                })}
              </div>
              <div className="d-flex flex-column ">
                <div className="category-title-wrapper mb-3">
                  <FormattedMessage id="dont_miss_these">
                    {(txt) => (
                      <h6 className="category-title p-2 mb-0">{txt}</h6>
                    )}
                  </FormattedMessage>
                </div>
                {categories.map((category) => {
                  return (
                    <ListAllBlogs
                      key={category._id}
                      blogs={this.props.blogsByQuery}
                      category={category}
                    />
                  );
                })}
              </div>
            </div>
            <div className="col-12 col-md-4 col-lg-4">
              <FeatureBlogs blogs={this.props.blogsByQuery} />
            </div>
          </div>
        </div>

        <Dialog open={this.props.loading}>
          <div>
            <CircularProgress size={80} color="secondary" />
          </div>
        </Dialog>
      </Layout>
    );
  }
}
const mapState = (state) => ({
  blogs: state.blogs.blogs,
  blogsByQuery: state.blogs.blogsByQuery,
  categories: state.blogs.categories,
  numberOfBlogs: state.blogs.numberOfBlogs,
  query: state.blogs.query,
  loading: state.blogs.loading,
});
const mapDispatch = (dispatch) => ({
  setQuery: dispatch.blogs.setQuery,
  loadAllBlogs: dispatch.blogs.loadAllBlogs,
  loadCategories: dispatch.blogs.loadCategories,
  loadBlogByQuery: dispatch.blogs.loadBlogByQuery,
  loadBlogByQueryNoLimit: dispatch.blogs.loadBlogByQueryNoLimit,
  setHeaderMenu: dispatch.header.setState,
});
export default connect(mapState, mapDispatch)(BlogPage);
