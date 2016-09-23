// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require('axios');

// YouTube API
var youtubeAPI = "AIzaSyDO07X4nG5oRHh5hOmOOyUvEuME6EeEMpY";

// Helper Functions
var helpers = {

	runQuery: function(query){

		console.log("is runQuery hitting?");

		var queryURL = "https://www.googleapis.com/youtube/v3/search?key=" + youtubeAPI + "&part=snippet,id&type=video&q=" + query;

		return axios.get(queryURL)
			.then(function(data){

				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;

				console.log(data);

				$.each(data.items);

				// var newResults = [];
				// var fullResults = response.data.response.docs;
				// var counter = 0;

				// for(var i = 0; i < fullResults.length; i++){

				// 	if(counter > 4) {
				// 		return newResults;
				// 	}

				// 	if(fullResults[counter].headline.main && fullResults[counter].pub_date && fullResults[counter].web_url) {
				// 		newResults.push(fullResults[counter]);
				// 		counter++;
				// 	}
				// }

				// return newResults;
		})

	},


	// This function posts saved articles to our database.
	postArticle: function(title, date, url){

		axios.post('/api/saved', {title: title, date: date, url: url})
		.then(function(results){

			console.log("Posted to MongoDB");
			return(results);
		})
	}

}


// We export the helpers function (which contains getGithubInfo)
module.exports = helpers;