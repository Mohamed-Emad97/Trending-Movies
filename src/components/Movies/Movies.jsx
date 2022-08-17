import React , {useState , useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function Movies() {
  const [trendingMovies, setTrendingMovies] = useState([]);


  let nums = new Array(13).fill(1).map((elem, index)=> index + 1);
  // console.log(nums);

  async function getTrending(pageNum){
    let {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR329J3L4o5HCBdmnRtb10khNGNAOGU2pIbRWIo4PNniuCHsK-cMpvZhSfc&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNum}`);
    setTrendingMovies(data.results);
    // console.log(data);
  }

  useEffect(()=>{
    getTrending(1); 
  }, [])


  

  return (
    <>
    {trendingMovies? <section id="movies" className="py-5">
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
                  <span className="rate">{movie.vote_average}</span>
                </Link>
              </div>
          </div>)}
        </div>
      </div>
    </section> : <div className='vh-100 center'>
          <i className='fas fa-spinner fa-spin text-white fs-2 fw-bold'></i>
        </div> }
    
        <nav aria-label="..." className='p-3 center'>
          <ul className="pagination pagination-sm">
            {nums.map((elem , i)=><li key={i} onClick={()=>{getTrending(elem)}} className="page-item pointer"><a className="page-link bg-transparent text-white">{elem}</a></li> )}
            
          </ul>
        </nav>
    </>
  )
}
