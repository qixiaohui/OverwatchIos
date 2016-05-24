import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  ActivityIndicatorIOS
} from 'react-native';
import HttpService from '../service/HttpService';
import _ from 'underscore';
export default class PicComponent extends Component{
	constructor(props){
		super(props);
		this.state = {
			loading: true,
			dataSource: new ListView.DataSource({
    			rowHasChanged: (row1, row2) => row1 !== row2,        
			}),
		};
	}
	componentDidMount() {
		this.getHeros();
	}
	getHeros = () => {
		HttpService.getHeros().then((response) => response.json()).then((response) => {
			this.setState({
				loading: false,
				dataSource: this.state.dataSource.cloneWithRows(response),
			});
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
		      <ListView contentContainerStyle={styles.list}
		        dataSource={this.state.dataSource}
		        renderRow={this.renderRow.bind(this)}
		      />
			);
		}
	}
	renderRow = (item) => {
		return(
			<View style={styles.heroCard}>
				<Image style={styles.heroImg} source={{uri: item.imgPath+'.png'}} />
				<Text style={styles.heroName}>{item.heroname}</Text>
			</View>
		);
	}
}

var styles = StyleSheet.create({
	list: {
	    justifyContent: 'space-around',
	    flexDirection: 'row',
	    flexWrap: 'wrap',
	    backgroundColor: '#000000'
	},
	heroCard: {
		width: 160,
		margin: 5,
		backgroundColor: '#424242'
	},
	heroImg: {
		height: 200
	},
	heroName: {
		fontSize: 15,
		color: '#ff8000',
		margin: 5
	},
	loading: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#000000'
	},
});