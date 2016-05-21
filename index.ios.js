/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import NewsComponent from './app/components/NewsComponent';
import PicComponent from './app/components/PicComponent';
import SupportComponent from './app/components/SupportComponent';
import TwitchComponent from './app/components/TwitchComponent';
import TwitterComponent from './app/components/TwitComponent';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TabBarIOS,
  View
} from 'react-native';

class OverwatchIos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'news'
    };
  }
  render() {
    return (
      <TabBarIOS
        unselectedTintColor='#929292'
        tintColor='white'
        barTintColor='#212121'
      >
        <TabBarIOS.Item
        title='news'
        icon={require('./app/img/ic_newspaper.png')}
        selected={this.state.selectedTab === 'news'}
        onPress={() => {
          this.setState({
            selectedTab: 'news'
          });
        }}
        >
        <NewsComponent />
        </TabBarIOS.Item>
        <TabBarIOS.Item
        title='twitter'
        icon={require('./app/img/ic_twitter.png')}
        selected={this.state.selectedTab === 'twitter'}
        onPress={() => {
          this.setState({
            selectedTab: 'twitter'
          });
        }}
        >
        <TwitterComponent />
        </TabBarIOS.Item>
        <TabBarIOS.Item
        title='twitch'
        icon={require('./app/img/ic_twitch.png')}
        selected={this.state.selectedTab === 'twitch'}
        onPress={() => {
          this.setState({
            selectedTab: 'twitch'
          });
        }}
        >
        <TwitchComponent />
        </TabBarIOS.Item>
        <TabBarIOS.Item
        title='picture'
        icon={require('./app/img/ic_picture.png')}
        selected={this.state.selectedTab === 'picture'}
        onPress={() => {
          this.setState({
            selectedTab: 'picture'
          });
        }}
        >
        <PicComponent />
        </TabBarIOS.Item>
        <TabBarIOS.Item
        title='donation'
        icon={require('./app/img/ic_support.png')}
        selected={this.state.selectedTab === 'support'}
        onPress={() => {
          this.setState({
            selectedTab: 'support'
          });
        }}
        >
        <SupportComponent />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#212121',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('OverwatchIos', () => OverwatchIos);
