import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  Image,
  ActivityIndicatorIOS
} from 'react-native';
import HttpService from '../service/HttpService';
import _ from 'underscore'
import WebContentComponent from './WebContentComponent'
export default class TwitchComponent extends Component{
	constructor(props){
		super(props);
		this.state = {	
			loading: true,		
			streams: null,
			size: 0,
			index: 1,
			dataSource: new ListView.DataSource({
    			rowHasChanged: (row1, row2) => row1 !== row2,        
			}),
		};
	}
	getTwitch = () => {
		HttpService.getTwitch(this.state.index).then((response) => response.json()).then((response) => {
			this.state.streams = response.streams;
			this.setState({
				loading: false,
				dataSource: this.state.dataSource.cloneWithRows(this.state.streams),
				index: 1 + response.streams.length,
				size: response._total
			});
		}).catch((response) => {
			console.error(response);
		}).done();
	}
	getMoreTwitch = () => {
		if(this.state.dataSource._dataBlob.s1.length >= this.state.size){
			return;
		}

		HttpService.getTwitch(this.state.index).then((response) => response.json()).then((response) => {
			let length = this.state.dataSource._dataBlob.s1.length+response.streams.length;
			let more = this.state.dataSource._dataBlob.s1.concat(response.streams);
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(more),
				index: length+1
			});
		}).catch((response) => {
			console.error(response);
		}).done();		
	}
	forward = (row) => {
		this.props.navigator.push({
			title: row.domain,
			component: WebContentComponent,
			navigationBarHidden: false,
			passProps: {url: "http://player.twitch.tv/?channel=" + row.channel.name +"&html5"}
		});
	}
	render() {
		if(this.state.loading){
			return (
				<View style={styles.loading}>
					<ActivityIndicatorIOS
		            size="large" />
				</View>
			);
		}else{
			return(
				<View style={{flex: 1}}>
				  <ListView
					dataSource={this.state.dataSource}
					renderRow={this.renderRow.bind(this)}
					style={styles.listView}
					onEndReached={this.getMoreTwitch.bind(this)}
				  />
				</View>
			);
		}
	}
	renderRow = (row) => {
		return(
			<TouchableHighlight onPress={() => {this.forward(row)}}>
				<View style={styles.twitchCard}>
					<View style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
						<Image style={styles.twitchImg} source={{uri: row.preview.medium}} />
						<Image style={styles.playBtn} source={require('../img/ic_play.png')} />
					</View>
					<Text style={styles.gamer}>{row.channel.display_name}</Text>
					<Text style={styles.twitchTitle}>{row.channel.status}</Text>
				</View>
			</TouchableHighlight>
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
  },
  loading: {
  	flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000'
  },
});