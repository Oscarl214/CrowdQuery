module.exports = {
  // other configuration options...

  resolve: {
    fallback: {
      https: require.resolve('https-browserify'),
    },
  },
};
