import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      // checks to see if the itm that is being removed is in the basket
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      // creating a copy of the basket
      let newBasket = [...state.items];

      if (index >= 0) {
        // "cuts" the item out
        newBasket.splice(index, 1);
      } else {
        console.warn(
          "Can't remove product (id: ${action.payload.id}) as it is not in the basket!"
        );
      }
      // replace old basket with modified basket
      state.items = newBasket;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions;

export const selectBasketItems = (state) => state.basket.items;

export const selectBasketItemsWithId = (state, id) =>
  state.basket.items.filter((item) => item.id === id);

export const selectBasketTotal = (state) =>
  state.basket.items.reduce((total, item) => (total += item.price), 0);

export default basketSlice.reducer;
