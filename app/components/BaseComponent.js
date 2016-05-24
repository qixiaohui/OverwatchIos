import React, { Component } from 'react';
import NewsComponent from './NewsComponent';
import PicComponent from './PicComponent';
import SupportComponent from './SupportComponent';
import TwitchComponent from './TwitchComponent';
import TwitterComponent from './TwitComponent';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TabBarIOS,
  NavigatorIOS,
  View
} from 'react-native';

export default class BaseComponent extends Component {
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
        icon={require('../img/ic_newspaper.png')}
        selected={this.state.selectedTab === 'news'}
        onPress={() => {
          this.setState({
            selectedTab: 'news'
          });
        }}
        >
        <NewsComponent navigator={this.props.navigator} />
        </TabBarIOS.Item>
        <TabBarIOS.Item
        title='twitter'
        icon={require('../img/ic_twitter.png')}
        selected={this.state.selectedTab === 'twitter'}
        onPress={() => {
          this.setState({
            selectedTab: 'twitter'
          });
        }}
        >
        <TwitterComponent navigator={this.props.navigator} />
        </TabBarIOS.Item>
        <TabBarIOS.Item
        title='twitch'
        icon={require('../img/ic_twitch.png')}
        selected={this.state.selectedTab === 'twitch'}
        onPress={() => {
          this.setState({
            selectedTab: 'twitch'
          });
        }}
        >
        <TwitchComponent navigator={this.props.navigator} />
        </TabBarIOS.Item>
        <TabBarIOS.Item
        title='picture'
        icon={require('../img/ic_picture.png')}
        selected={this.state.selectedTab === 'picture'}
        onPress={() => {
          this.setState({
            selectedTab: 'picture'
          });
        }}
        >
        <PicComponent navigator={this.props.navigator} />
        </TabBarIOS.Item>
        <TabBarIOS.Item
        title='donation'
        icon={require('../img/ic_support.png')}
        selected={this.state.selectedTab === 'support'}
        onPress={() => {
          this.setState({
            selectedTab: 'support'
          });
        }}
        >
        <SupportComponent navigator={this.props.navigator} />
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