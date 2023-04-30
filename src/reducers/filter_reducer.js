import {
    LOAD_PRODUCTS,
    SET_LISTVIEW,
    SET_GRIDVIEW,
    UPDATE_SORT,
    SORT_PRODUCTS,
    UPDATE_FILTERS,
    FILTER_PRODUCTS,
    CLEAR_FILTERS
} from '../actions';

const initialValue = {
    filter_products: [],
    all_products: [],
    gridView: true,
    sort: 'price-lowest',
    filters: {
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        min_price: 0,
        max_price: 0,
        price: 0,
        shipping: false
    }
};

const filter_reducer = (state = initialValue, action) => {
    switch (action.type) {
        case LOAD_PRODUCTS: {
            let maxPrice = action.payload.map((p) => p.price); // get array price
            maxPrice = Math.max(...maxPrice); // convert to max value

            return {
                ...state,
                filter_products: [...action.payload],
                all_products: [...action.payload],
                filters: {
                    ...state.filters,
                    max_price: maxPrice,
                    price: maxPrice
                }
            };
        }
        case SET_LISTVIEW: {
            return { ...state, gridView: false };
        }
        case SET_GRIDVIEW: {
            return { ...state, gridView: true };
        }
        case UPDATE_SORT: {
            return { ...state, sort: action.payload };
        }
        case SORT_PRODUCTS: {
            const { sort, filter_products } = state;
            let tempProducts = [...filter_products];
            if (sort === 'price-lowest') {
                tempProducts.sort((a, b) => {
                    return a.price - b.price;
                });
            }
            if (sort === 'price-highest') {
                tempProducts.sort((a, b) => {
                    return b.price - a.price;
                });
            }
            if (sort === 'name-a') {
                tempProducts.sort((a, b) => {
                    return a.name.localeCompare(b.name);
                });
            }
            if (sort === 'name-z') {
                tempProducts.sort((a, b) => {
                    return b.name.localeCompare(a.name);
                });
            }
            return { ...state, filter_products: tempProducts };
        }
        case FILTER_PRODUCTS: {
            const { all_products } = state;
            let tempProducts = [...all_products];
            const { text, company, category, color, price, shipping } =
                state.filters;
            console.log('🚀  ~  company:', company);
            if (text) {
                tempProducts = tempProducts.filter((product) => {
                    console.log(product.name);
                    return product.name.toLowerCase().startsWith(text);
                });
            }
            // company
            if (company !== 'all') {
                tempProducts = tempProducts.filter((product) => {
                    return product.company === company;
                });
            }
            //category
            if (category !== 'all') {
                tempProducts = tempProducts.filter((product) => {
                    return product.category === category;
                });
            }
            //colors
            if (color !== 'all') {
                tempProducts = tempProducts.filter((product) => {
                    return product.colors.find((p) => {
                        return p === color;
                    });
                });
            }
            //price
            if (price) {
                tempProducts = tempProducts.filter((product) => {
                    return product.price <= price;
                });
            }
            //shipping
            if (shipping) {
                tempProducts = tempProducts.filter(
                    (product) => product.shipping === true
                );
            }
            return { ...state, filter_products: tempProducts };
        }

        case UPDATE_FILTERS: {
            if (!action.payload) return { ...state };
            const { name, value } = action.payload;

            return {
                ...state,
                filters: { ...state.filters, [name]: value }
            };
        }
        case CLEAR_FILTERS: {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    text: '',
                    company: 'all',
                    category: 'all',
                    color: 'all',
                    max_price: state.filters.max_price,
                    shipping: false
                }
            };
        }
        default:
            return { ...state };
    }
};

export default filter_reducer;
