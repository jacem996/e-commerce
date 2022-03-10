import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {Link,useNavigate} from 'react-router-dom'
import {editProduct, getProduct} from '../../slice/productSlice'
import { addToCart } from "../../slice/cartSlice";
import { UpdateProduct } from '../../slice/productSlice';
import { deleteProduct } from '../../slice/productSlice';
import "./product.css"
import { Carousel } from 'react-bootstrap';
import ListUsers from '../../components/allusers/ListUsers';
import EditProduct from './EditProduct';
import Search from '../../components/search/search';

const Product = ({name,description,price,image,_id}) => {
    const {isAuth,role} = useSelector ((state)=>state.user);
    const dispatch = useDispatch()

    useEffect(()=>{ 
      dispatch(getProduct())
    },[dispatch])
    
    const {productslist,loading,errors,} = useSelector((state)=>state.product);   
    const navigate = useNavigate();
   
    // const { data, error, isLoading } = getProduct();
    // console.log("Api", isLoading);
  
    const handleAddToCart = (product) => {
      dispatch(addToCart(product));
      navigate("/Cart");
    };

    const handleEditCart = (product) => {
      dispatch(editProduct(product));
      navigate("/EditProduct");
    };
    // const handleDeleteCart = (product) => {
    //   dispatch(deleteProduct(product));
    // };
    

  return (

<div className="home-container">

{isAuth && role==='admin' && <Link to='/CreateProduct' > <button className='btn'>Create Product</button> </Link>} 

  <>
  <img className='img-prod' src='/alarme.jpg' alt='caroussel' style={{padding:'20px 0 20px 96px'}}/>
    <h2>New Arrivals</h2>
    <Search/>
    <div className="products">
    {loading && <p>loading...</p>}
    {errors && <p>{errors}</p>}
      {productslist &&
        productslist?.map((product) => (
          <div key={product._id} className="product">
            <div style={{display:'flex',justifyContent:'space-between'}}>
            <h3>{product.name}</h3>
            {isAuth && role==='admin'  &&<i className="fa-solid fa-trash-can" style={{color:'red',cursor:'pointer'}}
             onClick={()=>dispatch(deleteProduct(product._id))}></i>} 
            </div>

            <img src={product.image} alt={product.name} style={{width:'150px', height:'100px'}} />  
            <div className="details">
              <span>{product.description}</span>
              <span className="price">${product.price}</span>
            </div>
            
            <button className='btn-add' onClick={() => handleAddToCart(product)}>
              Add To Cart
            </button>
            {isAuth && role==='admin'  &&  
            <button className='btn-edit' onClick={() => handleEditCart(product)}>
              Edit Product
            </button> } 
          </div>
        
        ))}
    </div>
  </>
</div>
)
};

export default Product