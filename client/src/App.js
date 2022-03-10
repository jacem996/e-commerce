import './App.css';
import { Route,Routes } from 'react-router-dom';
import Home from './pages/home/Home'
import Register from './pages/isAuth/Register';
import Login from './pages/isAuth/Login'
import CreateProduct from './pages/product/CreateProduct'
// import Contact from './pages/Contact'
import Navbar from './components/Navbar';
import Profile from './pages/profile/Profile';
import Dashboard from './pages/dashboard/Dashboard'
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedRouteAdmin from './components/ProtectedRoute';
import Technicien from './pages/technicien/Techniciens';
import Product from './pages/product/Product';
import ProtectedRouteTechnicien from './components/ProtectedRouteTechnicien';
import EditUser from './pages/profile/EditUser';
import Cart from './pages/cart/Cart';
import EditProduct from './pages/product/EditProduct';
import Footer, { FooterContainer } from './components/footer/Footer';
import Search from './components/search/search';
import ListUsers from './components/allusers/ListUsers';
import { Carousel } from 'react-bootstrap';
import Techniciens from './pages/technicien/Techniciens';
import Order from './pages/order/Order';
import Checkout from './pages/order/Checkout';
import OrderSuccess from './pages/order/OrderSuccess';
import OrderHistory from './pages/order/OrderHistory';

function App() {
  return (
    <div className="App">
      <Navbar/>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Product' element={<Product/>}/>

        {/* <Route path='/Contact' element={<Contact/>}/> */}
        <Route path='/Cart' element={<Cart/>} ></Route>

        <Route element={<ProtectedRoute/>}>
        <Route path='/Profile' element={<Profile/>}/>
        <Route path='/EditUser' element={<EditUser/>}/>
        </Route>

        <Route element={<ProtectedRouteAdmin/>}>
        <Route path='/Dashboard' element={<Dashboard/>}/>
        <Route path='/CreateProduct' element={<CreateProduct/>}/>
        <Route path='/EditProduct' element={<EditProduct/>}/>
        <Route path='/ListUsers' element={<ListUsers/>}/>
        <Route path='/Techniciens' element={<Techniciens/>}/>

        </Route>

        <Route element={<ProtectedRouteTechnicien/>}>
        <Route path='/Technicien' element={<Profile/>}/>
        </Route>

        <Route path='/Checkout' element={<Checkout/>}/>
        <Route path='/Order' element={<Order/>}/>
        {/* <Route path="/orders/history" >
					{<OrderHistory/>}
				</Route>
				<Route path="/order/:id/success" >
					{<OrderSuccess/>}
				</Route> */}

					{/* HomeScreen Search */}
					<Route path='/search/:keyword' element={<Product/>} exact />
					{/* HomeScreen Search Page number */}
					<Route
						path='/search/:keyword/page/:pageNumber'
						component={<Product/>}
						exact
					/>
					{/* HomeScreen Page number */}
					<Route path='/page/:pageNumber' component={<Product/>} exact />
					{/* HomeScreen */}
        {/* <Route path='/productCarroussel' element={<Carousel/>}/> */}
      </Routes>
      <FooterContainer/>
    </div>
  );
}

export default App;
