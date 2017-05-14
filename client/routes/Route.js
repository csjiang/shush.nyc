import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

import ViewerQuery from './ViewerQuery';
import RootContainer from '../components/App/RootContainer';
import AppContainer from '../components/App/AppContainer';
import SplashContainer from '../components/Splash/SplashContainer';
import FeatureContainer from '../components/Feature/FeatureContainer';
import FileComplaintComponent from '../components/FileComplaint/FileComplaintComponent';
import SendPostcardComponent from '../components/SendPostcard/SendPostcardComponent';
import ChatComponent from '../components/Chat/ChatComponent';
import DataComponent from '../components/Data/DataComponent';
import SignupComponent from '../components/Signup/SignupComponent';
import LoginComponent from '../components/Login/LoginComponent';

export default (
  <Route path='/' component={RootContainer}>
    <IndexRoute component={SplashContainer} />
    <Route path='/' component={AppContainer}>
      <Route path='/home' component={FeatureContainer} />
      <Route path='/send-postcard' component={SendPostcardComponent} />
      <Route path='/chat/:room' component={ChatComponent} />
      <Route path='/data' component={DataComponent} />
      <Route path='/file-complaint' component={FileComplaintComponent} />
      <Route path='/signup' component={SignupComponent} />
      <Route path='/login' component={LoginComponent} />
      <Redirect from='*' to='/' />
    </Route>
  </Route>
);
