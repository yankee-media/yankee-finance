import React, { useEffect } from 'react';

// Redux
import { connect } from 'react-redux';
import { getLatestVideos } from './store/actions';

// Custom Components
import Header from './components/Header';
import Homepage from './components/homepage/Homepage';
import CategoryPage from './components/CategoryPage';
import { Tools, CompoundInterest } from './loadable';

// Router
import { Switch, Route } from 'react-router-dom';

const App = ({ getLatestVideos }) => {
  useEffect(() => {
    getLatestVideos();
  }, [getLatestVideos]);
  return (
    <div>
      <Header />
      <div style={{height: '75px'}}></div>
      <Switch>
        <Route path='/' exact component={Homepage} />
        <Route path='/tools' exact component={Tools} />
        <Route path='/tools/compound-interest' exact component={CompoundInterest} />
        <Route path='/:category' exact component={CategoryPage} />
      </Switch>
    </div>
  );
}

export default connect(() => ({}), dispatch => {
  return {
    getLatestVideos: () => dispatch(getLatestVideos())
  }
})(App);
