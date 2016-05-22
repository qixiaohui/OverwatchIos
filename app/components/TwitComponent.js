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
export default class TwitComponent extends Component{
	constructor(props){
		super(props);
		this.state = {
			dataSource: new ListView.DataSource({
    			rowHasChanged: (row1, row2) => row1 !== row2,        
			}),
		};
	}
	componentDidMount = () => {
		HttpService.getTwits().then((response) => response.json()).then((response) => {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(response),
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
	renderRow = (item) => {
		let avatar  =item.user.profile_image_url.replace("_normal","");
		return (
			<View style={styles.twitCard}>
				<Image style={styles.imgStyle} source={{uri: avatar}} />
				<View style={styles.twitText}>
					<Text style={styles.twitName}>{item.user.screen_name}</Text>
					<Text style={styles.twitContent}>{item.text}</Text>
				</View>
			</View>
		);
	}
}

var styles = StyleSheet.create({
	listView: {
		backgroundColor: '#000000'
	},
	twitCard: {
		margin: 5,
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#424242'
	},
	imgStyle: {
		flex: 1,
		height: 125
	},
	twitText: {
		margin: 5,
		flex: 3,
		flexDirection: 'column'
	},
	twitName: {
		flex: 1,
		margin: 5,
		fontSize: 12,
		color: '#ff8000',
	},
	twitContent: {
		margin: 5,
		flex: 3,
		fontSize: 15,
		color: '#ff8000',
	}
});