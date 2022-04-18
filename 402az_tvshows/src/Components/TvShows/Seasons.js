import React, {Component, useState, useEffect} from 'react';
import { Container, Grid, Card, Divider, Image, Popup, Rating, Header, Modal, Button} from 'semantic-ui-react'
import { useParams, Link} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import Reducer from "./Reducer"


function TvShowSeasonPage () {

  //MODAL REDUCER
  const [state, dispatch] = React.useReducer(Reducer, {
    open: false,
    dimmer: undefined,
  })
  //SET THE MODAL STATE
  const { open, dimmer } = state
   //SET THE id based on path.
  let { id } = useParams();
  
  //API STATES
  const [tvShowDetails, setTvShowDetails] = useState({});
  const [tvShowSeasons, setTvShowSeasons] = useState([]);
  
  //API STRINGS
  const baseUrlAddDelete = "https://q2f77bq709.execute-api.us-east-1.amazonaws.com/tvshow/season"
  const baseUrlTvShow = `https://q2f77bq709.execute-api.us-east-1.amazonaws.com/tvshow/${id}`
  const baseUrl = `https://q2f77bq709.execute-api.us-east-1.amazonaws.com/tvshow/${id}/seasons`
  
   //USING THE useEffect function to fetch the api and set the lists in memory
  useEffect(() => {   
    fetch(baseUrlTvShow).then((res) => res.json()).then((res) => { setTvShowDetails(res.Item)}); 
    fetch(baseUrl).then((res1) => res1.json()).then((res1) => { setTvShowSeasons(res1.Items)}); 
  }, [baseUrl, baseUrlTvShow, id])

  //JSON FORMAT FOR ADD
  const [tvShowSeason, setTvShowSeason] = useState({
    seasonId: `${uuidv4()}`,
    seasonRelaseDate: "",
    imageUrl: "",
    userRating: "",
    seasonUserRating: "",
    tvShowId: `${id}`,
    seasonNr: "",
    totalEpisodes: ""
  })

  //JSON FORMAT FOR DELETE
  const [tvShowSeasonDel] = useState({
    seasonId: "",
    seasonRelaseDate: "",
    imageUrl: "",
    userRating: "",
    seasonUserRating: "",
    tvShowId: "",
    seasonNr: "",
    totalEpisodes: ""
  })

  const requestOptions = {
    method : 'PUT',
    headers: {'Content-Type': 'application/json'},
    body : JSON.stringify(tvShowSeason)
  }
  
  const putTvShowSeason = () => {
    try{
        fetch(baseUrlAddDelete,requestOptions).then((res) => res.json()).then((data) => console.log(data))
        window.location.reload(false);
    }catch(err){
        console.log(err)
    }
}
  const deleterequestOptions = {
    method: 'DELETE',
    headers:{ 'Content-Type': 'application/json'},
    body: JSON.stringify(tvShowSeasonDel)
  }

  const deleteTvshowSeason = (seasonId) => {
    try{
         fetch(`${baseUrlAddDelete}/${seasonId}`,deleterequestOptions)
         .then((res) => res.json())
         .then((data) => console.log(data));
         window.location.reload(false);
     } catch(err){
         console.log(err)
     }
  }
    return(
      <Container fluid className="TvShowSeasons">
        
        <Grid columns={3} style={{ margin: 10 }}>
        <Grid.Row stretched>
          <Grid.Column width={4}>
            <Image centered fluid src={tvShowDetails.imageUrl} alt="Tv Show Season Poster"/>
          </Grid.Column>
          
          <Grid.Column width={9}>
            <Container>
              <Header size='huge'textAlign='left' color="blue">Name</Header>
              <Header size='large'textAlign='left'>{tvShowDetails.name}</Header>
              <Header size='huge'textAlign='left' color="blue">Release year</Header>
              <Header size='large' textAlign='left'>{tvShowDetails.releaseYear}</Header>
              <Header size='huge'textAlign='left' color="blue">Episodes length</Header>
              <Header size='large' textAlign='left'>{tvShowDetails.epLength}</Header>
              <Container>
                <Header as="h2" color="blue">Rating</Header>
                <Rating icon='star' rating={tvShowDetails.userRating} disabled maxRating={5} />
                <Header></Header>
              </Container>
              <Container></Container>
              <Container textAlign='left'>
                <h4>{tvShowDetails.tvShowDescription}</h4>
              </Container>
            </Container>
          </Grid.Column>

          <Grid.Column width={3}>
            <Container>
            <Button color='red' href="/tvshows" circular floated='right'>Return Back</Button>
            <Button color='green' circular floated='right' onClick={() => dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring' })}  >Add Season</Button>
            <Modal
              dimmer={dimmer}
              open={open}
              onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
            >
              <Modal.Header>Add Tv Show Season</Modal.Header>
              <Modal.Content>
                <input className="input m-1" type="text" placeholder="Tv Show Season Release Date" 
                value = {tvShowSeason.seasonReleaseDate} onChange={e => setTvShowSeason({...tvShowSeason, seasonReleaseDate:e.target.value})} />
                <input className="input m-1" type="text" placeholder="Tv Show Season Image URL" 
                value = {tvShowSeason.imageUrl} onChange={e => setTvShowSeason({...tvShowSeason, imageUrl:e.target.value})} />
                <input className="input m-1" type="text" placeholder="Tv Show User Rating" 
                value = {tvShowSeason.userRating} onChange={e => setTvShowSeason({...tvShowSeason, userRating:e.target.value})} />
                <input className="input m-1" type="text" placeholder="Tv Show Season User Rating" 
                value = {tvShowSeason.seasonUserRating} onChange={e => setTvShowSeason({...tvShowSeason, seasonUserRating:e.target.value})} />
                <input className="input m-1" type="text" placeholder="Tv Show Season Number" 
                value = {tvShowSeason.seasonNr} onChange={e => setTvShowSeason({...tvShowSeason, seasonNr:e.target.value})} />
                <input className="input m-1" type="text" placeholder="Tv Show Total Episodes" 
                value = {tvShowSeason.totalEpisodes} onChange={e => setTvShowSeason({...tvShowSeason, totalEpisodes:e.target.value})} />

                </Modal.Content>
              <Modal.Actions>
                <Button negative onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
                  Cancel
                </Button>
                <Button positive onClick={putTvShowSeason}>Add Season</Button>
              </Modal.Actions>
            </Modal>
            </Container>
          </Grid.Column>
          </Grid.Row>
      </Grid>
      <Header as='h2' style={{ margin: 10 }}>
          Series
        </Header>
      <Divider horizontal className="SeriesDivider" hidden/>
        <Grid>
        </Grid>
          <Card.Group className='TvshowSeason-cards' style={{ margin: 2 }}>
      {
        tvShowSeasons && tvShowSeasons.length > 0 ?
          tvShowSeasons.map(tvShowSeason =>
            <Popup key={tvShowSeason.seasonId} 
            trigger=
            {
              <Card className="TvShowSeasonsCard" key={tvShowSeason.seasonId} style={{ margin: 10 }}>
            <Link key={tvShowSeason.seasonId}
                    to={{
                      pathname: `/tvshow/${tvShowSeason.tvShowId}/season/${tvShowSeason.seasonId}/episodes`,
                      state: { tvShowSeasons: tvShowSeason }
                    }}>
                      <Image src={tvShowSeason.imageUrl} alt="Tv Show Poster" />
                </Link>
                <Card.Content>
                <Card.Header textAlign="center">
                  <a className='TvShowsLink' key={tvShowSeason.seasonId} href={`/tvshow/${tvShowSeason.tvShowId}/season/${tvShowSeason.seasonId}/episodes`}>Season {tvShowSeason.seasonNr}</a>
                  </Card.Header>
                  <Card.Description textAlign="center">
                    <p key={tvShowSeason.seasonId}>{tvShowSeason.totalEpisodes} Episode/s</p>
                  </Card.Description>
                </Card.Content>
                <Button size="mini" color='red' onClick={() => deleteTvshowSeason(tvShowSeason.seasonId)}>Delete</Button>
              </Card>
            }>
            <Popup.Header>User Rating</Popup.Header>
            <Popup.Content>
              <Rating icon='star' rating={tvShowSeason.userRating} maxRating={5} />
            </Popup.Content>
          </Popup>
        ) : <h1> Tv Show Seasons are loading...</h1>
        }
        </Card.Group>
          <Divider horizontal className="SeriesDivider">
        </Divider>
      </Container>
    )
}

export default class TvShowsSeason extends Component {
  render(){
    return(
          <TvShowSeasonPage/>
        );
      }
  }