import React from 'react';
import { browserHistory, applyRouterMiddleware, Router } from 'react-router';
import Routes from './routes/Route';

const Root = () => (
  <Router
    history={browserHistory} routes={Routes}
  />
);

export default Root;
