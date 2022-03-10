import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slice/userSlice'
import productReducer from './slice/productSlice'
import cartReducer from './slice/cartSlice'
import orderReducer from './slice/OrderSlice'


export default configureStore(({reducer: {user: userReducer,product:productReducer, cart:cartReducer, order:orderReducer }}))