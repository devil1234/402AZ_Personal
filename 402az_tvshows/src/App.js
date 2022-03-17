import './App.css';
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavBar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Components/Home';
import About from './Components/About';

class App extends Component{
  render(){
    return(
      <div>
        <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
        </Routes>
      <Footer/>
      </Router>
      </div>
    );
  }
}

export default App;
