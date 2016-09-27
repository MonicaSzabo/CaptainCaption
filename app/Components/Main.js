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
			topic: "kitten",
			results: [{
				description:"On a cold Thanksgiving morning, Branden Bingham and his family stumbled upon a seemingly frozen kitten buried in the snow. In an attempt to save his life, ...",
				thumbnail:"https://i.ytimg.com/vi/rCnRqZw4WiE/hqdefault.jpg",
				title:"GoPro Awards: Frozen Kitten Lives",
				url: "https://www.youtube.com/embed/rCnRqZw4WiE?cc_load_policy=1"},
				{
				description:"If you bite the mic then we can't use this audio”. Check out more awesome videos at BuzzFeedVideo! http://bit.ly/YTbuzzfeedvideo MUSIC Hop Skip And A Jump ...",
				thumbnail:"https://i.ytimg.com/vi/yH2FPSupO6c/hqdefault.jpg",
				title:"Cat Lovers Get Surprised By A Box Of Kittens",
				url: "https://www.youtube.com/embed/yH2FPSupO6c?cc_load_policy=1"},
				{
				description:"The secret to stress relief? Tiny kittens! We invited strangers to step inside our big glass 'therapy' office and surprised them with kitten playtime. Click to tweet: ...",
				thumbnail:"https://i.ytimg.com/vi/35T8wtmTbVg/hqdefault.jpg",
				title:"Kitten Therapy: The Prescription for Stress",
				url: "https://www.youtube.com/embed/35T8wtmTbVg?cc_load_policy=1"},
				{
				description:"Click to Tweet! http://bit.ly/ACKittyRT FB! http://on.fb.me/1uMpxKC SUBSCRIBE for more videos ▻ http://bit.ly/IWantMORE Assassin's Kittens - the fluffy hazard of ...",
				thumbnail:"https://i.ytimg.com/vi/jnk15Wf6xMU/hqdefault.jpg",
				title:"Assassin's Kittens!",
				url: "https://www.youtube.com/embed/jnk15Wf6xMU?cc_load_policy=1"},
				{
				description:"Share: http://bit.ly/sharejedi This Jedi Cat has got the Force! Thanks to Aaron for working on the video with me: http://www.youtube.com/thevfxbro Andrew wrote ...",
				thumbnail:"https://i.ytimg.com/vi/IwT7BHztBIU/hqdefault.jpg",
				title:"Jedi Kitten - The Force Awakens",
				url: "https://www.youtube.com/embed/IwT7BHztBIU?cc_load_policy=1"},
				{
				description:"Jana Adopts a Kitten.",
				thumbnail:"https://i.ytimg.com/vi/0AspToApy88/hqdefault.jpg",
				title:"Jana Adopts a Kitten",
				url: "https://www.youtube.com/embed/0AspToApy88?cc_load_policy=1"}],
			nextPageToken: 'CAYQAA',
			prevPageToken: null,
			savedVideos: []
		}
	},	

	// We use this function to allow children to update the parent with searchTerms.
	setTerm: function(topic){
		this.setState({
			topic: topic,
		});
	},

	saveVideo: function(title, date, url){
		helpers.postVideo(title, date, url);
		this.getVideo();
	},

	deleteVideo: function(video){
		console.log(video);
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
			console.log("UPDATED");

			helpers.runQuery(this.state.topic)
				.then(function(data){
					console.log("this is data: ");
					console.log(data);
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

			    <div className="row">

					<Form setTerm={this.setTerm}/>

				</div>

			    <div className="row center-align">
			      <h4>Results for "{this.state.topic}"</h4>
			      <br />
			    </div>
			    <div className="row center-align" style={{width: 900}}>
			    {this.state.results.map(function(data, index){
			    	return  <div className="main">
			    			<div className="col s4 m4 l4">
			    			<div className="card" id={index}>
			    				<div className="card-image">
			    					<a className="modal-trigger" href={"#watchvideo"+index}><img src={data.thumbnail} alt="Video Thumbnail"/>
			    					<span className="card-title left-align">{data.title}</span></a>
			    				</div>
		    					<div className="card-content left-align">
          							<p>{data.description}</p>
        						</div>
        						<a className="white-text modal-trigger" href={"#watchvideo"+index}><div className="card-action" style={{'backgroundColor':'#0081af'}}>
					              WATCH VIDEO
					            </div></a>
			    			</div>
			    			</div>

			    			<div className="modal" id={"watchvideo"+index}>
							    <div className="modal-content">
							      <div className="video-container">
			   						<iframe width="1102" height="620" src={data.url} className="responsive-video" frameBorder="0" allowFullScreen>
			    					</iframe>
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


