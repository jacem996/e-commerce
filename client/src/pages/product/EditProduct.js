import {useEffect, useState} from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {UpdateProduct} from '../../slice/productSlice';
import "./product.css"

const EditProduct = ({name, price,description, id}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
//   const [file,setFile]= useState({})
const {productslist,
    loading,
    errors,
    product} = useSelector((state)=>state.product)
    const [productInfo,setProductInfo] = useState(product)
const editProduct = (data) => {
  dispatch(UpdateProduct({...data, id}))
}

    const handleChange = (e) => { 
        setProductInfo({...productInfo,[e.target.name]: e.target.value})
     }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(UpdateProduct(productInfo))
    navigate('/Product')
  }

  return <div className="login-page">
      <h2>Edit Product</h2><br/><br/>
  {/* <img src={image} width='200px'/><br/> */}
  {/* <input type='file' onChange={(e)=>setFile(e.target.files[0])}/> */}
  {/* <button onClick={handleSubmit}>update file</button> */}
  {/* <label>Full Name :</label> */}
  <input className='input-edit' type='text'  name='name'  placeholder='Name' onChange={handleChange} /><br/><br/>

  {/* <p>Email: {email}</p> */}
  <input className='input-edit' type='text'  name='price'  placeholder='Price' onChange={handleChange}/><br/><br/>

  {/* <p>Address: {address}</p> */}
  <input className='input-edit' type='text'  name='description' placeholder='Description' onChange={handleChange}/><br/><br/>
  {/* <input type='number'  name='Tel'  placeholder='Tel' onChange={handleChange}/> */}

  <br/><br/>
  <button className='btn-edit'  onClick={()=>dispatch(UpdateProduct(productInfo))}>Edit</button>

  </div>;
};
export default EditProduct;