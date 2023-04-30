import axios from 'axios';
import { single_product_url, products_url as url } from '../utils/constants';
export const fetchProducts = () => {
    return (dispatch) => {
        return fetch('https://course-api.com/react-store-products')
            .then((response) => response.json())
            .then((products) => {
                dispatch({ type: 'SET_PRODUCTS', payload: products });
            });
    };
};

export const fecthProductsPage=()=>async (dispatch)=>{
   try {
      const reponse = await axios.get(url);
      dispatch({
         type: 'LOAD_PRODUCTS',
         payload: reponse.data
      })
   } catch (error) {
      console.log("🚀  ~  fecthProductsPage ~  error:", error);
   }
}
const getSingleProduct = (id) => async (dispatch) => {
    dispatch({ type: 'GET_SINGLE_PRODUCT_BEGIN' });
    try {
        const response = await axios.get(single_product_url + id);
        dispatch({ type: 'GET_SINGLE_PRODUCT', payload: response.data });
    } catch (error) {
        dispatch({ type: 'GET_SINGLE_PRODUCT_ERROR' });
    }
};

export default getSingleProduct;
