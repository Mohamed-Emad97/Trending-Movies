import React from 'react';
import { useState } from 'react';
import Axios from "axios";
import Joi from "joi";
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [user, setUser] = useState({
    first_name:"", 
    last_name:"", 
    email:"", 
    password:"", 
    age:0,
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

  async function submitForm(e){
    e.preventDefault();
    setIsLoading(true);
    let validationResult = validation();

    if(validationResult.error){
      setErrorList(validationResult.error.details);
      setIsLoading(false);
    }else {
      let baseUrl = "https://route-egypt-api.herokuapp.com/";
      let apiMethod = "signup";
      let {data} = await Axios.post(`${baseUrl}${apiMethod}`,user);
      console.log(data);
      if(data.message === "success"){ //Registeration Is Success
        //Navigation To Login Component
        setIsLoading(false);
        navigate("/login");
      }else {
        //You Have Error In Registeration 
        setError(data.message);
        setIsLoading(false);
      }
    }
 
  }

  function validation(){
    let schema = Joi.object({
      first_name:Joi.string().alphanum().min(3).max(15).required(),
      last_name:Joi.string().alphanum().min(3).max(15).required(), 
      email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(), 
      password:Joi.string().pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)),  //8 chars at least 1 char & 1 num
      age:Joi.number().min(16).max(100).required(),
    });

    return schema.validate(user,{abortEarly:false});
  }
  
  return (
    <section id="register" className='py-5'>
      <div className="container">
        <form onSubmit={submitForm} className="form center text-white flex-column">
          <h2 className='align-self-start'>Register Form</h2>
          <label htmlFor="" className='align-self-start'>First Name</label>
          <input onChange={getUserData} type="text" name="first_name" id="first-name" className='w-100 p-2'/>
          <label htmlFor="" className='align-self-start'>Last Name</label>
          <input onChange={getUserData} type="text" name="last_name" id="last-name" className='w-100 p-2'/>
          <label htmlFor="" className='align-self-start'>Age</label>
          <input onChange={getUserData} type="number" name="age" id="age" className='w-100 p-2'/>
          <label htmlFor="" className='align-self-start'>Email</label>
          <input onChange={getUserData} type="email" name="email" id="email" className='w-100 p-2'/>
          <label htmlFor="" className='align-self-start'>Password</label>
          <input onChange={getUserData} type="password" name="password" id="password" className='w-100 p-2'/>
          {errorList.map((error)=> <p className='align-self-start error-msg'>{error.message}</p>)}
          <p className='align-self-start error-msg'>{error}</p>
          <button type="submit" className='btn btn-main align-self-start'>
            {isLoading === true? <i className='fas fa-spinner fa-spin'></i> : "Register"}
          </button>
        </form>
      </div>
    </section>
  )
}
