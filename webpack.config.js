const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: './src/index.js',
   output: {
      path: path.join(__dirname, '/dist'),
      filename: 'bundle.js'
   },
   devServer: {
      port: 3000
   },
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            options: { presets: ["@babel/env"] },
         },
         {
           test: /\.css$/, //checks for .css files
           use: ["style-loader", "css-loader"],
         },
      ]
   },
   resolve: { extensions: ["*", ".js", ".jsx"] },
   plugins:[
      new HtmlWebpackPlugin({
         template: './public/index.html'
      })
   ]
}