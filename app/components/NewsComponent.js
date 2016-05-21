import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image
} from 'react-native';
import HttpService from '../service/HttpService'
import _ from 'underscore'
export default class NewsComponent extends Component{
	constructor(props){
		super(props);
		this.state = {
			news: null,
			dataSource: new ListView.DataSource({
    			rowHasChanged: (row1, row2) => row1 !== row2,        
			}),
		}
	}
	getNews = (index) => {
		HttpService.getDingDangNews(index).then((response) => response.json()).then((response) => {
			this.state.news = response.results;
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(this.state.news),
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
			<View style={styles.newsCard}>
				{row.iurl?<Image style={styles.newsImg} source={{uri: row.iurl}} />:null}
				<Text style={styles.newsTitle}>{row.title}</Text>
				<View style={{flex: 1, flexDirection: 'row'}}>
					{row.author?<Text style={styles.author}>{row.author}</Text>:null}
					{row.domain?<Text style={styles.domain}>{row.domain}</Text>:null}
				</View>
			</View>
		);
	}
	componentDidMount() {
		this.getNews(1);
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
  }
});