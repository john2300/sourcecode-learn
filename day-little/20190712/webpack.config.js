const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const path = require('path');
module.exports = {
  entry:"./src/index.js",
  module:{
    rules:[
      {
        test:/\.js/,
        use: [
          {
            loader: path.resolve('./loaders/trycat-loader.js'),
            options: {/* ... */}
          }
        ]
      }
    ]
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
  ],
}