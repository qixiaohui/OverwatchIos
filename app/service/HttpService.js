import axios from 'axios';
import Urls from '../util/urls'

export default {
	getHeros: function(){
		return axios.get('/heros/allheros');
	},
	getDingDangNews: function(index) {
		let options = {
			method: 'GET',
			timeout: 10,
			headers: {
				pagination: index,
				language: 'en'
			}
		};

		return fetch(Urls.news, options);
	},
	getTwits: function(){
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; 
		var yyyy = today.getFullYear();

		if(dd<10) {
		    dd='0'+dd
		} 

		if(mm<10) {
		    mm='0'+mm
		} 

		today = yyyy+'-'+mm+'-'+dd;
		return axios({
			method: 'get',
			url: '/twits/allTwits',
			headers: {q: 'overwatch since:'+today, count: 50}
		});
	}
}