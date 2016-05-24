import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  WebView
} from 'react-native';
import _ from 'underscore'
export default class NewsContentComponent extends Component{
	constructor(props){
		super(props);
		this.state = {};
	}
	render() {
		return(<View style={{flex: 1}}>
				<WebView source={{uri: this.props.url}} />
			</View>);
	}
}

var styles = StyleSheet.create({
	
});