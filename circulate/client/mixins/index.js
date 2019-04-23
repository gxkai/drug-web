const tokenKey = 'token'

export function getToken () {
  return this.localStorage.getItem(tokenKey)
}
