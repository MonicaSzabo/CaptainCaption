// Include React 
var React = require('react');

// Component creation
var Navbar = React.createClass({
 
           
  // Here we render the function
  render: function(){
     var links = this.props.isAuthorized ? 
                (
                  [<li key="googleout"><a className="white-text" href="https://captaincaption.herokuapp.com/logout">Google Logout</a></li>]
                ) : ([<li key="googlein"><a className="white-text" href="https://captaincaption.herokuapp.com/auth/google">Google Login</a></li>])
    return(
      <nav role="navigation" style={{'backgroundColor':'#0081af'}}>
        <div className="nav-wrapper container">
          <a id="logo-container" href="/" className="brand-logo white-text">Captain Caption</a><img src="assets/images/Captain-Caption-sm.png" alt="Captain Caption" id="topCapLogo"/>
          <ul className="right hide-on-med-and-down">
            <li><a className="learnMore white-text">Learn More</a></li>
            {links}
          </ul>

          <ul id="nav-mobile" className="side-nav" style={{'backgroundColor':'#0081af'}}>
            <li><a className="learnMore white-text">Learn More</a></li>
            {links}
          </ul>
          <a href="#" data-activates="nav-mobile" className="button-collapse white-text"><i className="material-icons">menu</i></a>
        </div>
      </nav>
    )
  }
});

// Export the component back for use in other files
module.exports = Navbar;



