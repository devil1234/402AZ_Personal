import React, {useState} from 'react';
import { Embed } from 'semantic-ui-react'
import { useParams} from "react-router-dom";

function TvShowSeasonEpisodePlay() {

  //Set the episodeId using the useParams function
  let { episodeId } = useParams();


  //set the baseurl for api get
  const baseUrlSeasonEpisode = `https://q2f77bq709.execute-api.us-east-1.amazonaws.com/tvshow/season/episode/${episodeId}`
  //Set the array using the useState function
  const [tvShowSeasonEpisode, setTvShowSeasonEpisode] = useState([]);
  //fetch the api using the baseurl string and set the array based on response
  fetch(baseUrlSeasonEpisode).then((res) => res.json()).then((res) => { setTvShowSeasonEpisode(res.Item)});

return (
  //EMBEDED CODE FOR YOUTUBE PLAYER USING THE episodeIdYoutube FROM API CALL
  <Embed
    active
    autoplay
    id={tvShowSeasonEpisode.episodeIdYoutube}
    placeholder={tvShowSeasonEpisode.imageUrl}
    source='youtube'
  />
  )
}

export default TvShowSeasonEpisodePlay