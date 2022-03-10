import {useEffect, useState} from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { loadUserInfo, updateProfilePicture } from '../../slice/userSlice';
import {Link} from 'react-router-dom'
import "./profile.css"
import OrderHistory from '../order/OrderHistory'

const Profile = () => {
  const dispatch = useDispatch()
  const [file,setFile]= useState({})
  const {fullname, email,address,profilePic,Tel/*pays,city,postalCode*/} = useSelector((state)=>state.user.userInfo)
  useEffect(()=>{
    dispatch(loadUserInfo())
  },[dispatch])
  const handleImageUpdate = (e) => {
    e.preventDefault();
    dispatch(updateProfilePicture(file))
  }
  return <div id='container' >
    <div className='profilebox'>
  <br/>
  <img src={profilePic} width='300px'/><br/>
  <br/>
  
  <input className='button' type='file' onChange={(e)=>setFile(e.target.files[0])}/>
  <br/><br/>


  <button className='button' onClick={handleImageUpdate}>update file</button>
  <br/>
  <br/><br/>
  <p className='p2'>Full Name: {fullname}</p>
  <br/>
 
  <p className='p2'>Email: {email}</p>
  <br/>
  
  <p className='p2'>Address: {address}</p>
  <br/>
  
  <p className='p2'>tel : {Tel}</p>
  <br/><br/>
  <Link to='/EditUser' ><button className='btn-edit'>Edit</button></Link><br/><br/>
  {/* <OrderHistory/> */}
  </div>
  </div>;
};
export default Profile;