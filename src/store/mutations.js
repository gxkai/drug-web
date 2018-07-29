import * as types from './mutation_types';

export default {
  [types.SET_TOKEN](state, token) {
    state.token = token;
  },
  [types.SET_ACCOUNT](state, account) {
    state.account = account;
  },
  [types.SET_POSITION](state, position) {
    state.position = position;
  },
  [types.SET_CART_SHOPS](state, cart) {
    state.cart = cart;
  }
};
