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
export default class TwitComponent extends Component{
	constructor(props){
		super(props);
		this.state = {
			loading: true,
			dataSource: new ListView.DataSource({
    			rowHasChanged: (row1, row2) => row1 !== row2,        
			}),
		};
	}
	componentDidMount = () => {
		HttpService.getTwits().then((response) => response.json()).then((response) => {
			this.setState({
				loading: false,
				dataSource: this.state.dataSource.cloneWithRows(response),
			});
		}).catch((response) => {
			console.error(response);
		}).done();
	}
	forward = (row) => {
		if(row.user.url){
			this.props.navigator.push({
				title: row.user.screen_name,
				component: WebContentComponent,
				navigationBarHidden: false,
				passProps: {url: row.user.url}
			});
		}
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
				  />
				</View>
			);
		}
	}
	renderRow = (item) => {
		let avatar  =item.user.profile_image_url.replace("_normal","");
		return (
			<TouchableHighlight onPress={() => {this.forward(item)}}>
				<View style={styles.twitCard}>
					<Image style={styles.imgStyle} source={{uri: avatar}} />
					<View style={styles.twitText}>
						<Text style={styles.twitName}>{item.user.screen_name}</Text>
						<Text style={styles.twitContent}>{item.text}</Text>
					</View>
				</View>
			</TouchableHighlight>
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
	},
	loading: {
	  	flex: 1,
	    alignItems: 'center',
	    justifyContent: 'center',
	    backgroundColor: '#000000'
    },	
});