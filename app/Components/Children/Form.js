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
	handleClick: function(e){
		e.preventDefault();
		// Set the parent to have the search term
		this.props.setTerm(this.state.topic);
	},

	// Here we render the function
	render: function(){

		return(
			<div className="searchForm">
				<form id="searching" onSubmit={this.handleClick}>
					<div className="input-field col s12">
						<i className="material-icons prefix">search</i>
						<input id="topic" type="text" className="validate" onChange= {this.handleChange}/>
						<label htmlFor="topic">Search by Topic</label>
					</div>
					<div className="row center-align">
						<button type="submit" className="btn btn-primary waves-effect waves-light btn" style={{backgroundColor:'#0081af'}}>Search</button>
					</div>
				</form>
			</div>
		)
	}
});

// Export the component back for use in other files
module.exports = Form;