import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicatorIOS
} from 'react-native';
import _ from 'underscore'
import WebContentComponent from './WebContentComponent'
export default class SupportComponent extends Component{
	constructor(props){
		super(props);
		this.state = {};
	}
	render() {
		return(<View>
				<Text>news</Text>
			</View>);
	}
}

var styles = StyleSheet.create({
	
});