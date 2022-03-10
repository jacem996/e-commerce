import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

//register product action 
export const registerProduct = createAsyncThunk ('product/registerProduct',async(info,{rejectWithValue,dispatch})=>{
    console.log(info)
    try {
        const productInfo = info.productInformation
        const formData = new FormData ();
        formData.append('picture',info.file)
        formData.append('info',JSON.stringify(productInfo))
        console.log(Array.from(formData))


      const {data} = await axios.post('/api/products/register',formData,{
        headers:{
            token: localStorage.getItem('token')
        }
        },)
        // /* data.role==='admin'*/ info.navigate('/Product') 
        // return dispatch(getProduct())
        return data ;
    } catch (errors) {
        return rejectWithValue(errors.response.data.msg)
    } 
})


//get product action
export const getProduct = createAsyncThunk ('product/getProduct',async(info,{rejectWithValue})=>{
    try {
      const {data} = await axios.get('/api/products',{
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

//update user info
export const UpdateProduct = createAsyncThunk ('product/UpdateProduct',async(prodInfo,{rejectWithValue,dispatch})=>{
    // console.log(prodInfo)
    try {
        console.log( 'product info' ,prodInfo)
      const {data} = await axios.put(`/api/products/${prodInfo._id}`,{...prodInfo},{
        headers:{
            token: localStorage.getItem('token')
        }
        },)
        // /* data.role==='admin'*/ info.navigate('/Product')
        return dispatch(getProduct())
        // return data ;
    } catch (errors) {
        return rejectWithValue(errors.response.data.msg)
    } 
})

export const deleteProduct = createAsyncThunk ('product/deleteProduct',async(prodId,{rejectWithValue,dispatch})=>{
    // console.log(prodId)

    try {
      const {data} = await axios.delete(`/api/products/${prodId}`,{
        headers:{
            token: localStorage.getItem('token')
        }
        },)
       return dispatch(getProduct())
    } catch (errors) {
        return rejectWithValue(errors.response.data.msg)
    }
})

const productSlice = createSlice({
    name: 'product',
    initialState:{
    //    productInfo: {},
       productslist:[],
       loading:false,
       errors:null,
       product:[]
       
    },
    reducers:{
        editProduct:(state,action)=>{
            state.product = action.payload
        }
    },
    extraReducers:{

        [getProduct.pending]:(state)=>{
            state.loading=true
        },
        [getProduct.fulfilled]:(state,action)=>{
            state.loading=false;
            state.productslist=action.payload;
            state.errors=null
        },


        [registerProduct.pending]:(state)=>{
            state.loading=true
        },
        [registerProduct.fulfilled]:(state,action)=>{
            state.loading = false;
            state.product=action.payload;
            state.errors=null;
        },
        [registerProduct.rejected]:(state,action)=>{
            state.loading= false
            state.errors=action.payload
        },
    }
});


export default productSlice.reducer
export const {editProduct} = productSlice.actions