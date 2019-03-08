export default {
  /**
   * 日期时间格式化
   * @param date
   * @returns {string}
   */
  datetime(date) {
    date = new Date(date);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1) < 10 ? `0${(date.getMonth() + 1)}` : (date.getMonth() + 1);
    let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    let hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    let min = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    return `${year}/${month}/${day} ${hour}:${min}`;
  }
};
