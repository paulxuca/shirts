import { createSelector } from 'reselect';

const selectCartReducer = () => (state) => state.get('cart');

const selectIsCartOpen = () => createSelector(
  selectCartReducer(),
  (substate) => substate.get('cartOpen'),
);

const selectCartItems = () => createSelector(
	selectCartReducer(),
	(substate) => substate.get('itemsInCart'),
);

export {
  selectIsCartOpen,
  selectCartItems,
};

