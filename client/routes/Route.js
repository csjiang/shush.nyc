import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

// import ViewerQuery from './ViewerQuery';
import RootContainer from '../components/App/RootContainer';
import AppContainer from '../components/App/AppContainer';
import SplashContainer from '../components/Splash/SplashContainer';
import FeatureContainer from '../components/Feature/FeatureContainer';
import SignupComponent from '../components/Signup/SignupComponent';
import LoginComponent from '../components/Login/LoginComponent';

export default (
  <Route path='/' component={RootContainer} >
    <IndexRoute component={SplashContainer} />
    <Route path='/' component={AppContainer}>
      <Route path='/home' component={FeatureContainer} />
      <Route path='/signup' component={SignupComponent} />
      <Route path='/login' component={LoginComponent} />
      <Redirect from='*' to='/' />
    </Route>
  </Route>
);
