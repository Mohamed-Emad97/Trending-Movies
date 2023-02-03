import React , {useState} from 'react'
import {Link} from "react-router-dom";
import Axios from 'axios';
import Joi from "joi";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


export default function Login(props) {
  const [user, setUser] = useState({ 
    email:"", 
    password:"", 
  });
  const [error,setError] = useState("");
  const [errorList, setErrorList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  function getUserData(e){
    let myUser = {...user}; //Copy Of State
    myUser[e.target.name] = e.target.value; //To Get Property Dynamically
    setUser(myUser);
    // console.log(myUser);

  }

  useEffect(()=>{
    if (localStorage.getItem("userToken")){
      navigate("/home");
    }
  }, []);

  async function submitForm(e){
    e.preventDefault();
    setIsLoading(true);
    let validationResult = validation();

    if(validationResult.error){
      setErrorList(validationResult.error.details);
      setIsLoading(false);
    }else {
      let baseUrl = "https://route-movies-api.vercel.app/";
      let apiMethod = "signin";
      let {data} = await Axios.post(`${baseUrl}${apiMethod}`,user);
      console.log(data);
      if(data.message === "success"){ //Login Is Success
        //Navigation To Home Component
        setIsLoading(false);
        localStorage.setItem("userToken", data.token);
        //Here We Call Func saveUser();
        props.saveUserData();
        navigate("/home");
      }else {
        //You Have Error In Registeration 
        setError(data.message);
        setIsLoading(false);
      }
    }
 
  }

  function validation(){
    let schema = Joi.object({
      email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(), 
      password:Joi.string().pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)),  //8 chars at least 1 char & 1 num
    });

    return schema.validate(user,{abortEarly:false});
  }

  return (
    <>
    <section id="login" className="py-5">
      <div className="container">
        <h2 className='text-white'>Login Form</h2>
        <form onSubmit={submitForm} className="form center text-white flex-column">
        <label htmlFor="" className='align-self-start'>Email</label>
        <input onChange={getUserData} type="email" name="email" id="email" className='w-100 p-2'/>
        <label htmlFor="" className='align-self-start'>Password</label>
        <input onChange={getUserData} type="password" name="password" id="password" className='w-100 p-2'/>
        <p className='align-self-start text-white my-1'>Don't Have Account? <Link className='link' to="/register">Register</Link></p>
        {errorList.map((error, i)=> i === 1? <p className='align-self-start error-msg'>Password Invalid</p> : <p className='align-self-start error-msg'>{error.message}</p>)}
          <p className='align-self-start error-msg'>{error}</p>
        <button type="submit" className='btn btn-main align-self-start'>
          {isLoading === true? <i className='fas fa-spinner fa-spin'></i> : "Login"}
        </button>
        </form>
      </div>
    </section>
    </>
  )
}
