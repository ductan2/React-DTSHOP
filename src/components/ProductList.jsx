import React from 'react';
import { useFilterContext } from '../context/filter_context';
import GridView from './GridView';
import ListView from './ListView';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const ProductList = () => {
    const {
        filter_products: products,
        gridView,
        sort,
        filters
    } = useSelector((state) => state.filter_reducer);
    if (!products) return null;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type:"FILTER_PRODUCTS"
        })
        dispatch({
            type: 'SORT_PRODUCTS'
        });
    }, [sort,filters]);
    setTimeout(() => {
        if (products.length < 1) {
            return (
                <h5 style={{ textTransform: 'none' }}>
                    Sorry !, no products matched your search
                </h5>
            );
        }
    }, 3000);
    if (gridView === false) {
        return <ListView products={products}></ListView>;
    }
    return <GridView products={products}></GridView>;
};

export default ProductList;
