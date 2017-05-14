/* eslint-disable no-console, no-shadow */
import path from 'path';
import webpack from 'webpack';
import express from 'express';
import WebpackDevServer from 'webpack-dev-server';
import historyApiFallback from 'connect-history-api-fallback';
import chalk from 'chalk';
import webpackConfig from '../webpack.config';
import config from './config/environment';
import createApp from './createApp';

if (config.env === 'development') {

  // Launch Relay by using webpack.config.js
  const relayServer = new WebpackDevServer(webpack(webpackConfig), {
    contentBase: '/build/',
    setup: express => {
      createApp(express);
    },
    stats: {
      colors: true
    },
    hot: true,
    historyApiFallback: true
  });

  // Serve static resources
  relayServer.use('/', express.static(path.join(__dirname, '../build')));
  relayServer.use('/', express.static(path.join(__dirname, '../raw-assets')));
  relayServer.listen(config.port, () => {
    console.log(`server is listening intently on port ${config.port}!`);
  });
} else if (config.env === 'production') {
  // Launch Relay by creating a normal express server
  const relayServer = express();
  relayServer.use(historyApiFallback());
  relayServer.use('/', express.static(path.join(__dirname, '../build')));
  relayServer.use('/', express.static(path.join(__dirname, '../raw-assets')));
  relayServer.listen(config.port, () => {
    console.log(`server is listening intently on port ${config.port}!`);
  });
}
