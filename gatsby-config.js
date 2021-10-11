
require("dotenv").config({
  path: `.env.${process.env.GATSBY_ENV}`,
});

module.exports = {
  siteMetadata: {
    name: `Hello Chess World!`,
    tagline: `Chess 💪`,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-tslint`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "fonts",
        path: `${__dirname}/static/fonts/`,
      },
    },
  ],
};
