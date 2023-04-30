import { useEffect } from 'react';
import { FeaturedProducts, Hero, Services, Contact } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { products_url as url } from '../utils/constants';
import axios from 'axios';
import { fetchProducts } from '../reducers/fecthData';

const HomePage = () => {
    const dispatch = useDispatch();
    // useEffect(() => {
    //     async function fecthData() {
    //         dispatch({
    //             type: 'GET_PRODUCTS_BEGIN'
    //         });
    //         try {
    //             const reponse = await axios.get(url);
    //             console.log('🚀  ~  fecthData ~  reponse:', reponse);
    //             dispatch({
    //                 type: 'SET_PRODUCTS',
    //                 payload: reponse.data
    //             });
    //         } catch (error) {
    //             dispatch({
    //                 type: 'GET_PRODUCTS_ERROR'
    //             });
    //         }
    //     }
    //     fecthData();
    // }, []);
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);
    
   
    return (
        <main>
            <Hero></Hero>
            <FeaturedProducts></FeaturedProducts>
            <Services></Services>
            <Contact></Contact>
        </main>
    );
};

export default HomePage;
