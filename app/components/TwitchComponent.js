import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image
} from 'react-native';
import HttpService from '../service/HttpService';
import _ from 'underscore'
export default class TwitchComponent extends Component{
	constructor(props){
		super(props);
		this.state = {			
			streams: null,
			dataSource: new ListView.DataSource({
    			rowHasChanged: (row1, row2) => row1 !== row2,        
			}),
		};
	}
	getTwitch = () => {
		HttpService.getTwitch().then((response) => response.json()).then((response) => {
			this.state.streams = response.streams;
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(this.state.streams),
			});
		}).catch((response) => {
			console.error(response);
		}).done();
	}
	render() {
		return(
			<View style={{flex: 1}}>
			  <ListView
				dataSource={this.state.dataSource}
				renderRow={this.renderRow.bind(this)}
				style={styles.listView}
			  />
			</View>
		);
	}
	renderRow = (row) => {
		return(
			<View style={styles.twitchCard}>
				<View style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
					<Image style={styles.twitchImg} source={{uri: row.preview.medium}} />
					<Image style={styles.playBtn} source={require('../img/ic_play.png')} />
				</View>
				<Text style={styles.gamer}>{row.channel.display_name}</Text>
				<Text style={styles.twitchTitle}>{row.channel.status}</Text>
			</View>
		);
	}
	componentDidMount() {
		this.getTwitch();
	}
}

var styles = StyleSheet.create({
  listView: {
    paddingTop: 5,
    backgroundColor: '#000000'
  },	
  newsImg: {
  	height: 200,
  	margin: 5,
  },
  twitchImg: {
  	alignSelf: "stretch",
  	height: 200,
  	margin: 5,
  },
  gamer: {
  	margin: 10,
  	fontSize: 12,
  	color: '#ff8000',
  },
  twitchTitle: {
  	color: '#ff8000',
  	margin: 10,
  	fontSize: 17,
  },
  twitchCard: {
  	margin: 5,
  	backgroundColor: '#424242'
  },
  playBtn: {
  	top: 80, 
  	left: 170,
  	width: 50, 
  	height: 50,
  	position: 'absolute',
  }
});