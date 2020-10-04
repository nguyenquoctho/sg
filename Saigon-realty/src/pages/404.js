import React from "react";

import SEO from "../components/seo";
import SearchForm from "../components/search/form";
import Layout from "../components/layout";

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    {/* <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p> */}
    <div className="bg-warning">
      <SearchForm />
    </div>
  </Layout>
);

export default NotFoundPage;
