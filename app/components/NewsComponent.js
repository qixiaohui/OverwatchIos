import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  NavigatorIOS,
  TouchableHighlight,
  Image,
  ActivityIndicatorIOS
} from 'react-native';
import HttpService from '../service/HttpService'
import _ from 'underscore'
import WebContentComponent from './WebContentComponent'
export default class NewsComponent extends Component{
	constructor(props){
		super(props);
		this.state = {
			index: 1,
			loading: true,
			news: null,
			size: 0,
			dataSource: new ListView.DataSource({
    			rowHasChanged: (row1, row2) => row1 !== row2,        
			}),
		}
	}
	getNews = () => {
		HttpService.getDingDangNews(this.state.index).then((response) => response.json()).then((response) => {
			this.state.news = response.results;
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(this.state.news),
				loading: false,
				index: 1+response.results.length,
				size: response.count
			});

		}).catch((response) => {
			console.error(response);
		}).done();
	}
	getMoreNews = () => {
		if(this.state.dataSource._dataBlob.s1.length >= this.state.size){
			return;
		}

		HttpService.getDingDangNews(this.state.index).then((response) => response.json()).then((response) => {
			if(response.start >= this.state.dataSource._dataBlob.s1.length){
				let length = this.state.dataSource._dataBlob.s1.length+response.results.length;
				let more = this.state.dataSource._dataBlob.s1.concat(response.results);
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(more),
					index: length+1
				});
			}

		}).catch((response) => {
			console.error(response);
		}).done();
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
				<View style={styles.container}>
				  <ListView
					dataSource={this.state.dataSource}
					renderRow={this.renderRow.bind(this)}
					style={styles.listView}
					onEndReached={this.getMoreNews.bind(this)}
				  />
				</View>
			);
		}
	}
	forward = (row) => {
		this.props.navigator.push({
			title: row.domain,
			component: WebContentComponent,
			navigationBarHidden: false,
			passProps: {url: row.url}
		});
	}
 	renderRow = (row) => {
		return(
			<TouchableHighlight onPress={() => {this.forward(row)}}>
				<View style={styles.newsCard}>
					{row.iurl?<Image style={styles.newsImg} source={{uri: row.iurl}} />:null}
					<Text style={styles.newsTitle}>{row.title}</Text>
					<View style={{flex: 1, flexDirection: 'row'}}>
						{row.author?<Text style={styles.author}>{row.author}</Text>:null}
						{row.domain?<Text style={styles.domain}>{row.domain}</Text>:null}
					</View>
				</View>
			</TouchableHighlight>
		);
	}
	componentDidMount() {
		this.getNews();
	}
}

var styles = StyleSheet.create({
  container: {
  	flex: 1
  },
  listView: {
    paddingTop: 5,
    backgroundColor: '#000000'
  },	
  newsImg: {
  	height: 200,
  	margin: 5,
  },
  newsTitle: {
  	color: '#ff8000',
  	margin: 10,
  	fontSize: 17,
  },
  author: {
  	color: '#ff8000',
  	flex: 1,
  	textAlign: 'left',
  	margin: 10,
  },
  domain: {
  color: '#ff8000',
  flex: 1,
  textAlign: 'right',
  margin: 10
  },
  newsCard: {
  	margin: 5,
  	backgroundColor: '#424242'
  },
  loading: {
  	flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000'
  },
});