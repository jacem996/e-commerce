import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
//register action
export const registerUser = createAsyncThunk ('user/registerUser',async(info,{rejectWithValue})=>{
    try {
      const {data} = await axios.post('/api/user/register',info.data)
        info.navigate('/Login')
        return data ;
    } catch (errors) {
        return rejectWithValue(errors.response.data.msg)
    }
})
//login action
export const loginUser = createAsyncThunk ('user/loginUser',async(info,{rejectWithValue})=>{
    try {
      const {data} = await axios.post('/api/user/login',info.data)
        data.role==='user'? info.navigate('/') : data.role==='admin' ?  info.navigate('/Dashboard') :  info.navigate('/Technicien') 
        
        return data ;
    } catch (errors) {
        return rejectWithValue(errors.response.data.msg)
    } 
})

//load user info action
export const loadUserInfo = createAsyncThunk ('user/loadUserInfo',async(info,{rejectWithValue})=>{
    try {
      const {data} = await axios.get('/api/user/userInfo',{
          headers:{
              token: localStorage.getItem('token')
          },
      })        
        return data ;
    } catch (errors) {
        return rejectWithValue(errors.response.data.msg)
    } 
})

//update profile picture action
export const updateProfilePicture = createAsyncThunk ('user/updateProfilePicture',async(file,{rejectWithValue,dispatch})=>{
    try {
        const formPic = new FormData ();
        formPic.append('profilePicture',file)
      const {data} = await axios.put('/api/user/profilePic',formPic,{
          headers:{
              token: localStorage.getItem('token')
          },
      })        
      return dispatch(loadUserInfo())
    } catch (errors) {
        return rejectWithValue(errors.response.data.msg)
    } 
})

//update user info
export const updateUserInfo = createAsyncThunk ('user/updateUserInfo',async(info,{rejectWithValue,dispatch})=>{
    console.log(info)
    try {
        // const formData = new FormData();
        // formData.append('profilePicture',info.file)
        // formData.append('info',JSON.stringify(productInfo))
        // console.log(Array.from(formData))

      const {data} = await axios.put('/api/user/updateuser',{...info},{
        headers:{
            token: localStorage.getItem('token')
        }
        },)
        // /* data.role==='admin'*/ info.navigate('/Product') 
        return dispatch(loadUserInfo())
        // return data ;
    } catch (errors) {
        return rejectWithValue(errors.response.data.msg)
    } 
})
//update user info
export const deleteUser = createAsyncThunk ('user/deleteUser',async(info,{rejectWithValue,dispatch})=>{
    console.log(info)
    try {
        // const formData = new FormData();
        // formData.append('profilePicture',info.file)
        // formData.append('info',JSON.stringify(productInfo))
        // console.log(Array.from(formData))

      const {data} = await axios.delete('/api/user/deleteuser',{...info},{
        headers:{
            token: localStorage.getItem('token')
        }
        },)
        // /* data.role==='admin'*/ info.navigate('/Product') 
        return dispatch(getUsers())
        // return data ;
    } catch (errors) {
        return rejectWithValue(errors.response.data.msg)
    } 
})


//get users action
export const getUsers = createAsyncThunk ('user/getUsers',async(info,{rejectWithValue})=>{
    try {
      const {data} = await axios.get('/api/user',{
        headers:{
            token: localStorage.getItem('token')
        }
        },)
    //    info.navigate('/Product') 
        return data ;
    } catch (errors) {
        return rejectWithValue(errors.response.data.msg)
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState:{
       userInfo: {},
       userList:[{}],
       errors: null,
       token:localStorage.getItem('token') || null,
       isAuth:localStorage.getItem('isAuth') ||false,
       role: localStorage.getItem('role') || '',
    },
    reducers:{
        logout: (state) =>{
            state.token=null;
            state.isAuth=false;
            state.role='';
	        localStorage.removeItem('cartItems')
            localStorage.removeItem('token');
            localStorage.removeItem('isAuth');
            localStorage.removeItem('role');
        },
    },
    extraReducers:{
        [registerUser.fulfilled]:(state,action)=>{
            state.msg=action.payload.msg
        },
        [registerUser.rejected]:(state,action)=>{
            state.errors=action.payload
        },
        [loginUser.fulfilled]:(state,action)=>{
            state.isAuth=true;
            localStorage.setItem('isAuth', true);
            state.token=action.payload.token
            state.role=action.payload.role
            localStorage.setItem('role', action.payload.role)
            localStorage.setItem('token',action.payload.token)
        },
        [loginUser.rejected]:(state,action)=>{
            state.errors=action.payload
        },
        [loadUserInfo.fulfilled]:(state,action)=>{
            state.userInfo=action.payload
        },
        [loadUserInfo.rejected]:(state,action)=>{
            state.errors=action.payload
        },
        
        [getUsers.pending]:(state)=>{
            state.loading=true
        },
        [getUsers.fulfilled]:(state,action)=>{
            state.loading=false;
            state.userInfo=action.payload;
            state.errors=null
        },
    }
});

export default userSlice.reducer
export const {logout} = userSlice.actions;