import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import NotFound from "../../images/NotFound.png";

export default function Home() {

  //API Variblies
    // let apiKey = `?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR329J3L4o5HCBdmnRtb10khNGNAOGU2pIbRWIo4PNniuCHsK-cMpvZhSfc`;
    // let trendingUrl = `https://api.themoviedb.org/3/trending/all/day`;
    // let popularUrl = `https://api.themoviedb.org/3/movie/popular`;
    // let topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated`;
    // let nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing`;
    // let upComingUrl = `https://api.themoviedb.org/3/movie/upcoming`;
    // let searchUrl = `https://api.themoviedb.org/3/search/movie`;


  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTv, setTrendingTv] = useState([]);
  const [trendingPeople, setTrendingPeople] = useState([]);
  

  async function getTrending(mediaType , callBack){
    let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR329J3L4o5HCBdmnRtb10khNGNAOGU2pIbRWIo4PNniuCHsK-cMpvZhSfc`);
    callBack(data.results.slice(0,10));
  }

  useEffect(()=>{
    getTrending("movie", setTrendingMovies);
    getTrending("tv", setTrendingTv);
    getTrending("person", setTrendingPeople);  
  }, [])

  return (
    <>
    <section id="home" className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="main-title">
              <h2>Trending <br/> Movies <br/> to Watch Now</h2>
              <p>Most Watched Movies By Days</p>
            </div>
          </div>
          {trendingMovies.map((movie, i)=> <div key={i} className='col-md-2'>
              <div className="movie">
                <Link to={`/singlemovie/${movie.id}`}>
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" className="w-100" />
                  <h3 className='text-white my-2 h6'>{movie.title}</h3>
                  <span className="rate">{Math.round(movie.vote_average)}</span>
                </Link>
              </div>
          </div>)}
        </div>
        <div className="row py-5">
          <div className="col-md-4">
            <div className="main-title">
              <h2>Trending <br/> TvShows <br/> to Watch Now</h2>
              <p>Most Watched Tv By Days</p>
            </div>
          </div>
          {trendingTv.map((tv, i)=> <div key={i} className='col-md-2'>
              <div className="movie">
                <img src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`} alt="" className="w-100" />
                <h3 className='text-white my-2 h6'>{tv.name}</h3>
              </div>
          </div>)}
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="main-title">
              <h2>Trending <br/> People <br/> to Watch Now</h2>
              <p>Most Watched People By Days</p>
            </div>
          </div>
          {trendingPeople.map((person, i)=> <div key={i} className='col-md-2'>
              <div className="movie">
                {person.profile_path === null? <img src={NotFound} alt="" className="img-fluid" /> : <img src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} alt="" className="w-100" />}
                {/* <img src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} alt="" className="w-100" /> */}
                <h3 className='text-white my-2 h6'>{person.name}</h3>
              </div>
          </div>)}
        </div>
      </div>
    </section>
    </>
  )
}
