import * as types from './mutation_types'
import axios from 'axios'
import storage from 'good-storage'

/**
 * 登陆
 * @param commit
 * @param state
 * @param userInfo
 * @returns {Promise<any>}
 * @constructor
 */
export function LOGIN ({commit, state}, {userInfo}) {
  return new Promise((resolve, reject) => {
    commit(types.SETTOKEN, '1')
    axios({
      method: 'post',
      url: '/accounts/login',
      data: userInfo
    }).then(res => {
      if (res.status === 200) {
        commit(types.SETTOKEN, res.data)
        axios({
          method: 'get',
          url: '/accounts'
        }).then(res => {
          if (res.status === 200) {
            commit(types.SETACCOUNT, res.data)
          }
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      }
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * 刷新
 * @param commit
 * @returns {Promise<any>}
 * @constructor
 */
export function VERIFY ({commit}) {
  return new Promise((resolve, reject) => {
    if (storage.session.has('firstLogin')) {
      if (storage.has('token')) {
        axios({
          method: 'get',
          url: '/accounts/verify'
        })
          .then(res => {
            if (res.status === 200) {
              commit(types.SETTOKEN, res.data)
            }
            resolve(res)
          }).catch(error => {
            reject(error)
          })
      }
    }
  })
}

/**
 * 注册
 * @param commit
 * @param account
 * @returns {Promise<any>}
 * @constructor
 */
export function REGISTER ({commit}, {account}) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: '/accounts',
      data: account
    })
      .then((res) => {
        resolve(res)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/**
 * 登出
 * @param commit
 * @returns {Promise<any>}
 * @constructor
 */
export function LOGINOUT ({commit}) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: '/accounts/logout'
    })
      .then((res) => {
        if (res.status === 200) {
          commit(types.SETTOKEN, '')
          commit(types.SETACCOUNT, {})
          storage.remove('token')
          storage.remove('account')
        }
        resolve(res)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
