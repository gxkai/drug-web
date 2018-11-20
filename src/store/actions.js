import * as types from './mutation_types';
import axios from '../assets/js/axios';
import { setToken, setAccount, setLogin } from '../assets/js/auth';

/**
 * 登陆
 * @param commit
 * @param state
 * @param userInfo
 * @returns {Promise<any>}
 * @constructor
 */
export function LOGIN({ commit, state }, userInfo) {
  return new Promise((resolve, reject) => {
    axios.post('/accounts/login1', userInfo).then(res => {
      console.log('token', res.data);
      commit(types.SET_TOKEN, res.data);
      setToken(res.data);
      axios.get('/accounts').then(res => {
        console.log('account', res.data);
        commit(types.SET_ACCOUNT, res.data);
        setAccount(res.data);
        setLogin();
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    }).catch(err => {
      reject(err);
    });
  });
}
