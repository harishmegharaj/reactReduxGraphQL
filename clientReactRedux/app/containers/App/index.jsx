/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import GlobalStyle from '../../global-styles';
import HomePage from '../HomePage';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;
const App = (props) => {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="Nutrition Details"
        defaultTitle="Nutrition Details"
      >
        <meta name="description" content="A Nutrition Details application" />
      </Helmet>
      <Switch>
        <Route exact path="/" component={HomePage} />
        {/* <Route path="" component={NotFoundPage} /> */}
      </Switch>
      
      <GlobalStyle />
    </AppWrapper>
  );
}
export default App;
