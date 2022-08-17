import React , {useState , useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


export default function SingleMovie() {

  let params = useParams();
  
  let apiKey = `?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR329J3L4o5HCBdmnRtb10khNGNAOGU2pIbRWIo4PNniuCHsK-cMpvZhSfc`;
  let movieId = `${params.id}`;
  let baseUrl = `https://api.themoviedb.org/3/movie/${movieId}${apiKey}&language=en-US`;

  const [movieDetails , setMovieDetails] = useState({});
  const [genras, setGenras] = useState([]);

  async function getMovieDetails(){
    let {data} = await axios.get(`${baseUrl}`);
    setMovieDetails(data);
    setGenras(data.genres);
    console.log(data.genres);
  }

  useEffect(()=>{
    getMovieDetails();
  },[])

  return (
    <>
      {movieDetails? <section id="single-movie" className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="img">
                <img src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt="" className="w-100" />
              </div>
            </div>
            <div className="col-md-8">
              <div className="movie-info">
                <h2>{movieDetails.title}</h2>
                {/* <p className='py-3'>{movieDetails.overview}</p> */}
                <div className="category">
                  {genras.map((genra, i)=><>
                      <span key={i} className='btn-main p-2 m-2 mb-4'>{genra.name}</span>
                  </>)}
                </div>
                <p className="vote pt-2">{`Vote: ${movieDetails.vote_average}`}</p>
                <p className="vote-count">{`Vote Count: ${movieDetails.vote_count}`}</p>
                <p className="popularity">{`Popularity: ${movieDetails.popularity}`}</p>
                <p className="release-date pb-2">{`Release Date: ${movieDetails.release_date}`}</p>
                <p className="description">
                    {movieDetails.overview}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> : <div className='vh-100 center'>
          <i className='fas fa-spinner fa-spin text-white fs-2 fw-bold'></i>
        </div>}
    </>
  )
}
