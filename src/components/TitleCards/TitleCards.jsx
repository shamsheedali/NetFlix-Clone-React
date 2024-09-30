import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import cards_date from "../../assets/cards/Cards_data";
import { Link } from "react-router-dom";

const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([])
  const cardsRef = useRef();


  //TMDB API
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjZhN2FkNDU5YTg3M2EyODhmZGZkNmY0YzRhMmM4NCIsIm5iZiI6MTcyNzE3Mjg3OC4yNDc5OTUsInN1YiI6IjY2ZjI4ZTgyMDMxNWI5MWY0NjNiNjA3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EuoGh1DxyVPrpT7cQXe0FmQpGViMGhDPbC-wxqXO5g8'
    }
  };

  
  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);


  return (
    <div className="title-cards">
      <h2>{title ? title : 'Popular on Netflix' }</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return ( 
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
