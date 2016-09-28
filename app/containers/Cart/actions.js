import {
  OPEN_CART,
  CLOSE_CART,
  ADD_ITEM_TO_CART,
} from './constants';

export function addItemToCart(item) {
  return {
    type: ADD_ITEM_TO_CART,
    payload: item,
  };
}

export function openCart() {
  return {
    type: OPEN_CART,
  };
}

export function closeCart() {
  return {
    type: CLOSE_CART,
  };
}
