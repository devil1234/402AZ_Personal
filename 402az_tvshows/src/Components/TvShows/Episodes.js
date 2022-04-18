import React, {Component, useState, useEffect} from 'react';
import { Container, Grid, Card, Divider, Image, Popup, Rating, Header, Modal, Button} from 'semantic-ui-react'
import { useParams, Link} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import Reducer from "./Reducer"

//API GET AND POPULATE THE HTML BASED ON RESPONSE
function TvShowSeasonEpisodesPage () {
  //SET THE id, seasonNr, seasonId based on path.
  let { id, seasonNr, seasonId } = useParams();

  //MODAL REDUCER
  const [state, dispatch] = React.useReducer(Reducer, {
    open: false,
    dimmer: undefined,
  })
  const { open, dimmer } = state
  
  //API STRINGS
  const baseUrlTvShowDetails = `https://q2f77bq709.execute-api.us-east-1.amazonaws.com/tvshow/${id}`
  const baseUrlSeason = `https://q2f77bq709.execute-api.us-east-1.amazonaws.com/tvshow/${id}/season/${seasonNr}`
  const baseUrlSeasonEpisodes = `https://q2f77bq709.execute-api.us-east-1.amazonaws.com/tvshow/${id}/season/${seasonId}/episodes`
  const baseUrlAddDelete = "https://q2f77bq709.execute-api.us-east-1.amazonaws.com/tvshow/season/episode"
  
  //API STATES
  const [tvShowDetails, setTvShowDetails] = useState({});
  const [, setTvShowSeason] = useState([]);
  const [tvShowSeasonEpisodes, setTvShowSeasonEpisodes] = useState([]);

  //JSON FORMAT FOR ADD
  const [tvShowSeasonEpisode, setTvShowSeasonEpisode] = useState({
    episodeId: `${uuidv4()}`,
    seasonId: `${seasonId}`,
    imageUrl: "",
    episodeLenght: "",
    episodeName: "",
    seasonNr: "",
    tvShowId: `${id}`,
    episodeReleaseDate: "",
    episodeUserRating: "",
    episodeIdYoutube: "",
    episodeNr: ""
  })

  //JSON FORMAT FOR DELETE
  const [tvShowSeasonDel] = useState({
    episodeId: "",
    seasonId: "",
    imageUrl: "",
    episodeLenght: "",
    episodeName: "",
    seasonNr: "",
    tvShowId: "",
    episodeReleaseDate: "",
    episodeUserRating: "",
    episodeIdYoutube: "",
    episodeNr: ""
  })

  //REQUEST OPTIONS FOR PUT
  const requestOptions = {
    method : 'PUT',
    headers: {'Content-Type': 'application/json'},
    body : JSON.stringify(tvShowSeasonEpisode)
  }
  
  //REQUEST OPTIONS FOR DELETE
  const deleterequestOptions = {
    method: 'DELETE',
    headers:{ 'Content-Type': 'application/json'},
    body: JSON.stringify(tvShowSeasonDel)
  }

  //FUNCTION TO ADD A EPISODE ON DB
  const putTvShowSeasonEpisode = () => {
    try{
        fetch(baseUrlAddDelete,requestOptions).then((res) => res.json()).then((data) => console.log(data))
        //window.location.reload(false);
    }catch(err){
        console.log(err)
    }
  }

  //FUNCTION TO DELETE A EPISODE ON DB WITH PASSING THE episodeId
  const deleteTvshowSeasonEpisode = (episodeId) => {
    try{
         fetch(`${baseUrlAddDelete}/${episodeId}`,deleterequestOptions)
         .then((res) => res.json())
         .then((data) => console.log(data));
         window.location.reload(false);
     } catch(err){
         console.log(err)
     }
  }

  //USING THE useEffect function to fetch the api and set the list in memory
  useEffect(() => {
    fetch(baseUrlTvShowDetails).then((res) => res.json()).then((res) => { setTvShowDetails(res.Item)});
    fetch(baseUrlSeason).then((res) => res.json()).then((res) => { setTvShowSeason(res.Items)});
    fetch(baseUrlSeasonEpisodes).then((res) => res.json()).then((res) => { setTvShowSeasonEpisodes(res.Items)}); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //RETURN THE HTML CODE FOR EPISODES AND SEASON DESCRIPTION
    return(
      <Container fluid className="TvShowSeasonEpisodes">
        
        <Grid columns={3} style={{ margin: 10 }}>
        <Grid.Row stretched>
          <Grid.Column width={4}>
            <Image centered src={tvShowDetails.imageUrl} alt="Tv Show Season Episodes Poster" size="medium"/>
          </Grid.Column>
          
          <Grid.Column width={9}>
            <Container>
              <Header size='huge'textAlign='left' color="blue">Tv Show Name</Header>
              <Header size='large'textAlign='left'>{tvShowDetails.name}</Header>
              <Header as="h2" color="blue">Tv Show Rating</Header>
                  
             <Rating icon='star' rating={tvShowDetails.userRating} disabled maxRating={5} />
            <Header></Header>
            </Container>
          </Grid.Column>

          <Grid.Column width={3}>
            <Container>
            <Button color='red' href={`/tvshow/${id}/seasons`} circular floated='right'>Return Back</Button>
            <Button color='green' circular floated='right' onClick={() => dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring' })}  >Add Episode</Button>
            <Modal
              dimmer={dimmer}
              open={open}
              onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
            >
              <Modal.Header>Add Tv Show Season</Modal.Header>
              <Modal.Content>
               <input className="input m-1" type="text" placeholder="Tv Show Season Episode Image URL" 
                value = {tvShowSeasonEpisode.imageUrl} onChange={e => setTvShowSeasonEpisode({...tvShowSeasonEpisode, imageUrl:e.target.value})} />
                <input className="input m-1" type="text" placeholder="Tv Show Episode Lenght" 
                value = {tvShowSeasonEpisode.episodeLenght} onChange={e => setTvShowSeasonEpisode({...tvShowSeasonEpisode, episodeLenght:e.target.value})} />
                <input className="input m-1" type="text" placeholder="Tv Show Season Episode Name" 
                value = {tvShowSeasonEpisode.episodeName} onChange={e => setTvShowSeasonEpisode({...tvShowSeasonEpisode, episodeName:e.target.value})} />
                <input className="input m-1" type="text" placeholder="Tv Show Season Nr" 
                value = {tvShowSeasonEpisode.seasonNr} onChange={e => setTvShowSeasonEpisode({...tvShowSeasonEpisode, seasonNr:e.target.value})} />
                <input className="input m-1" type="text" placeholder="Tv Show Season Episode Release Date"
                value = {tvShowSeasonEpisode.episodeReleaseDate} onChange={e => setTvShowSeasonEpisode({...tvShowSeasonEpisode, episodeReleaseDate:e.target.value})} />
                <input className="input m-1" type="text" placeholder="Tv Show Season Episode User Rating" 
                value = {tvShowSeasonEpisode.episodeUserRating} onChange={e => setTvShowSeasonEpisode({...tvShowSeasonEpisode, episodeUserRating:e.target.value})} />
                <input className="input m-1" type="text" placeholder="Tv Show Season Episode YouTube Id" 
                value = {tvShowSeasonEpisode.episodeIdYoutube} onChange={e => setTvShowSeasonEpisode({...tvShowSeasonEpisode, episodeIdYoutube:e.target.value})} />
                <input className="input m-1" type="text" placeholder="Tv Show Season Episode Number" 
                value = {tvShowSeasonEpisode.episodeNr} onChange={e => setTvShowSeasonEpisode({...tvShowSeasonEpisode, episodeNr:e.target.value})} />
                </Modal.Content>
              <Modal.Actions>
                <Button negative onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
                  Cancel
                </Button>
                <Button positive onClick={putTvShowSeasonEpisode}>Add Episode</Button>
              </Modal.Actions>
            </Modal>
            </Container>
          </Grid.Column>
          </Grid.Row>
      </Grid>
      <Header as='h2' style={{ margin: 10 }}>
          Episode/s
        </Header>
      <Divider horizontal className="SeriesDivider" hidden/>
        <Grid>
        </Grid>
          <Card.Group className='TvshowSeason-cards' style={{ margin: 2 }}>
      {
        tvShowSeasonEpisodes && tvShowSeasonEpisodes.length > 0 ?
        tvShowSeasonEpisodes.map(tvShowSeasonEpisode =>
            <Popup key={tvShowSeasonEpisode.episodeId} 
            trigger=
            {
              <Card className="TvShowSeasonsCard" key={tvShowSeasonEpisode.episodeId} style={{ margin: 10 }}>
            <Link key={tvShowSeasonEpisode.episodeId}
                    to={{
                      pathname: `/tvshow/${tvShowSeasonEpisode.tvShowId}/season/${tvShowSeasonEpisode.episodeId}/episode/${tvShowSeasonEpisode.episodeId}/play`,
                      state: { tvShowSeasonEpisodes: tvShowSeasonEpisode }
                    }}>
                      <Image src={tvShowSeasonEpisode.imageUrl} alt="Tv Show Episode Poster" />
                </Link>
                <Card.Content>
                <Card.Header textAlign="center">
                  <a className='TvShowsLink' key={tvShowSeasonEpisode.episodeId} href={`/tvshow/${tvShowSeasonEpisode.tvShowId}/season/${tvShowSeasonEpisode.episodeId}/episode/${tvShowSeasonEpisode.episodeId}/play`}>{tvShowSeasonEpisode.episodeName}</a>
                  </Card.Header>
                  <Card.Description textAlign="center">
                    <p key={tvShowSeasonEpisode.episodeId}>Episode {tvShowSeasonEpisode.episodeNr}</p>
                  </Card.Description>
                </Card.Content>
                <Button size="mini" color='red' onClick={() => deleteTvshowSeasonEpisode(tvShowSeasonEpisode.episodeId)}>Delete</Button>
              </Card>
            }>
            <Popup.Header>User Rating</Popup.Header>
            <Popup.Content>
              <Rating icon='star' rating={tvShowSeasonEpisode.episodeUserRating} maxRating={5} />
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

//RENDER CLASS OF TvShowSeasonEpisodesPage 
export default class TvShowSeasonEpisodes extends Component {
  render(){
    return(
          <TvShowSeasonEpisodesPage/>
        );
      }
  }