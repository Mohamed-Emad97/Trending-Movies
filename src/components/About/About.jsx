import React from 'react';
import pic1 from "../../images/31vliI2mopLlh5kUoWpJZ19cF8y.jpg";
import pic2 from "../../images/fBIzAD9ZDdNVNdsNPdsMUfrM3fI.jpg";
import pic3 from "../../images/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg";
import pic4 from "../../images/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg";

export default function About() {
  return (
    <>
      <section id="about" className="py-5 mb-5">
        <div className="container">
          <div className="mainHeading text-white text-center p-5">
            <h3 className='h2'>About Us</h3>
            <p className='p-2'>
              Lorem ipsum dolor sit amet consectetur, 
              adipisicing elit. Voluptas inventore modi natus rem molestiae, 
              veniam ducimus iusto autem optio tempore aut sequi adipisci, 
              velit, cumque ab! Cum fugiat est recusandae?
            </p>
          </div>
          <div className="row">
            <div className="col-md-7 my-4 mb-5">
              <div className="images position-relative p-3">
                <img src={pic1} alt="about-pic-1" className="pic-1" />
                <img src={pic2} alt="about-pic-2" className="pic-2" />
                <img src={pic3} alt="about-pic-3" className="pic-3" />
                <img src={pic4} alt="about-pic-4" className="pic-4" />
              </div>
            </div>
            <div className="col-md-5">
              <div className="about-info text-white pt-5 mt-5">
              <h4 className='h1 mb-5'>Movies Ternding</h4>
              <ul>
                <li className='mb-4 fs-6'><span className='icon center'><i className="fa-solid fa-check"></i></span> Known Box Office Movies And Best Of Them</li>
                <li className='mb-4 fs-6'><span className='icon center'><i className="fa-solid fa-check"></i></span> Discover The Neweast Tv shows</li>
                <li className='mb-4 fs-6'><span className='icon center'><i className="fa-solid fa-check"></i></span> You Can Search About Your Best Actor</li>
                <li className='mb-2 fs-6'><span className='icon center'><i className="fa-solid fa-check"></i></span> Every Thing And More Through Our Site</li>
              </ul>
              <div className="social text-white pt-5">
                <p>Also You Can Follows Us :</p>
                <ul className='socialIcons'>
                  <li><span className="facebook"><i className="fa-brands fa-facebook"></i></span></li>
                  <li><span className="twitter"><i className="fa-brands fa-twitter"></i></span></li>  
                  <li><span className="instagram"><i className="fa-brands fa-instagram"></i></span></li>
                  <li><span className="youtube"><i className="fa-brands fa-youtube"></i></span></li>
                </ul> 
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
