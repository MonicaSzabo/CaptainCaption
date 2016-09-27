// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require('axios');

// YouTube API
var youtubeAPI = "AIzaSyDO07X4nG5oRHh5hOmOOyUvEuME6EeEMpY";

// Helper Functions
var helpers = {

	runQuery: function(query){

		var queryURL = "https://www.googleapis.com/youtube/v3/search?key=" + youtubeAPI + "&part=snippet,id&type=video&maxResults=6&videoCaption=closedCaption&safeSearch=strict&q=" + query;

		return axios.get(queryURL)
			.then(function(data){

				var nextPageToken = data.data.nextPageToken;
				var prevPageToken = data.data.prevPageToken;

				var videoInfo = data.data.items;


				var results = [];

				for(var i = 0; i < videoInfo.length; i++){
					var videoObj = {
						'url': "https://www.youtube.com/embed/" + videoInfo[i].id.videoId + "?cc_load_policy=1",
						'title': videoInfo[i].snippet.title,
						'description': videoInfo[i].snippet.description,
						'thumbnail': videoInfo[i].snippet.thumbnails.high.url,
						'nextPageToken': nextPageToken,
						'prevPageToken': prevPageToken,
						'query': query
					}

					results.push(videoObj);
				}

				return results;
		})

	},

	nextPage: function(result) {

		var query = result[0].query;
		var nextPageToken = result[0].nextPageToken;
		var prevPageToken = result[0].prevPageToken;

		console.log(query);
		console.log(nextPageToken);
		console.log(prevPageToken);

		var queryURL = "https://www.googleapis.com/youtube/v3/search?key=" + youtubeAPI + "&part=snippet,id&pageToken=CBkQAA&type=video&maxResults=6&videoCaption=closedCaption&safeSearch=strict&q=" + query;

		return axios.get(queryURL)
			.then(function(data){

				var nextPageToken = data.data.nextPageToken;
				var prevPageToken = data.data.prevPageToken;

				var videoInfo = data.data.items;


				var results = [];

				for(var i = 0; i < videoInfo.length; i++){
					var videoObj = {
						'url': "https://www.youtube.com/embed/" + videoInfo[i].id.videoId + "?cc_load_policy=1",
						'title': videoInfo[i].snippet.title,
						'description': videoInfo[i].snippet.description,
						'thumbnail': videoInfo[i].snippet.thumbnails.high.url
					}

					results.push(videoObj);
				}

				console.log("this is results: ");
				console.log(results);
				return results;
		})
	},


	// This function posts saved videos to our database.
	postVideo: function(title, date, url){

		axios.post('/api/saved', {title: title, date: date, url: url})
		.then(function(results){

			console.log("Posted to MongoDB");
			return(results);
		})
	}

}


// We export the helpers function (which contains getGithubInfo)
module.exports = helpers;