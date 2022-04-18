import React, {Component} from "react";
import logo from '../../Assets/logo.png'
import { Divider } from "semantic-ui-react";
import { Auth } from "aws-amplify";

//RENDER THE NAVBAR AS HTML CODE
export default class NavBar extends Component{
  getUser(){
    Auth.currentAuthenticatedUser().then(res => this.setState({user: res}))
  }

  async signOut() {
    try{
      await Auth.signOut()
      window.location.replace('/');
    } catch(ex) {
      console.log(ex)
    }
  }

  componentDidMount() {
    this.getUser();
  }
    render(){
        return(
          <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <img src={logo} width="160" height="800" alt="Logo"/>
            </a>
        
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              
              <a href="/" className="navbar-item">
              
                Home
              </a>
              <a className="navbar-item" href="/tvshows">
                Tv Shows
              </a>
              <a className="navbar-item" href="/about">
                About Us
              </a>
              <a className="navbar-item" href="/Contact">
                Contact Us
              </a>
              <a className="navbar-item" href="/tc">
                Terms and Conditions
              </a>
              <a className="navbar-item" href="/privacy">
                Privacy
              </a>
            </div>   
        
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
                  <a className="button is-primary" onClick={() => this.signOut()}>
                    <strong>Sign out</strong>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <Divider style={{margin: 10}} />
        </nav>
        )
    }
}

document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

});
