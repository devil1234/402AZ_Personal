import React, {Component} from "react";
import logo from "../../Assets/logo.png"


export default class Footer extends Component{
    render(){
        return(
            <footer className="footer">
              <div className="columns">
                <div className="column has-text-centered">
                <br/> 
                  <a href="/privacy" >
                    Privacy Policy  
                    </a>
                  <br/> <br/>

                  <a href="/tos" >
                    Terms of Service
                    </a>

                </div>
                <div className="column has-text-centered">
                   
                  <h1><strong>Social Media</strong></h1>
                  <a href="https://www.instagram.com/">
                     Instagram
                      </a><br/>
                  <div>
                    <a href="https://www.facebook.com/">
                      Facebook
                      </a><br/>
                  </div>
                  
                  <a href="https://www.twitter.com/">
                    Twitter
                    </a>
                 </div>

                 <div className="column has-text-centered">
                 <a href="/"><img src={logo} width="160" height="800" alt="Logo"/></a>
                 <div>
                 &copy; <em id="date"></em>WebVideoUK
                 </div>
                  </div>
               
              </div>
          </footer>
        );
    }
    
}