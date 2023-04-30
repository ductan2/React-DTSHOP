import { combineReducers } from '@reduxjs/toolkit';
import products_reducer from './products_reducer';
import filter_reducer from './filter_reducer';
import cart_reducer from './cart_reducer';
export const reducer = combineReducers({
    products: products_reducer,
    filter_reducer,
    cart_reducer,
});
