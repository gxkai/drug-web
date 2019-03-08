import storage from 'good-storage';
const TokenKey = 'supervise-token';
const AccountKey = 'supervise-account';
const UsernameKey = 'supervise-username';
/**
 * 授权口令
 * @returns {Object|Boolean}
 */
export function getToken() {
  return storage.get(TokenKey);
}

export function setToken(token) {
  storage.set(TokenKey, token);
}

export function removeToken() {
  storage.remove(TokenKey);
}

/**
 * 用户信息
 * @returns {Object|Boolean}
 */
export function getAccount() {
  return storage.get(AccountKey);
}

export function setAccount(token) {
  storage.set(AccountKey, token);
}

export function removeAccount() {
  storage.remove(AccountKey);
}

/**
 * 登陆用户名
 * @returns {Object|Boolean}
 */
export function getUsername() {
  return storage.get(UsernameKey);
}

export function setUsername(e) {
  storage.set(UsernameKey, e);
}

export function removeUsername() {
  storage.remove(UsernameKey);
}
