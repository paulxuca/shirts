import {
  fromJS,
} from 'immutable';
import {
  OPEN_CART,
  CLOSE_CART,
  ADD_ITEM_TO_CART,
} from './constants';

const initialState = fromJS({
  cartOpen: false,
  itemsInCart: [],
});

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_CART:
      return state.set('cartOpen', true);
    case CLOSE_CART:
      return state.set('cartOpen', false);
    case ADD_ITEM_TO_CART:
      return state
      .set('cartOpen', true)
      .set('itemsInCart', state.get('itemsInCart').concat(action.payload));
    default:
      return state;
  }
}
