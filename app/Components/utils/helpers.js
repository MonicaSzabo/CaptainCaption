// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require('axios');

// YouTube API
var youtubeAPI = "AIzaSyDO07X4nG5oRHh5hOmOOyUvEuME6EeEMpY";

// Helper Functions
var helpers = {

	runQuery: function(query){

		var queryURL = "https://www.googleapis.com/youtube/v3/search?key=" + youtubeAPI + "&part=snippet,id&type=video&maxResults=6&videoCaption=closedCaption&q=" + query;

		return axios.get(queryURL)
			.then(function(data){

				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;

				console.log(data.data);

				var videoInfo = data.data.items;

				console.log(videoInfo);

				var results = [];

				for(var i = 0; i < videoInfo.length; i++){
					var videoURL = "https://www.youtube.com/embed/" + videoInfo[i].id.videoId + "?cc_load_policy=1"

					results.push(videoURL);
				}


				// $.each(data.items, function(i, item) {
				// 	var output = getOutput(item);


				// });
				console.log("this is results: " + results);
				return results;
		})

	},

	// getOutput: function(item){
	// 	var videoId = item.id.videoId;
	// 	var title = item.snippet.title;
	// 	var description = item.snippet.description;
	// 	var thumb = item.snippet.thumbnails.high.url;
	// 	var channelTitle = item.snippet.channelTitle;
	// 	var videoDate = item.snippet.publishedAt;

	// },


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