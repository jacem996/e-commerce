import {useEffect} from 'react';
import { useForm } from "react-hook-form";
import {useDispatch, useSelector} from 'react-redux'
import { loginUser } from '../../slice/userSlice';
import {useNavigate,Link} from 'react-router-dom'
import "./isAuth.css";
const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {errors: UserError,isAuth,role}=useSelector((state) => state.user)
	// const qty = location.search ? Number(location.search.split('=')[1]) : 1

    useEffect(()=>{
        if(isAuth && role==='user') navigate('/Profile') 
        else if(isAuth && role==='admin') navigate('/Dashboard')
        else if (isAuth && role==='technicien') navigate('/Technicien')
    },[])
    const { register:loginInfo, handleSubmit, formState: { errors } } = useForm();

    const userInfo = (data)=>{
        dispatch(loginUser({data,navigate}));

    }
  return <div className="login-page">
      <form onSubmit={handleSubmit(userInfo)}>
            <h2>SIGN IN</h2>
        <input type='text' placeholder="email" {...loginInfo("email" , {required: true ,
            pattern:{
            value:/[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/ ,
            message:"you should input a valid email" },
            })}/>
        {errors.Email?.message}
        <br/><br/>
        {/* <label htmlFor='' >Password: </label> */}
        <input type='password' placeholder="Password" {...loginInfo("password" , {required: true , minLength:{
            value:6,
            message:"you should be of 6 caracters at least"
        }})}/>
            {errors.Password?.message}
        <br/><br/>
            {UserError && UserError}<br/>
        
        <button>Submit</button><br/><br/>
        New Customer?
        <Link to='/Register' >Register</Link>
        
    </form>
    </div>;
};

export default Register;
