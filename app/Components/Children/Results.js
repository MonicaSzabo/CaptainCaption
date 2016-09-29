// Include React 
var React = require('react');

// Component creation
var Results = React.createClass({

	getInitialState: function(){
		return {
			output: []
		}
	},

	// When a user clicks save article
	clickToSave: function(result){

		this.props.saveVideo();

	},

	componentWillReceiveProps: function(nextProps){
		var that = this;
		var myResults = nextProps.results.map(function(data, index){
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
        						<a className="white-text modal-trigger" href={"#watchvideo"+index}><div className="card-action" style={{'backgroundColor':'#0081af'}}>
					              WATCH VIDEO
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
     								<a href="#" onClick="" className="modal-action modal-close waves-effect waves-light btn-flat">Close</a>
   								</div>
							</div>
							</div>
			    });

		this.setState({results: myResults});
	},
	
	// Here we render the function
	render: function(){
		return(

			<div className="row center-align">
			    {this.state.results}
			</div>


		)
	}
});

// Export the component back for use in other files
module.exports = Results;