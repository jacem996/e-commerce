import React from 'react';
import { useForm } from "react-hook-form";
import {useDispatch, useSelector} from 'react-redux'
import { registerUser } from '../../slice/userSlice';
import {useNavigate,Link} from 'react-router-dom'
import "./isAuth.css";

const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {errors: errorUser}=useSelector((state) => state.user)
    // const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const userInfo = (data)=>{
        dispatch(registerUser({data,navigate}));
    } 
  return <div className="login-page">
      <form onSubmit={handleSubmit(userInfo)}>
         <h2>SIGN UP</h2>

          {/* <label htmlFor='' >firstName: </label> */}
          <input type='text' placeholder="Full Name"{...register("fullname" ,{required: true } )}/><br/><br/>
          {/* <label htmlFor='' >lastName: </label> */}
          {/* <input type='text' placeholder="Lastname"{...register("lastName", {required: true })}/><br/><br/> */}
          {/* <label htmlFor='' >Email: </label> */}
          <input type='text' placeholder="E-mail "{...register("email" , {required: true ,
          pattern:{
            value:/[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/ ,
            message:"you should input a valid email" },
            })}/>
          {errors.Email?.message}
          <br/><br/>
          {/* <label htmlFor='' >Password: </label> */}
          <input type='password' placeholder="password"{...register("password" , {required: true , minLength:{
              value:6,
              message:"you should be of 6 caracters at least"
          }})}/>
          {errors.Password?.message}
          <br/><br/>
          {/* <label htmlFor='' >Address: </label> */}
          <input type='text' placeholder="Address"{...register("address", {required: true })}/><br/><br/>
          <input type='number' placeholder="Tel"{...register("Tel", {required: true })}/><br/><br/>

          {/* <label htmlFor='' >Pays: </label> */}
          {/* <input type='text' placeholder="Pays"{...register("pays", {required: true })}/><br/><br/> */}
          {/* <label htmlFor='' >City: </label> */}
          {/* <input type='text' placeholder="City"{...register("city", {required: true })}/><br/><br/> */}
          {/* <label htmlFor='' >postalCode: </label> */}
          {/* <input type='text' placeholder="PostalCode"{...register("postalCode", {required: true })}/><br/><br/> */}
          {errorUser && errorUser}<br/>
          <button>Register</button><br/><br/>
          Have an Account? 
        <Link to='/Login' >Login</Link>

      </form>
  </div>;
};

export default Register;
