var axios = require('axios');

// Include React 
var React = require('react');

// Here we include all of the sub-components
var Form = require('./Children/Form');
var Results = require('./Children/Results');
var Saved = require('./Children/Saved');

// Helper Function
var helpers = require('./utils/helpers.js');


// This is the main component. 
var Main = React.createClass({

	// Here we set a generic state associated with the number of clicks
	getInitialState: function(){
		return {
			topic: "puppies",
			results: ["https://www.youtube.com/embed/1GJqfyzfCWU?cc_load_policy=1", "https://www.youtube.com/embed/0JboM-STb4E?cc_load_policy=1", "https://www.youtube.com/embed/5wdgrEGE50Q?cc_load_policy=1", "https://www.youtube.com/embed/ZCVa_ngrZBY?cc_load_policy=1", "https://www.youtube.com/embed/aQUPkOfSGq8?cc_load_policy=1", "https://www.youtube.com/embed/U8L0NlstyhU?cc_load_policy=1"],
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

	// If the component updates we'll run this code
	componentDidUpdate: function(prevProps, prevState){

		if(prevState.topic != this.state.topic){
			console.log("UPDATED");

			helpers.runQuery(this.state.topic)
				.then(function(data){
					if (data != this.state.results)
					{
						this.setState({
							results: data
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
			    {this.state.results.map(function(url, index){
			    	return <div className="video" style={{margin: 20}, {display: 'inline-block'}}><iframe width="250" src={url} id={index} frameBorder="0" allowFullScreen></iframe></div>
			    })}
			    </div>
			  </div>


		)
	}
});

module.exports = Main;