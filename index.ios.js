/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import BaseComponent from './app/components/BaseComponent'
import {Scene, Router} from 'react-native-router-flux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TabBarIOS,
  NavigatorIOS,
  View
} from 'react-native';

class OverwatchIos extends Component {
  render() {
    const {nav} = this.props;
    return (
      <NavigatorIOS style={{flex: 1}}
        navigationBarHidden={true}
        initialRoute={{
          title: 'base',
          component: BaseComponent,
          passProps: {nav}
        }}
      />
    );
  }
}

AppRegistry.registerComponent('OverwatchIos', () => OverwatchIos);
