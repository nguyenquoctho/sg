import React from "react";
import { connect } from "react-redux";
import Layout from "../layout";
import SEO from "../seo";
class EmptyView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout>
        <SEO />
        <h1 style={{ marginTop: "100px" }}>Not found</h1>
      </Layout>
    );
  }
}

const mapState = state => ({
  houses: state.houses.houses
});
const mapDispatch = dispatch => ({
  loadHouses: dispatch.houses.loadHouses
});
export default connect(mapState, mapDispatch)(EmptyView);
