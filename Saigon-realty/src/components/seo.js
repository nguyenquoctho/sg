/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import { BASE_URL, FACEBOOK_APP_ID } from "../setting";

function SEO({ description, lang, meta, title, name, image }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
            image
          }
        }
      }
    `
  );

  const metaDescription = site.siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: description || metaDescription,
        },
        {
          property: `og:image`,
          content: image || site.siteMetadata.image,
        },
        {
          property: `og:image:secure_url`,
          content: image || site.siteMetadata.image,
        },
        {
          property: `og:image:type`,
          content: "image/png",
        },
        {
          property: `fb:app_id`,
          content: FACEBOOK_APP_ID,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
      />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css"/>
      <link
        rel="stylesheet"
        type="text/css"
        charset="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <link rel="stylesheet" href={BASE_URL + "/css/index.css"} />
      <link rel="stylesheet" href={BASE_URL + "/css/apartment.css"} />
      <link rel="stylesheet" href={BASE_URL + "/css/detail-blog.css"} />
      <link rel="stylesheet" href={BASE_URL + "/css/detail.css"} />
      <link rel="stylesheet" href={BASE_URL + "/css/footer.css"} />
      <link rel="stylesheet" href={BASE_URL + "/css/header.css"} />
      <link rel="stylesheet" href={BASE_URL + "/css/house-item.css"} />
      <link rel="stylesheet" href={BASE_URL + "/css/house-slider.css"} />
      <link rel="stylesheet" href={BASE_URL + "/css/login.css"} />
      <link rel="stylesheet" href={BASE_URL + "/css/phone.css"} />
      <link rel="stylesheet" href={BASE_URL + "/css/profile.css"} />
      <link rel="stylesheet" href={BASE_URL + "/css/to-top.css"} />
      <link rel="stylesheet" href={BASE_URL + "/css/blog.css"} />
      <script src="https://kit.fontawesome.com/ab5ad62177.js" />
    </Helmet>
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

export default SEO;
