import {useEffect, useState} from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadUserInfo,updateUserInfo} from '../../slice/userSlice';

const EditUser = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [file,setFile]= useState({})
  const [userInfo,setUserInfo] = useState ({})
  const {fullname,/*lastName,*/ email,address,profilePic,/*pays,city,postalCode*/} = useSelector((state)=>state.user.userInfo)
  useEffect(()=>{
    dispatch(loadUserInfo())
  },[dispatch])
  
    const handleChange = (e) => { 
        setUserInfo({...userInfo,[e.target.name]: e.target.value})
     }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInfo(userInfo))
    navigate('/Profile')
  }
  
  return <div className='login-page'>
      <h1>Edit</h1><br/>
  <img src={profilePic} width='200px'/><br/><br/>
  {/* <input type='file' onChange={(e)=>setFile(e.target.files[0])}/> */}
  {/* <button onClick={handleSubmit}>update file</button> */}
  {/* <label>Full Name :</label> */}
  <input className='input-edit'  type='text'  name='fullname'  placeholder='Full Name'  onChange={handleChange}/><br/><br/>

  {/* <p>Email: {email}</p> */}
  <input className='input-edit'  type='text'  name='email' placeholder='Email address'  onChange={handleChange}/><br/><br/>

  {/* <p>Address: {address}</p> */}
  <input className='input-edit'  type='text'  name='address'  placeholder='Address' onChange={handleChange}/><br/><br/>
  <input className='input-edit'  type='number'  name='Tel'  placeholder='Tel' onChange={handleChange}/><br/><br/><br/>


  <button onClick={handleSubmit} className='btn-edit'>Edit</button>

  </div>;
};
export default EditUser;