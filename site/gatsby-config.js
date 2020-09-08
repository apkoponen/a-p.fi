module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-personal-blog-brain`,
      options: {
        contentPath: `${__dirname}/content/foam`,
        rootNote: `/readme`,
      },
    },
  ],
  siteMetadata: {
    title: `A-P Koponen`,
  },
}
