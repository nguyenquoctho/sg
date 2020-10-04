import React from "react";
import SEO from "../components/seo";
import Layout from "../components/layout";
import { Link } from "gatsby";
import { BASE_URL } from "../setting";
import { connect } from "react-redux";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Dialog from "@material-ui/core/Dialog";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as moment from "moment";
import { getIdFromSlug } from "../utils/text.js";
import FeatureBlogs from "../components/blog/featureBlogs";
class DetailBlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { category: "" };
  }
  componentDidMount() {
    this.props.setHeaderMenu({ header: 4 });
    let blogId = getIdFromSlug(this.props.slug);
    this.props.loadBlogByQuery(this.props.query);
    this.props.loadBlogById(blogId);
  }
  render() {
    return (
      <Layout>
        <SEO title="Blogs" />
        <div className="container mt-5">
          <div className="row">
            <div className="col-12 col-md-8 col-md-8 d-flex flex-column">
              <div className="detail-breadcrumb">
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                  <Link to="/blog">Blogs</Link>
                  <Link to="/blog">{this.props.blogById.category}</Link>
                  <Link to="/blog">{this.props.blogById.title}</Link>
                </Breadcrumbs>
                <img
                  className="detail-image"
                  src={
                    this.props.blogById.image ||
                    BASE_URL + "/images/default.jpg"
                  }
                  alt=""
                />
                <div className="detail-title">{this.props.blogById.title}</div>
                <div className="detail-date_post d-flex align-items-center">
                  <img
                    className="detail-blog-img"
                    src={BASE_URL + "/images/calendar.png"}
                  />
                  <div style={{ marginRight: "5px" }}>Post on</div>
                  {moment(this.props.blogById.date_post).format(
                    "h:mm A, DD/MM/YYYY"
                  )}
                </div>
                <div className="detail-content">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: this.props.blogById.content,
                    }}
                  />
                </div>

                <div className="detail-writtenBy d-flex justify-content-end">
                  {this.props.blogById.writtenBy}
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 col-md-4">
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
  blogById: state.blogs.blogById,
  blogsByQuery: state.blogs.blogsByQuery,
  query: state.blogs.query,
  loading: state.blogs.loading,
});
const mapDispatch = (dispatch) => ({
  loadBlogById: dispatch.blogs.loadBlogById,
  loadBlogByQuery: dispatch.blogs.loadBlogByQuery,
  setHeaderMenu: dispatch.header.setState,
});
export default connect(mapState, mapDispatch)(DetailBlog);
