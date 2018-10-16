import storage from 'good-storage';
const TokenKey = 'drug-app-token';
const AccountKey = 'drug-app-account';
const LoginKey = 'drug-app-login';

export function getToken() {
  return storage.get(TokenKey);
}

export function setToken(token) {
  storage.set(TokenKey, token);
}

export function removeToken() {
  storage.remove(TokenKey);
}

export function getAccount() {
  return storage.get(AccountKey);
}

export function setAccount(token) {
  storage.set(AccountKey, token);
}

export function removeAccount() {
  storage.remove(AccountKey);
}

export function getLogin() {
  return storage.session.get(LoginKey);
}

export function setLogin() {
  return storage.session.set(LoginKey, 'YES');
}
