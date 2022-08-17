import React , {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import NotFound from "../../images/NotFound.png";


export default function FindMovie() {
  const [searchData, setSearchData] = useState([]);
  const [searchTxt , setSearchTxt] = useState("");


  function getSearchTxt(e) {
    setSearchTxt(e.target.value);
  }

 async function search(){
   if(searchTxt == "") {
     console.log("Enter A Search Movie");
   } else {
     let apiKey = `?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR329J3L4o5HCBdmnRtb10khNGNAOGU2pIbRWIo4PNniuCHsK-cMpvZhSfc`;
     let baseUrl = `https://api.themoviedb.org/3/search/movie${apiKey}&query=${searchTxt}`;
     let {data} = await axios.get(baseUrl);
     setSearchData(data.results);
    //  console.log(data.results);
   }
 }

 useEffect(()=>{
  search();
 }, [searchTxt])

  console.log(searchData);
  return (
    <>
      <section id="search" className="py-5">
        <div className="container center flex-column">
          <div className="search w-100">
            <input type="text" onChange={getSearchTxt} name="search" id="search" className='w-100 p-2' placeholder='Search'/>
          </div>
          <p className='text-white align-self-start mt-2 txt'>Finds Yours Favorite Movies .....</p>
        </div>
        <div className="container">
          <div className="row">
          {searchData? searchData.map((movie, i)=> <div key={i} className='col-md-2'>
              <div className="movie position-relative">
                <Link to={`/singlemovie/${movie.id}`}>
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" className="w-100" />
                  <h3 className='text-white my-2 h6'>{movie.title}</h3>
                  <span className="rate">{movie.vote_average}</span>
                </Link>
              </div>
          </div>) : "" }
          </div>
        </div>
      </section>
    </>
  )
}
