import * as types from './mutation_types'

export default {
  [types.SETTOKEN] (state, token) {
    state.token = token
  },
  [types.SETACCOUNT] (state, account) {
    state.account = account
  }
}
