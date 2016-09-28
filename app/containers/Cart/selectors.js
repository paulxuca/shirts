import { createSelector } from 'reselect';

const selectCartReducer = () => (state) => state.get('cart');

const selectIsCartOpen = () => createSelector(
  selectCartReducer(),
  (substate) => substate.get('cartOpen'),
);

export {
  selectIsCartOpen,
};

