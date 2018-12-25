import storage from 'good-storage';
const TokenKey = 'drug-token';
const AccountKey = 'drug-account';
const CurrentAddressKey = 'drug-current-address';
const ReceivedAddressKey = 'drug-received-address';

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

export function getCurrentAddress() {
  return storage.get(CurrentAddressKey);
}

export function setCurrentAddress(position) {
  storage.set(CurrentAddressKey, position);
}

export function removeCurrentAddress() {
  storage.remove(CurrentAddressKey);
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
