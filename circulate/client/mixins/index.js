import localForage from 'localforage'

const TokenKey = 'circulate-token'

// 设置token
export function setToken (token) {
  localForage.setItem(TokenKey, token)
}

// 获取token
export function getToken () {
  return new Promise((resolve) => {
    localForage.getItem(TokenKey).then(value => {
      resolve(value)
    })
  })
}

// 删除token
export function removeToken () {
  localForage.removeItem(TokenKey)
}
