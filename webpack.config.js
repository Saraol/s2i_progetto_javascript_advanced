const path = require('path'); 
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './assets/js/main.js', 

  output: {
    filename: 'bundle.js', 
    path: path.resolve(__dirname, 'dist'), 
    clean: true, 
  },

  module: {
    rules: [
      {
        test: /\.js$/, 
        exclude: /node_modules/, 
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], 
          },
        },
      },
      {
        test: /\.css$/, 
        use: ['style-loader', 'css-loader'], 
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/, 
        type: 'asset/resource', 
        generator: {
          filename: 'images/[name][ext]', 
        },
      },
    ],
  },

  plugins: [
    new Dotenv(), 
  ],

  mode: 'production', 

  devtool: 'source-map', 

  devServer: {
    static: {
      directory: path.join(__dirname), 
    },
    compress: true, 
    port: 9000, 
  },
};
