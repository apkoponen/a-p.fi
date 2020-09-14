module.exports = (options) => {
  const { mdxOtherwiseConfigured = false, contentPath, ignore } = options;

  return {
    siteMetadata: {
      title: `Personal Blog & Brain Placeholder`,
      description: `Description placeholder`,
      siteUrl: `http://example.com/`,
    },
    plugins: [
      !mdxOtherwiseConfigured && `gatsby-plugin-sharp`,
      !mdxOtherwiseConfigured && `gatsby-remark-images`,
      !mdxOtherwiseConfigured && {
        resolve: `gatsby-plugin-mdx`,
        options: {
          extensions: [`.md`, `.mdx`],
          gatsbyRemarkPlugins: [
            "gatsby-remark-double-brackets-link",
            "gatsby-remark-double-parenthesis-link",
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: 561,
              },
            },
            `gatsby-remark-copy-linked-files`,
            {
              resolve: `gatsby-remark-autolink-headers`,
              options: {
                icon: false,
              },
            },
          ],
        },
      },
      contentPath && {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: contentPath,
          name: contentPath,
          ignore: ignore,
        },
      },
      `gatsby-transformer-markdown-references`,
      {
        resolve: `gatsby-plugin-compile-es6-packages`,
        options: {
          modules: [`gatsby-theme-garden`],
        },
      },
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sharp`,
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: `${__dirname}/src/data/`,
        },
      },
    ].filter(Boolean),
  };
};
