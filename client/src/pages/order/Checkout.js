import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useRef, useEffect } from 'react';
import Login from '../isAuth/Login';

const Checkout = () => {

	const navigate = useNavigate();
	const { isAuth, token } = useSelector((state) => state.user);
	const cartState = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	console.log(JSON.parse(localStorage.getItem('authState'))?.token)

	const addressRef = useRef();
	const countryRef = useRef();
	const cityRef = useRef();
	const postalCodeRef = useRef();

	useEffect(() => {
		if (JSON.parse(localStorage.getItem('shippingAddress'))) {
			const { address, postalCode, country, city } = JSON.parse(localStorage.getItem('shippingAddress'));

			addressRef.current.value = address;
			cityRef.current.value = city;
			countryRef.current.value = country;
			postalCodeRef.current.value = postalCode;
		}
	}, []);

	const checkoutHandler = (e) => {
		e.preventDefault();
		console.log('click');

		if (
			!addressRef.current?.value ||
			!countryRef.current?.value ||
			!cityRef.current?.value ||
			!postalCodeRef.current?.value
		) {
			console.log('clicked');
			return;
		}

		localStorage.setItem(
			'shippingAddress',
			JSON.stringify({
				address: addressRef.current.value,
				country: countryRef.current.value,
				city: cityRef.current.value,
				postalCode: postalCodeRef.current.value,
			})
		);

		navigate('/Order');
		
		
	};

	return (
		<>
			{isAuth ? (
				<div
					style={{
						borderRadius: '5px',
						backgroundColor: '#f2f2f2',
						padding: '20px'
					}}
				>
					<form style={{ alignItems: 'center' }}>
						{/* <div style={{ top: '100px', left: '30vw',fontSize:'18px',marginLeft:'50%',paddingBottom:'20%',border:'1px solid #FF6600;'}}> */}
							{/* <tr controlId="formGridAddress1" > */}
								<label>Address : </label>
								<input style={{  width: '60%',color: 'black',padding: '14px 20px',margin: '8px 0',border: 'none',borderRadius: '4px'}} placeholder="1234 Main St" ref={addressRef} />
								<br/>
							{/* </tr> */}

							{/* <tr> */}
								{/* <td as={Col} controlId="formGridCity"> */}
									<label>Country : </label>
									<input style={{  width: '40%',color: 'black',padding: '14px 20px',margin: '8px 0',border: 'none',borderRadius: '4px'}} placeholder='Contry' ref={countryRef}/>
								{/* </td> */}
								{/* </tr> */}
								{/* <td as={Col} controlId="formGridCity"> */}
								{/* <tr> */}
								<br/>
									<label>City : </label>
									<input style={{  width: '40%',color: 'black',padding: '14px 20px',margin: '8px 0',border: 'none',borderRadius: '4px',}} placeholder='Contry' ref={cityRef}/>
								{/* </td> */}
								{/* </tr> */}
								<tr>
								{/* <td as={Col} controlId="formGridZip"> */}
									<label>Postal Code : </label>
									<input style={{  width: '40%',color: 'black',padding: '14px 20px',margin: '8px 0',border: 'none',borderRadius: '4px',}} placeholder='Contry' ref={postalCodeRef}/>
								{/* </td> */}
							</tr>

							<div style={{ display: 'flex', flexDirection: 'row' }}>
								<button
									className='btn-edit'
									variant="primary"
									type="submit"
									style={{   backgroundColor: '#4CAF50',marginTop:'30px'}}
									onClick={checkoutHandler}
								>
									Continue To Order
								</button>
							</div>
						{/* </div> */}
					</form>
				</div>
			) : (
				<div>
					<div style={{ width: '40%', marginLeft: '30%', marginTop: '5%' }}>
						<h4 onClick={checkoutHandler}>Please Sign In To Proceed!</h4>
					</div>
					<div>
						
						<Login/>
					</div>
				</div>
			)}
		</>
	);
};

export default Checkout;