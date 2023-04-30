import { useEffect } from 'react';
import {
    SIDEBAR_OPEN,
    SIDEBAR_CLOSE,
    GET_PRODUCTS_BEGIN,
    GET_PRODUCTS_ERROR,
    GET_SINGLE_PRODUCT_BEGIN,
    GET_SINGLE_PRODUCT_ERROR,
    SET_PRODUCTS,
    GET_SINGLE_PRODUCT
} from '../actions';

const initialState = {
    isSidebar: false,
    arrProducts: [],
    products_loading: false,
    products_error: false,
    features_products: [],
    single_product_error: false,
    single_product_loading: false,
    single_product: []
};

const products_reducer = (state = initialState, action) => {
    switch (action.type) {
        case SIDEBAR_OPEN: {
            console.log(state);
            return { ...state, isSidebar: true };
        }
        case SIDEBAR_CLOSE: {
            console.log(state);

            return { ...state, isSidebar: false };
        }
        case GET_PRODUCTS_BEGIN: {
            return { ...state, products_loading: true };
        }
        case GET_PRODUCTS_ERROR: {
            return { ...state, products_error: true };
        }
        case SET_PRODUCTS: {
            const features_products = action.payload.filter((item) => {
                return item.featured === true;
            });
            return {
                ...state,
                arrProducts: action.payload,
                products_loading: false,
                features_products
            };
        }
        case GET_SINGLE_PRODUCT_BEGIN: {
            return { ...state, single_product_loading: true };
        }
        case GET_SINGLE_PRODUCT: {
            return {
                ...state,
                single_product_error: false,
                single_product_loading: false,
                single_product: action.payload
            };
        }
        case GET_SINGLE_PRODUCT_ERROR: {
            return { ...state, single_product_error: true };
        }
        default:
            return { ...state };
    }
};

export default products_reducer;
