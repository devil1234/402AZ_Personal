import React, {Fragment, useEffect, useState} from 'react';
import { Container, Popup, Card, Rating, Divider, Grid, Image, Header, Button, Modal} from 'semantic-ui-react'
import { useParams, Link} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import Reducer from "./Reducer"

function TvShowCards() {

  //set id as useParams
  const { id } = useParams();

  //SET STATE for tvshows
  const [tvShows, setTvShows] = useState();

  //SET API STRINGS
  const baseUrl = "https://q2f77bq709.execute-api.us-east-1.amazonaws.com/tvshows"
  const baseUrlDelete = "https://q2f77bq709.execute-api.us-east-1.amazonaws.com/tvshow"

  //FUNCTION TO GET TVSHOWS
  const getTvShows = () => {
    fetch(baseUrl)
    .then((res) => res.json())
    .then((res) => { setTvShows(res.Items)});
  }

  //JSON FORMAT FOR DELETE
  const [tvshow] = useState({
    id: "",
    imageUrl: "",
    userRating: "",
    totalSeasons: "",
    releaseYear: "",
    epLength: "",
    tvShowDescription: "",
    genre: "",
    name: ""
  })

  //REQUEST OPTIONS FOR DELETE
  const deleterequestOptions = {
    method: 'DELETE',
    headers:{ 'Content-Type': 'application/json'},
    body: JSON.stringify(tvshow)
  }

  //FUNCTION TO DELETE THE TV SHOW
  const deleteTvshow = (id) => {
    try{
         fetch(`${baseUrlDelete}/${id}`,deleterequestOptions)
         .then((res) => res.json())
         .then((data) => console.log(data));
         window.location.reload(false);
     } catch(err){
         console.log(err)
     }
  }

  //GET THE TV SHOWS ON PAGE LOAD
  useEffect(() => {
      getTvShows()
  }, [id])

  //RETURN THE HTM FORMAT USING THE API CALLS
    return(
      <Fragment>
      {
        tvShows && tvShows.length > 0
        ? tvShows.map(tvShow =>  
          <Popup key={tvShow.id}
          trigger={
            <Card className="TvShowCard">
            <Link key={tvShow.id}
                    to={{
                      pathname: `/tvshow/${tvShow.id}/seasons`,
                      state: { tvShows: tvShow }
                    }}>
                      <Image src={tvShow.imageUrl} alt="Tv Show Poster" />
            </Link>
              <Card.Content>
                <Card.Header textAlign="center">
                  <Link key={tvShow.id}
                    to={{
                      pathname: `/tvshow/${tvShow.id}/seasons`,
                      state: { tvShows: tvShow }
                    }}
                  >{tvShow.name}
                  </Link>

                </Card.Header>
                <Card.Description textAlign="center">
                  <p key={tvShow.id}>{tvShow.totalSeasons} Season/s</p>
                </Card.Description>
              </Card.Content>
              <Button size="mini" color='red' onClick={() => deleteTvshow(tvShow.id)}>Delete</Button>
            </Card>
          }
        >
          <Popup.Header>User Rating</Popup.Header>
          <Popup.Content>
            <Rating icon='star' defaultRating={tvShow.userRating} maxRating={5} />
          </Popup.Content>
        </Popup>
      ) : <h1> Tv Shows are loading.</h1>
      }
      </Fragment>
    )
}

export default function TvShowsMain() {

  //MODAL REDUCER
  const [state, dispatch] = React.useReducer(Reducer, {
    open: false,
    dimmer: undefined,
  })

  //JSON FORMAT TO ADD A TVSHOW with a random id
  const [tvshow, setTvShow] = useState({
    imageUrl: "",
    userRating: "",
    totalSeasons: "",
    releaseYear: "",
    epLength: "",
    tvShowDescription: "",
    id: uuidv4(),
    genre: "",
    name: ""
  })

  //BASEURL FOR API CALLS
  const baseUrl = "https://q2f77bq709.execute-api.us-east-1.amazonaws.com/tvshow"

  //REQUEST OPTIONS FOR ADDING A TVSHOW
  const requestOptions = {
    method : 'PUT',
    headers: {'Content-Type': 'application/json'},
    body : JSON.stringify(tvshow)
  }

  //FUNCTION TO ADD TVSHOW
  const putTvShow = () => {
    try{
        fetch(baseUrl,requestOptions).then((res) => res.json()).then((data) => console.log(data))
        window.location.reload(false);
    }catch(err){
        console.log(err)
    }
  }

  // MODAL STATE SET
  const { open, dimmer } = state

        //RETURN THE HTML FOR TVSHOWS
        return(
          <Container fluid style={{margin: 10}} className="TvShowMain">
            <Divider horizontal className="SeriesDivider">
              <Header as='h1'>
                Tv Shows
              </Header>
            </Divider>
            {/*MODAL SETUP*/}
            <Button color='green' circular floated='right' onClick={() => dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring' })}  >Add Tv Show</Button>
            <Modal
              dimmer={dimmer}
              open={open}
              onClose={() => this.props.history.push('/')}
            > 
              <Modal.Header>Add Tv Show</Modal.Header>
              <Modal.Content>
                <input className="input m-1" type="text" placeholder="Tv Show Img Url" value = {tvshow.imageUrl} onChange={e => setTvShow({...tvshow, imageUrl:e.target.value})} />
                <input className="input m-1" type="text" placeholder="Tv Show User Rating" value = {tvshow.userRating} onChange={e => setTvShow({...tvshow, userRating:e.target.value})} />
                <input className="input m-1" type="text" placeholder="Tv Show Total Seasons" value = {tvshow.totalSeasons} onChange={e => setTvShow({...tvshow, totalSeasons:e.target.value})} />
                <input className="input m-1" type="text" placeholder="Tv Show Release Year" value = {tvshow.releaseYear} onChange={e => setTvShow({...tvshow, releaseYear:e.target.value})} />
                <input className="input m-1" type="text" placeholder="Tv Show Episode Lenght" value = {tvshow.epLength} onChange={e => setTvShow({...tvshow, epLength:e.target.value})} />
                <input className="input m-1" type="text" placeholder="Tv Show Description" value = {tvshow.tvShowDescription} onChange={e => setTvShow({...tvshow, tvShowDescription:e.target.value})} />
                <input className="input m-1" type="text" placeholder="Tv Show genre" value = {tvshow.genre} onChange={e => setTvShow({...tvshow, genre:e.target.value})} />
                <input className="input m-1" type="text" placeholder="Tv Show Name" value = {tvshow.name} onChange={e => setTvShow({...tvshow, name:e.target.value})} />
              </Modal.Content>
              <Modal.Actions>
                <Button negative onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
                  Cancel
                </Button>
                <Button positive onClick={putTvShow}>Add Tv Show</Button>
              </Modal.Actions>
            </Modal>
            {/*MODAL SETUP*/}

            <Header as='h1' textAlign="center">
                The best tv shows you can see !
              </Header>
            <Grid>
            </Grid>
              <Card.Group className='Tvshows-cards' style={{ margin: 2 }}>
                <TvShowCards/>
              </Card.Group>
          </Container>
        );
    }