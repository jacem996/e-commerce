import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { getProduct } from '../../slice/productSlice'

const Carousel = () => {
	const dispatch = useDispatch()

	// useSelector is to grab what we want from the state
	const { loading, errors, productList } = useSelector((state) => state.product)
	

	// make request here upon component load
	useEffect(() => {
			dispatch(getProduct())
		},
		[dispatch] // Dependencies, on change they fire off useEffect
	)

	return loading ? (
		<Loader />
	) : errors ? (
		<Message variant='danger'>{errors}</Message>
	) : (
		<Carousel pause='hover' className='bg-light'>
			{productList.map((product) => (
				<Carousel.Item key={product._id} interval={2000}>
					<Link to={`/product/${product._id}`}>
						<Image src={product.image} alt={product.name} fluid />
						<Carousel.Caption className='carousel-caption'>
							<h2>
								{product.name} (${product.price})
							</h2>
						</Carousel.Caption>
					</Link>
				</Carousel.Item>
			))}
		</Carousel>
	)
}

export default Carousel
