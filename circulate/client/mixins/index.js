import localForage from 'localforage'

const TokenKey = 'circulate-token'
const UserKey = 'circulate-user'

// 存储token
export function setToken (token) {
  localForage.setItem(TokenKey, token)
}

// 存储用户信息
export function setUser (token) {
  localForage.setItem(UserKey, token)
}

// 获取token
export function getToken () {
  return new Promise((resolve) => {
    localForage.getItem(TokenKey).then(value => {
      resolve(value)
    })
  })
}

// 获取用户信息
export function getUser () {
  return new Promise((resolve) => {
    localForage.getItem(UserKey).then(value => {
      resolve(value)
    })
  })
}

// 删除token
export function removeToken () {
  localForage.removeItem(TokenKey)
}

// 删除用户信息
export function removeUser () {
  localForage.removeItem(UserKey)
}
