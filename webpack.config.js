module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader", // Injects styles into DOM
          "css-loader", // Translates CSS into CommonJS
          "postcss-loader", // Processes CSS with PostCSS
          {
            loader: "resolve-url-loader", // Resolves relative paths in URLs
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-loader", // Compiles Sass to CSS
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
};
