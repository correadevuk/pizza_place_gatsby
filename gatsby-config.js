// change common JS module to (module.exports) to ES module
// See package.json : "cross-env NODE_OPTIONS=\"-r esm\"
// by default Gatsby will surface GATSBY_ANYNAME but for SANITY_ or others we need the package.
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
  siteMetadata: {
    title: `Slicks Slices`,
    siteUrl: `https://gatsby.pizza`,
    description: `The Best pizza place`,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    {
      // this is the name of the plugin you are adding
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: '3s4vlwm5',
        dataset: 'production',
        // "HotReload" for saniaty in dev mode
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
