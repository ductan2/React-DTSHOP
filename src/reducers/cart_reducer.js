import {
    ADD_TO_CART,
    CLEAR_CART,
    COUNT_CART_TOTALS,
    REMOVE_CART_ITEM,
    TOGGLE_CART_ITEM_AMOUNT,
    SHIPPING_FEE,
    SET_USER
} from '../actions';
const getLocalStorage = () => {
    let cart = localStorage.getItem('cart');
    if (cart) {
        return JSON.parse(localStorage.getItem('cart'));
    } else {
        return [];
    }
};
const initialValue = {
    cart: getLocalStorage(),
    total_items: 0,
    total_amount: 0,
    shipping_fee: 0,
    myUser: false
};

const cart_reducer = (state = initialValue, action) => {
    switch (action.type) {
        case ADD_TO_CART: {
            const { id, color, amount, proc } = action.payload;

            let tempItem = state.cart.find((i) => {
                return i.id === id + color;
            });
            console.log('🚀  ~  tempItem ~  tempItem:', tempItem);
            if (tempItem) {
                const tempCart = state.cart.map((cartItem) => {
                    if (cartItem.id === id + color) {
                        let newAmount = cartItem.amount + amount; // cập nhập số lượng mặt hangf
                        if (newAmount > cartItem.max) {
                            newAmount = cartItem.max;
                        }
                        return { ...cartItem, amount: newAmount };
                    } else return cartItem;
                });
                return { ...state, cart: tempCart };
            } else {
                const newItem = {
                    id: id + color,
                    name: proc.name,
                    color,
                    amount,
                    image: proc.images[0].url,
                    price: proc.price,
                    max: proc.stock
                };
                return { ...state, cart: [...state.cart, newItem] };
            }
        }
        case REMOVE_CART_ITEM: {
            console.log(action.payload);
            const tempCart = state.cart.filter((idCart) => {
                return idCart.id !== action.payload;
            });
            return { ...state, cart: tempCart };
        }
        case CLEAR_CART: {
            return { ...state, cart: [] };
        }
        case TOGGLE_CART_ITEM_AMOUNT: {
            const { id, value } = action;
            let tempCart = state.cart.map((item) => {
                if (item.id === id) {
                    // check value inc or dec
                    if (value === 'inc') {
                        let newAmount = item.amount + 1;
                        if (newAmount > item.max) {
                            newAmount = item.max;
                        }
                        return { ...item, amount: newAmount };
                    } else {
                        let newAmount = item.amount - 1;
                        if (newAmount < 1) {
                            newAmount = 1;
                        }
                        return { ...item, amount: newAmount };
                    }
                } else {
                    return item;
                }
            });
            return { ...state, cart: tempCart };
        }
        case COUNT_CART_TOTALS: {
            const { total_amount, total_items } = state.cart.reduce(
                (total, item) => {
                    const { price, amount } = item;
                    total.total_items += amount;
                    total.total_amount += price * amount;
                    return total;
                },
                { total_items: 0, total_amount: 0 }
            );
            return { ...state, total_amount, total_items };
        }
        case SHIPPING_FEE: {
            let tempShipFee = state.shipping_fee;
            if (state.total_amount < 30000) {
                tempShipFee = 500;
            } else if (state.total_amount < 50000) {
                tempShipFee = 300;
            } else if (state.total_amount > 50000) {
                tempShipFee = 0;
            }
            return { ...state, shipping_fee: tempShipFee };
        }
        case SET_USER: {
            return { ...state, myUser: action.payload };
        }
        default:
            return { ...state };
    }
};

export default cart_reducer;
