
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV.trim()}`,
});

console.log(process.env.NODE_ENV.trim() == 'development');
console.log(process.env.NODE_ENV);
console.log(process.env.GATSBY_API);

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
