import axios from 'axios';
import { products_url as url } from '../../utils/constants';

export const getProducts = () => {
   
    return async (dispatch) => {
        try {
            const reponse = await axios.get(url);
            console.log('response', reponse);
            dispatch({
                type: 'SET_PRODUCTS',
                arrProducts: reponse
            });
        } catch (error) {
            console.log(error);
        }
    };
};
