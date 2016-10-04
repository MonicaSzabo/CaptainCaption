var axios = require('axios');

// Include React 
var React = require('react');

// Here we include all of the sub-components
var Form = require('./Children/Form');
var Results = require('./Children/Results');
var Saved = require('./Children/Saved');
var LoadMore = require('./Children/LoadMore');

// Helper Function
var helpers = require('./utils/helpers.js');


// This is the main component. 
var Main = React.createClass({

	// Here we set a generic state associated with the number of clicks
	getInitialState: function(){
		return {
			topic: "volcano",
			results: [{
				description:"Learn what a volcano is and how does it erupt with the help of your friend Dr. Binocs. Hey kids! Have you ever heard of a volcanic eruption? Do words like ...",
				thumbnail:"https://i.ytimg.com/vi/lAmqsMQG3RM/hqdefault.jpg",
				title:"Volcano | The Dr. Binocs Show | Learn Videos For Kids",
				url:"https://www.youtube.com/embed/lAmqsMQG3RM?cc_load_policy=1"},
				{
				description:"Inside A Volcano: Explorer Travels To The World's Most Extreme Environments WATCH on our Barcroft TV Website: ...",
				thumbnail:"https://i.ytimg.com/vi/w-zFVW-wEx0/hqdefault.jpg",
				title:"Inside A Volcano: Explorer Travels To The World's Most Extreme Environments",
				url:"https://www.youtube.com/embed/w-zFVW-wEx0?cc_load_policy=1"},
				{
				description:"A song to help teach about volcanoes- eruptions, magma, lava, and more! (lyrics below) See more of Mr. R.'s free science resources at sciencepoems.net ...",
				thumbnail:"https://i.ytimg.com/vi/bwTkTzdkVS4/hqdefault.jpg",
				title:"Volcano Song",
				url:"https://www.youtube.com/embed/bwTkTzdkVS4?cc_load_policy=1"},
				{
				description:"HooplakidzLab is back with a brand new science experiment video, Volcano of Vinegar. I hope you like the new style. Join me on Facebook: ...",
				thumbnail:"https://i.ytimg.com/vi/ghth9zAd_hQ/hqdefault.jpg",
				title:"Vinegar Volcano Science Experiment by HooplakidzLab",
				url:"https://www.youtube.com/embed/ghth9zAd_hQ?cc_load_policy=1"},
				{
				description:"Volcano potato recipe. Epic hollowed potato wrapped in bbq sauce coated bacon, with gooey cheese filling, sriracha topping! So good! Subscribe for regular ...",
				thumbnail:"https://i.ytimg.com/vi/LT60qV329_E/hqdefault.jpg",
				title:"VOLCANO POTATO",
				url:"https://www.youtube.com/embed/LT60qV329_E?cc_load_policy=1"},
				{
				description:"One of the most dramatic landforms on the planet, volcanoes come in many different shapes and sizes. Learn how volcanoes form, what types and structures ...",
				thumbnail:"https://i.ytimg.com/vi/V863xR0Y2qk/hqdefault.jpg",
				title:"All About Volcanoes for Children: Introduction to Volcanoes for Kids - FreeSchool",
				url:"https://www.youtube.com/embed/V863xR0Y2qk?cc_load_policy=1"}],
			nextPageToken: 'CAYQAA',
			prevPageToken: null,
			savedVideos: [],
			userName: 'Anonymous, Sign In Up Top',
			userID: null,
			isAuthorized: false
		}
	},	

	// We use this function to allow children to update the parent with searchTerms.
	setTerm: function(topic){
		this.setState({
			topic: topic,
		});
	},

	saveVideo: function(url, title, description, thumbnail, userID){
		Materialize.toast("Video Saved!", 4000);
		helpers.postVideo(url, title, description, thumbnail, userID);
		this.getVideo();
	},
	// This is what needs to be sent in the "SAVE VIDEO" button
	// {this.saveVideo({data.url}, {data.title}, {data.description}, {data.thumbnail}, {this.state.userID})}
	// {this.state.savedVideos.map(function(data, index){})}

	deleteVideo: function(video){
		axios.delete('/api/saved/' + video._id)
			.then(function(response){
				this.setState({
					savedVideos: response.data
				});
				return response;
			}.bind(this));

		this.getVideo();
	},

	getVideo: function(){
		axios.get('/api/saved')
			.then(function(response){
				this.setState({
					savedVideos: response.data
				});
			}.bind(this));
	},

	nextPage: function() {
		if(!this.state.nextPageToken) {
			Materialize.toast("You're at the end!", 4000);
		}
		else if(this.state.nextPageToken) {
			helpers.runQueryWithToken(this.state.topic, this.state.nextPageToken)
			.then(function(data){
				this.setState({
					results: data[0],
					nextPageToken: data[1],
					prevPageToken: data[2]
				})
			}.bind(this))   

			$('html, body').animate({scrollTop: $("#topResults").offset().top}, 3000);
		}
	},

	prevPage: function() {
		if(!this.state.prevPageToken) {
			Materialize.toast("You're at the beginning!", 4000);
		}
		else if(this.state.prevPageToken) {
			helpers.runQueryWithToken(this.state.topic, this.state.prevPageToken)
			.then(function(data){
				this.setState({
					results: data[0],
					nextPageToken: data[1],
					prevPageToken: data[2]
				})
			}.bind(this))
		}
		
	},

	// If the component updates we'll run this code
	componentDidUpdate: function(prevProps, prevState){

		if(prevState.topic != this.state.topic){

			helpers.runQuery(this.state.topic)
				.then(function(data){
					if (data != this.state.results)
					{
						this.setState({
							results: data[0],
							nextPageToken: data[1],
							prevPageToken: data[2]
						})
					}
				}.bind(this))
		}
	},

	componentDidMount: function(){

		axios.get('/authorize')
			.then(function(data){
				this.setState({
					isAuthorized: data.data.isAuthorized,
					userName: data.data.user.firstName,
					userID: data.data.user._id
				});
				Materialize.toast("You are logged in!", 4000);
			}.bind(this));

		if(!this.state.isAuthorized) {
			this.setState({
				userName: 'Anonymous, Sign In Up Top',
				userID: null
			});
		}

		axios.get('/api/saved')
			.then(function(response){
				this.setState({
					savedVideos: response.data
				});
			}.bind(this));
	},

	// Here we render the function
	render: function(){
		return(

			  <div className="section">

			  	<div className="row center-align" id="topResults">
			      <h4>Welcome {this.state.userName}!</h4>
			      <br />
			    </div>

			    <div className="row">

					<Form setTerm={this.setTerm}/>

				</div>

			    <div className="row center-align" id="topResults">
			      <h4>Results for "{this.state.topic}"</h4>
			      <br />
			    </div>
			    <div className="row center-align">
			    {this.state.results.map(function(data, index){
			    	return  <div className="main">
			    			<div className="col s12 m6 l4">
			    			<div className="card hoverable">
			    				<div className="card-image">
			    					<a className="modal-trigger" href={"#watchvideo"+index}><img src={data.thumbnail} alt="Video Thumbnail"/>
			    					<span className="card-title left-align">{data.title}</span></a>
			    				</div>
		    					<div className="card-content left-align">
          							<p>{data.description}</p>
        						</div>
        						<a className="white-text modal-trigger" href={"#watchvideo"+index}><div className="card-action col s6 m6 l6" style={{'backgroundColor':'#0081af'}}>
					              WATCH VIDEO
					            </div></a>
					            <a className="white-text" href='#'><div className="card-action col s6 m6 l6" style={{'backgroundColor':'#1b998b'}}>
					              SAVE VIDEO
					            </div></a>
			    			</div>
			    			</div>

			    			<div className="modal" id={"watchvideo"+index}>
							    <div className="modal-content">
							      <div className="video-container">
			   						<iframe width="1102" height="620" src={data.url} className="responsive-video" frameBorder="0" id={index} allowFullScreen>
			    					</iframe>
 			    				   </div>
							    </div>
							    <div className="modal-footer">
     								<a href="#" className="modal-action modal-close waves-effect waves-light btn-flat">Close</a>
   								</div>
							</div>

							<div className="modal" id="savedVideos">
							    <div className="modal-content">
							      <h4>Saved Videos</h4>
							      <div className="row">
							      	This is where the saved videos will go.  If user not signed it, it will ask them to sign in.
							      </div>
							    </div>
							    <div className="modal-footer">
     								<a href="#" className="modal-action modal-close waves-effect waves-light btn-flat">Close</a>
   								</div>
							</div>
							</div>
			    })}
			    </div>

			    <LoadMore prevPage={this.prevPage} nextPage={this.nextPage} />

			  </div>
		)
	}
});

module.exports = Main;


