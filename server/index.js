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
  let relayServer;
  if (!process.env.SERVER){
  // Launch Relay by using webpack.config.js
  let relayServer = new WebpackDevServer(webpack(webpackConfig), {
    contentBase: '/build/',
    proxy: {
      '/api': {
        target: 'http://localhost:3332',
        secure: false,
      },
    },
    setup: express => {
      createApp(express);
    },
    stats: {
      colors: true
    },
    hot: true,
    historyApiFallback: true
  });
} else {
    relayServer = express();
    createApp(relayServer);
  }
  relayServer.use('/', express.static(path.join(__dirname, '../build')));
  relayServer.use('/', express.static(path.join(__dirname, '../raw-assets')));
  relayServer.listen(process.env.SERVER ? process.env.SERVER : config.port, () => {
    console.log(`server is listening intently on port ${config.port}!`);
  });
} else if (config.env === 'production') {
  // Launch Relay by creating a normal express server
  const relayServer = express();
  relayServer.use(historyApiFallback());
  relayServer.use('/', express.static(path.join(__dirname, '../build')));
  relayServer.use('/', express.static(path.join(__dirname, '../raw-assets')));
  createApp(relayServer);
  relayServer.listen(config.port, () => {
    console.log(`server is listening intently on port ${config.port}!`);
  });
}
