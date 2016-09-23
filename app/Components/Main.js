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
			topic: "",
			results: [],
			savedArticles: []
		}
	},	

	// We use this function to allow children to update the parent with searchTerms.
	setTerm: function(topic){
		console.log("is this hitting?");
		this.setState({
			topic: topic,
		})
	},

	saveArticle: function(title, date, url){
		helpers.postArticle(title, date, url);
		this.getArticle();
	},

	deleteArticle: function(article){
		console.log(article);
		axios.delete('/api/saved/' + article._id)
			.then(function(response){
				this.setState({
					savedArticles: response.data
				});
				return response;
			}.bind(this));

		this.getArticle();
	},

	getArticle: function(){
		axios.get('/api/saved')
			.then(function(response){
				this.setState({
					savedArticles: response.data
				});
			}.bind(this));
	},

	// If the component updates we'll run this code
	componentDidUpdate: function(prevProps, prevState){

		if(prevState.topic != this.state.topic){
			console.log("UPDATED");

			helpers.runQuery(this.state.topic)
				.then(function(data){
					console.log(data);
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
					savedArticles: response.data
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
			      <h4>Search Results for something</h4>
			      <br />
			    </div>
			    <div className="row center-align">
			      <div className="col s12 m4 valign"><img src="assets/images/filler.jpg" style={{width:250}}/></div>
			      <div className="col s12 m4 valign"><img src="assets/images/filler.jpg" style={{width:250}}/></div>
			      <div className="col s12 m4 valign"><img src="assets/images/filler.jpg" style={{width:250}}/></div>
			    </div>
			    <br />
			    <div className="row center-align">
			      <div className="col s12 m4 valign"><img src="assets/images/filler.jpg" style={{width:250}}/></div>
			      <div className="col s12 m4 valign"><img src="assets/images/filler.jpg" style={{width:250}}/></div>
			      <div className="col s12 m4 valign"><img src="assets/images/filler.jpg" style={{width:250}}/></div>
			    </div>
			    <br />
			    <div className="row center-align">
			      <div className="col s12 m4"></div>
			      <div className="col s12 m4">
			        <a className="waves-effect waves-light btn" style={{backgroundColor:'#0081af'}}>Load More</a>
			      </div>
			      <div className="col s12 m4"></div>
			    </div>

			  </div>
		)
	}
});

module.exports = Main;