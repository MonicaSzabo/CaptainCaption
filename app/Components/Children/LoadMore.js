// Include React 
var React = require('react');

// Component creation
var LoadMore = React.createClass({

	// Here we set a generic state associated with the text being searched for
	getInitialState: function(){
		return {
			topic: "",
		}
	},

	// This function will respond to the user input 
	handleChange: function(event){
    	// Here we create syntax to capture any change in text to the query terms (pre-search).
    	var newState = {};
    	newState[event.target.id] = event.target.value;
    	this.setState(newState);
	},

	// When a user submits... 
	handleClick: function(){
		// Set the parent to have the search term
		this.props.setTerm(this.state.topic);
	},

	// Here we render the function
	render: function(){

		return(
			<div className="loadMore">
				<div className="row center-align">
			    	<br />
					<button type="button" className="btn btn-primary waves-effect waves-light btn" onClick={this.nextPage} style={{backgroundColor:'#0081af'}}>Load More</button>

				</div>
			</div>
		)
	}
});

// Export the component back for use in other files
module.exports = LoadMore;