// Include React 
var React = require('react');

// Component creation
var Form = React.createClass({

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
			<div className="searchForm">
				<form id="searching">
					<div className="input-field col s12">
						<input id="topic" type="text" className="validate" onChange= {this.handleChange}/>
						<label htmlFor="topic">Search by Topic</label>
					    <i className="material-icons">search</i>
					</div>
					<div className="row center-align">
						<button type="button" className="btn btn-primary waves-effect waves-light btn" onClick={this.handleClick} style={{backgroundColor:'#0081af'}}>Search</button>
					</div>
				</form>
			</div>
		)
	}
});

// Export the component back for use in other files
module.exports = Form;