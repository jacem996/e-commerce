import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const SuccessfulOrders = () => {
	const [orders, setOrders] = useState([]); 
	const [noOrder, setNoOrder] = useState(false);

	useEffect(() => {
		const fetch = async () => {
			try {
				const { data } = await axios.get('api/order/', {
					headers: {
						Authorization: `Bearer ${JSON.parse(localStorage.getItem('authState')).token}`,
					},
				});
				console.log(data);
				if ((data.message = 'No orders placed')) {
					setNoOrder(true);
				}
					setOrders(data.paidOrders);

				//setOrders(data);

			} catch (error) {
				console.log(error);
			}
		};

		fetch();
	}, []);

	const paidOrders = orders.map((order) => {
		console.log(order);
		return (
			<div style={{ marginLeft: '20px', marginBottom: '30px' }}>
				<div style={{ width: '35rem' }}>
					<img variant="top" src={order.image} />
					<div>
						<div>
							<h4>{`Order Id - ${order._id}`}</h4>
							<p>
								<span>Total Price - </span>${order.totalPrice}
							</p>
							<p>
								<span>Total Items - </span>
								{order.totalItems}
							</p>
							<p>
								<span>Order Status - </span>
								{'Paid'}
							</p>
							<p>
								<span>Payment Method - </span>
								{order.paymentMethod.toUpperCase(0)}
							</p>
							<p>
								<span>Order Date - </span>
								{new Date(order.createdAt).toDateString()}
							</p>
						</div>
						<div defaultActiveKey="0">
							<div>
								<div>
									<div as={Button} variant="link" eventKey="0">
										Order Items
									</div>
								</div>
								<div eventKey="0">
									<div>
										<div>
											{order.cartItems.map((item) => {
												return (
													<div style={{ width: '18rem', marginTop: '20px' }}>
														<img variant="top" src={item.image} />
														<div>
															<h3>{item.name}</h3>
															<h3>Quantity - {item.quantity}</h3>
															<h3>Price - ${item.price}</h3>
														</div>
													</div>
												);
											})}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	});
	console.log(paidOrders);
	return (
		<>
			<h2 style={{ textAlign: 'center', marginTop: '20px' }}>Orders Placed</h2>
			{orders.length === 0 ? 
				<>{noOrder ? <h2 style={{ textAlign: 'center', marginTop: '20px' }}>No Order Found</h2> : <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Loading....</h2>}</>
				
			 : (
				<>
					<div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}></div>

					<div
						style={{
							maxWidth: '100%',
							justifyContent: 'space-between',
							marginBottom: '40px',
							marginTop: '40px',
						}}
					>
						{paidOrders}
					</div>
				</>
			)}
		</>
	);
};

export default SuccessfulOrders;
