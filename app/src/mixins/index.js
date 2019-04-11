import {getAccount, getCurrentAddress, getToken} from '../storage';
import moment from 'moment/moment';
export default {
  data() {
    return {
      account: getAccount(),
      currentAddress: getCurrentAddress(),
      token: getToken()
    };
  },
  created() {
  },
  methods: {
    dateFmt(input, fmt) {
      return moment(input).format(fmt);
    }
  }
};
