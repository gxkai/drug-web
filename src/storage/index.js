import storage from 'good-storage';
const TokenKey = 'drug-token';
const AccountKey = 'drug-account';
const CurrentAddressKey = 'drug-current-address';
const ReceivedAddressKey = 'drug-received-address';
const DrugSearchHisWords = 'drug-search-his-words';

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
 * 当前地址
 * @returns {Object|Boolean}
 */
export function getCurrentAddress() {
  return storage.get(CurrentAddressKey);
}

export function setCurrentAddress(position) {
  storage.set(CurrentAddressKey, position);
}

export function removeCurrentAddress() {
  storage.remove(CurrentAddressKey);
};

/**
 * 收货地址
 * @returns {Object|Boolean}
 */
export function getReceivedAddress() {
  return storage.get(ReceivedAddressKey);
}

export function setReceivedAddress(address) {
  storage.set(ReceivedAddressKey, address);
}

export function removeReceivedAddress() {
  storage.remove(ReceivedAddressKey);
}

/**
 * 药品搜索历史
 * @param e
 */
export function setDrugSearchHisWords(e) {
  storage.set(DrugSearchHisWords, e);
}

export function getDrugSearchHisWords() {
  return storage.get(DrugSearchHisWords);
}

export function removeDrugSearchHisWords() {
  storage.remove(DrugSearchHisWords);
}
