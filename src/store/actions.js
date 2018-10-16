import * as types from './mutation_types';
import axios from 'axios';
import { setToken, setAccount } from '../assets/js/auth';

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
    axios.post('/accounts/login', userInfo).then(res => {
      commit(types.SET_TOKEN, res.data);
      setToken(res.data);
      axios.get('/accounts').then(res => {
        commit(types.SET_ACCOUNT, res.data);
        setAccount(res.data);
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    }).catch(err => {
      reject(err);
    });
  });
}
