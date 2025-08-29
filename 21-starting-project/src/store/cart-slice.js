import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    changed: false,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState, 
    reducers: {
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },
        addItemToCart(state, action){
            const newItem = action.payload;
            const existingCartItem = state.items.find(item => item.id === newItem.id);
            state.totalQuantity++;
            state.changed = true;
            if (!existingCartItem){
                state.items.push({
                    id: newItem.id, 
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    title: newItem.title
                })} else {
                existingCartItem.quantity++;
                existingCartItem.totalPrice += newItem.price;
            }
        },
        removeItemFromCart(state, action){
            const id = action.payload;
            state.totalQuantity--;
            const existingCartItem = state.items.find(item => item.id === id);
            if (existingCartItem.quantity === 1){
                state.items = state.items.filter(item => item.id !== id);
            }
            else {
                existingCartItem.quantity--;
                existingCartItem.totalPrice -= existingCartItem.price;
            }

        },

        
    }
});


export const cartActions = cartSlice.actions;
export default cartSlice.reducer;