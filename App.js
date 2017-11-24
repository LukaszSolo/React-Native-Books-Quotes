/**
 * Read your books notes
 * https://lukasz.soluch.net
 * @flow
 */

import React  from 'react';

import AppWithNavigationState from './navigators/AppNavigator';

export default class App extends React.Component {
  render() {
    return (
      <AppWithNavigationState />
    );
  }
}

