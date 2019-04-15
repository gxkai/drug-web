import that from '@/main.js';
const TokenKey = 'drug-token';
const AccountKey = 'drug-account';
const CurrentAddressKey = 'drug-current-address';
const ReceivedAddressKey = 'drug-received-address';
const DrugSearchHisWords = 'drug-search-his-words';
const UsernameKey = 'drug-username';
/**
 * 授权口令
 * @returns {Object|Boolean}
 */
export function getToken() {
  return that.$storage.get(TokenKey);
}

export function setToken(token) {
  that.$storage.set(TokenKey, token);
}

export function removeToken() {
  that.$storage.remove(TokenKey);
}

/**
 * 用户信息
 * @returns {Object|Boolean}
 */
export function getAccount() {
  return that.$storage.get(AccountKey);
}

export function setAccount(token) {
  that.$storage.set(AccountKey, token);
}

export function removeAccount() {
  that.$storage.remove(AccountKey);
}

/**
 * 当前地址
 * @returns {Object|Boolean}
 */
export function getCurrentAddress() {
  return that.$storage.get(CurrentAddressKey);
}

export function setCurrentAddress(position) {
  that.$storage.set(CurrentAddressKey, position);
}

export function removeCurrentAddress() {
  that.$storage.remove(CurrentAddressKey);
}

/**
 * 收货地址
 * @returns {Object|Boolean}
 */
export function getReceivedAddress() {
  return that.$storage.get(ReceivedAddressKey);
}

export function setReceivedAddress(address) {
  that.$storage.set(ReceivedAddressKey, address);
}

export function removeReceivedAddress() {
  that.$storage.remove(ReceivedAddressKey);
}

/**
 * 药品搜索历史
 * @param e
 */
export function setDrugSearchHisWords(e) {
  that.$storage.set(DrugSearchHisWords, e);
}

export function getDrugSearchHisWords() {
  return that.$storage.get(DrugSearchHisWords);
}

export function removeDrugSearchHisWords() {
  that.$storage.remove(DrugSearchHisWords);
}

/**
 * 登陆用户名
 * @returns {Object|Boolean}
 */
export function getUsername() {
  return that.$storage.get(UsernameKey);
}

export function setUsername(e) {
  that.$storage.set(UsernameKey, e);
}

export function removeUsername() {
  that.$storage.remove(UsernameKey);
}
