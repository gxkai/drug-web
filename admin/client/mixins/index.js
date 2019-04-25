import localForage from 'localforage'
const TokenKey = 'supervision_token'

export function setToken (token) {
  localForage.setItem(TokenKey, token)
}

export function getToken () {
  return new Promise((resolve) => {
    localForage.getItem(TokenKey).then(value => {
      resolve(value)
    })
  })
}

export function removeToken () {
  localForage.removeItem(TokenKey)
}
