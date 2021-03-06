import React, { Component } from 'react';
import './Navbar.css';
import {NavLink, Link} from 'react-router-dom';
import {updateLoggin} from '../../ducks/reducer';
import {connect} from 'react-redux';

class Navbar extends Component {
  constructor(){
    super();
      this.state = {
        toggleNav: false
    }
  }

toggle = () => {
    this.setState((prevState) => {
        return {
            toggleNav: !prevState.toggleNav
        }
    })
}




  render(){
    console.log('logged in?',this.props.loggedIn)
  return (
    
    <div className="navbar-container">
      <div className="navbar">
        <div>
          <p onClick={this.toggle}><Link to="/" className="logo-title">
          <i class="fa fa-globe" aria-hidden="true"></i>
          </Link></p>
        </div>
        <div className="navbar-list">
          <div><NavLink exact to="/mens" className="nav-links">Men</NavLink></div>
          <div><NavLink exact to="/womens" className="nav-links">Women</NavLink></div>
          <div><NavLink exact to="/about" className="nav-links">About</NavLink></div>
            { this.props.user ?
              <div><Link to="/profile" className="profile-nav">Profile</Link></div>
              :
              <div><NavLink exact to="/profile"  className="nav-links">Login</NavLink></div>
            }
          <div><NavLink exact to="/cart" className="nav-links">Shopping Cart</NavLink></div>
        </div>
        
      </div>
      <div className="clear-fix"></div>
    </div>
  )
}
}

function mapStateToProps (state) {
  const {user, loggedIn} = state;
  return {
    user,
    loggedIn
  };
}


export default connect(mapStateToProps, {updateLoggin})(Navbar);
