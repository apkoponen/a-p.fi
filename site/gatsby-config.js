module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-personal-blog-brain`,
      options: {
        brainPath: '/brain',
        contentPath: `${__dirname}/content/foam`,
        rootNote: `/brain/readme`,
      },
    },
  ],
  siteMetadata: {
    title: `A-P Koponen`,
  },
}
