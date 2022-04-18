import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavBar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import TvShowsMain from './Components/TvShows/Main';
import TvShowSeasons from './Components/TvShows/Seasons';
import ContactMain from './Components/Contact/Main';
import TermsConditionMain from './Components/TermsConditions/Main';
import PrivacyMain from './Components/Privacy/Main';
import TvShowSeasonEpisodes from './Components/TvShows/Episodes';
import TvShowSeasonEpisodePlay from './Components/TvShows/Play';
import '@aws-amplify/ui-react/styles.css';
import { Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';

class App extends Component {

  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null
  }

  setAuthStatus = authenticated => {
    this.setState({ isAuthenticated: authenticated})
  }

  setUser = user => {
    this.setState({user : user})
  }

  async componentDidMount() {
    try {
      const session = await Auth.currentSession();
      this.setAuthStatus(true)
      console.log(session)
      const user = await Auth.currentAuthenticatedUser();
      this.setUser(user)
    } catch (error) {
      if (error !== 'No current user') {
        console.log(error)
      }
    }
    this.setState({isAuthenticating: false})
  }

  render(){

    return(
      !this.state.isAuthenticating &&
      <div className='App'>
        <Router>
        <NavBar/>
        {/* Routing of pages */}
        <Routes>
          {/* Home page Routing */}
          <Route path="/" element={<Home/>}/>

          {/* Links to contact, terms and conditions, privacy, about */}
          <Route path="/about" element={<About/>}/>
          <Route path='/contact' element={<ContactMain/>}/>
          <Route path='/tc' element={<TermsConditionMain/>}/>
          <Route path='/privacy' element={<PrivacyMain/>}/>

          {/* TvShows Routing */}
          <Route path="/tvshows" element={<TvShowsMain/>}/>
          <Route path="/tvshow/:id/seasons" element={<TvShowSeasons/>}/>
          <Route path="/tvshow/:id/season/:seasonId/episodes" element={<TvShowSeasonEpisodes/>}/>
          <Route path="/tvshow/:id/season/:seasonId/episode/:episodeId/play" element={<TvShowSeasonEpisodePlay/>}/>

        </Routes>
        <Footer/>
      </Router>
      </div>
    );
  }
}

export default withAuthenticator(App);
