// Include React 
var React = require('react');

// Component creation
var LoadMore = React.createClass({

	// Here we render the function
	render: function(){

		return(
			<div className="row center-align">
				<div className="col s6 m6 l6">
			    	<button type="button" className="btn btn-primary waves-effect waves-light btn" onClick={this.props.prevPage} style={{backgroundColor:'#0081af'}}>Previous</button>
			    </div>
			    <div className="col s6 m6 l6">
					<button type="button" className="btn btn-primary waves-effect waves-light btn" onClick={this.props.nextPage} style={{backgroundColor:'#0081af'}}>Next</button>
				</div>
			</div>
		)
	}
});

// Export the component back for use in other files
module.exports = LoadMore;