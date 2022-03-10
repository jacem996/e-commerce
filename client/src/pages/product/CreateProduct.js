import {useState} from 'react';
// import { useForm } from "react-hook-form";
import {useDispatch, useSelector} from 'react-redux'
// import {useNavigate,Link} from 'react-router-dom'
import { registerProduct } from '../../slice/productSlice';

const CreateProduct = () => {
    // const navigate = useNavigate()
    const dispatch = useDispatch();
    // const { register:productInfo, handleSubmit, formState: { errors } } = useForm();
    const {errors: errorProduct}=useSelector((state) => state.product)
    // const {isAuth,role} = useSelector ((state)=>state.user);

    // const ProductSetting = (data)=>{
    //     dispatch(registerProduct({data,navigate}));
    // } 

    const [productInformation,setProductInformation] = useState({});
    const [file,setFile]= useState ({});

    const handleChange = (e) => {
        setProductInformation ({...productInformation,[e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerProduct({productInformation,file}))
        // navigate("/Product")
        // console.log(productInformation)
        }; 

  return <div className="login-page">
      <form>
          <h2>Create product</h2>
          {/* <label htmlFor='' >name: </label> */}
          <input type='text' name='name' placeholder="name"  onChange={handleChange}/><br/><br/>
          {/* <label htmlFor='' >description: </label> */}
          <input type='text' name='description' placeholder='description' onChange={handleChange}/><br/><br/>
          {/* <label htmlFor='' >category: </label> */}
          {/* <input type='text' name='category' placeholder='category' onChange={handleChange}/><br/><br/> */}
          {/* <label htmlFor='' >price: </label> */}
          <input type='text' name='price' placeholder='price' onChange={handleChange}/><br/><br/>
          {/* <label htmlFor='' >quantity: </label> */}
          {/* <input type='text' name='quantity' placeholder='quantity' onChange={handleChange}/><br/><br/> */}
          {/* <label htmlFor='' >image: </label> */}
          <input type='file' name='file' onChange={(e)=>setFile(e.target.files[0])}/><br/><br/>

          {errorProduct && errorProduct}<br/>
          <button onClick={handleSubmit}>Add product</button>
           
      </form>
  </div>;
};

export default CreateProduct;
