import React , {useEffect , useState} from 'react';
import axios from 'axios';


export default function People() {
  const [trendingPeople, setTrendingPeople] = useState([]);

  let nums = new Array(13).fill(1).map((elem, index)=> index + 1);

  async function getTrending(pageNumber){
    let {data} = await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR329J3L4o5HCBdmnRtb10khNGNAOGU2pIbRWIo4PNniuCHsK-cMpvZhSfc&language=en-US&page=${pageNumber}`);
    setTrendingPeople(data.results);
    console.log(data);
  }

  useEffect(()=>{
    getTrending(1);  
  }, [])

  return (
    <>
      <section id="people" className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="main-title">
                <h2>Trending <br/> People <br/> to Watch Now</h2>
                <p>Most Watched People By Days</p>
              </div>
            </div>
            {trendingPeople.map((person, i)=> <div key={i} className='col-md-2'>
                <div className="movie">
                  {/* {person.profile_path === null?
                    <img src='' alt='' /> : <img src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} alt="" className="w-100" /> 
                  } */}
                  <img src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} alt="" className="w-100" />
                  <h3 className='text-white my-2 h6'>{person.name}</h3>
                </div>
            </div>)}
          </div>
          <nav aria-label="..." className='p-3 center'>
          <ul className="pagination pagination-sm">
            {nums.map((elem , i)=><li key={i} onClick={()=>{getTrending(elem)}} className="page-item pointer"><a className="page-link bg-transparent text-white">{elem}</a></li> )}
            
          </ul>
        </nav>
        </div>
      </section>
    </>
  )
}
