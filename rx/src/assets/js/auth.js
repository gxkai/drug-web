import storage from 'good-storage';
const TokenKey = 'drug-app-token';
const AccountKey = 'drug-app-account';
const LoginKey = 'drug-app-login';
const DataKey = 'qy-data';
const ReceivedPositionKey = 'drug-app-received-position';
const ReceivedAddressKey = 'drug-app-received-address';

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
  return storage.get(LoginKey);
}

export function setLogin() {
  storage.set(LoginKey, true);
}

export function removeLogin() {
  storage.remove(LoginKey);
};

export function getData() {
  return storage.get(DataKey);
}

export function setData(data) {
  storage.set(DataKey, data);
}

export function removeData() {
  storage.remove(DataKey);
};

export function getReceivedPosition() {
  return storage.get(ReceivedPositionKey);
}

export function setReceivedPosition(position) {
  storage.set(ReceivedPositionKey, position);
}

export function removeReceivedPosition() {
  storage.remove(ReceivedPositionKey);
};

export function getReceivedAddress() {
  return storage.get(ReceivedAddressKey);
}

export function setReceivedAddress(address) {
  storage.set(ReceivedAddressKey, address);
}

export function removeReceivedAddress() {
  storage.remove(ReceivedAddressKey);
};
