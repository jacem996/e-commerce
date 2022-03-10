import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { orderActions } from '../../slice/OrderSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Paypal from './Payment';

const Order = () => {
	const { isAuth } = useSelector((state) => state.user);
	const { currentOrder: order } = useSelector((state) => state.order);
	const state = useSelector((state) => state.order);
	const cartState = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	// const [payment, setPayment] = useState('');
	const [checkout, setCheckOut] = useState(false);

	const { address, city, postalCode, country } = JSON.parse(localStorage.getItem('shippingAddress'));

	const placeOrderHandler = () => {
		console.log(checkout);
		setLoading(true);
		const sendCartData = async () => {
			try {
				const { data } = await axios.post(
					'/api/order/register',
					{
						...cartState,
						shippingAddress: {
							...JSON.parse(localStorage.getItem('shippingAddress')),
						},
						paymentMethod: checkout,
					},
					{
                        headers:{
                            token: localStorage.getItem('token')
                        },
					}
				);

				console.log(data);
				dispatch(orderActions.currentOrderHandler(data));
				setLoading(false);
				navigate(`/order/${JSON.parse(localStorage.getItem('order'))._id}`);
			} catch (error) {
				console.log(error.message);
			}
		};

		if (checkout) {
			sendCartData();
		}
	};

	console.log(JSON.parse(localStorage.getItem(state)));
	const orderItems = JSON.parse(localStorage.getItem('cartItems'))?.map((item) => {
		return (
			<div
				key={item._id}
				style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', paddingBottom: '20px' }}
			>
				<div>
					<img style={{ width: '30%', height: '100%' }} src={item.image} />
				</div>
				<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
					<div>{item.name}</div>
					<div style={{ marginLeft: '60px' }}>${item.price}</div>
				</div>
				<div>
					<div style={{ marginLeft: '60px' }}>{item.quantity}</div>
				</div>
			</div>
		);
	});
console.log()
	return loading ? (
		<h2 style={{textAlign : 'center', marginTop : '40px'}}>Loading......</h2>
	) : (
		<>
			{isAuth ? (
				<>
					{state ? (
						<>
									<div style={{ width: '45rem', marginTop: '20px' ,marginLeft:'25%' ,marginTop:'6rem' }}>
										<div style={{backgroundColor:'whitesmoke',fontSize:'25px', color:'#53488d',borderBlockStyle:'solid',borderBlockColor:'ActiveBorder' }}>
											<h2 style={{color :'black',marginBottom:'10px'}}>Shipping Details</h2>
											<div>
												<h6 style={{color:'brown', marginLeft:'1rem' }}>
													Address - <span>{address}</span>
												</h6>
												<h6 style={{color:'brown', marginLeft:'1rem' }}>
													Country - <span>{country}</span>
												</h6>
												<h6 style={{color:'brown', marginLeft:'1rem' }}>
													City - <span>{city}</span>
												</h6>
												<h6 style={{color:'brown', marginLeft:'1rem' }}>
													Postal Code - <span>{postalCode}</span>
												</h6>
											</div>
										</div>

									<div style={{ width: '45rem', backgroundColor:'whitesmoke',color:'#53488d',borderBlockStyle:'solid',borderBlockColor:'ActiveBorder', }}>											
											<h2 style={{fontSize:'30px' ,marginBottom:'10px',color:'black'}}>Order Summary</h2>
											<div>
												<p style={{ fontWeight: 'bold',color:'brown',marginLeft:'1rem' }}>
													Total Items - {JSON.parse(localStorage.getItem('cartItems')).length}
												</p>
												<p style={{ fontWeight: 'bold',color:'brown',marginLeft:'1rem' }}>
													Total Price - $
													{JSON.parse(localStorage.getItem('cartItems')).reduce((acc,curr)=>acc+(curr.price*curr.cartQuantity),0)}
												</p>
											</div>
											<div class="form-check">
											{checkout ? (
       												 <Paypal />
   													   ) : (
											<button
											style={{margin:'25px'}}
   											onClick={() => {
												setCheckOut(true);
										}}
										>
										 <label class="form-check-label" for="flexRadioDefault1">
													Paypal <i class="fab fa-cc-paypal" style={{ color: 'blue',fontSize:'50px' }}></i>
												</label>
											</button>
											)}
									</div>
									</div>

								<div style={{ marginLeft: '20px', backgroundColor:'whitesmoke',margin:'0 0 9rem 0', color:'#53488d',borderBlockStyle:'solid',borderBlockColor:'ActiveBorder' }}>
									<div style={{ width: '45rem', marginTop: '20px', fontWeight: 'bold' }}>
										<div>
											<h3 style={{color:'black'}}>Order Items - </h3>

											<h4 style={{color:'black'}}>{orderItems}</h4>
										</div>
									</div>
								</div>
							</div>
						</>
					) : (
						<p>Loading</p>
					)}
				</>
			) : (
				<h3 style={{ textAlign: 'center', marginTop: '40px' }}>Please Sign In to Place Order!</h3>
			)}
		</>
	);
};

export default Order;
