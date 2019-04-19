export default {
  methods: {
    loadPage(routerPath, param) {
      if (param) {
        this.$router.push({ path: routerPath, query: param });
      } else {
        this.$router.push({ path: routerPath });
      }
    },
    loadPage_p(routerPath, param) {
      if (param) {
        this.$router.push({ name: routerPath, params: param });
      } else {
        this.$router.push({ name: routerPath });
      }
    },
    loadPageAccounts() {
      this.loadPage('/accounts');
    },
    loadPageAccountsInfo() {
      this.loadPage('/accounts/info');
    },
    loadPageAddressesChoose() {
      this.loadPage('/addresses/choose');
    },
    loadPageAddressesConfirm() {
      this.loadPage('/addresses/confirm');
    },
    loadPageAddressesEdit(id) {
      this.loadPage('/addresses/edit', { id: id });
    },
    loadPageAddressesCreate() {
      this.loadPage('/addresses/create');
    },
    loadPageAddresses() {
      this.loadPage('/addresses');
    },
    loadPageCarts() {
      this.loadPage('/carts');
    },
    loadPageChats(type) {
      this.loadPage('/chats', { type: type });
    },
    loadPageChatsView(user, chatId) {
      this.loadPage('/chats/view', { user: user, chatId: chatId });
    },
    loadPageCollects() {
      this.loadPage('/collects');
    },
    loadPageDrugAppraisesCreate(id) {
      this.loadPage('/drugAppraises/create', { orderId: id });
    },
    loadPageDrugAppraisesSuccess() {
      this.loadPage('/drugAppraises/success');
    },
    loadPageDrugs(typeId, keyword, shopId, interfaceType) {
      this.loadPage('/drugs', {
        typeId: typeId,
        keyword: keyword,
        shopId: shopId,
        interfaceType: interfaceType
      });
    },
    loadPageDrugsShops(id) {
      this.loadPage('/drugs/shops', { drugId: id });
    },
    loadPageDrugTypes() {
      this.loadPage('/drugTypes');
    },
    loadPageFaqs() {
      this.loadPage('/faqs');
    },
    loadPageFeedbacks() {
      this.loadPage('/feedbacks');
    },
    loadPageFeedbacksView(id) {
      this.loadPage(`/feedbacks/view`, {id: id});
    },
    loadPageFeedbackCreate() {
      this.loadPage('/feedbacks/create');
    },
    loadPageIframe(url, name) {
      this.loadPage('/iframe', { url: url, name: name });
    },
    loadPageHome() {
      this.loadPage('/home');
    },
    loadPageInsurancesAccount() {
      this.loadPage('/insurances/account');
    },
    loadPageInsurancesConsume() {
      this.loadPage('/insurances/consume');
    },
    loadPageInsurancesConsumeInfo(consumeInfo) {
      this.loadPage_p('/insurances/consumeInfo', { consumeInfo: consumeInfo });
    },
    loadPageInsurancesConsumeInfoMore(consumeInfoMore) {
      this.loadPage_p('/insurances/consumeInfoMore', {
        consumeInfoMore: consumeInfoMore
      });
    },
    loadPageLogin() {
      this.loadPage('/login');
    },
    loadPageMessages(title, messageType) {
      this.loadPage('/messages', { title: title, messageType: messageType });
    },
    loadPageMessagesView(id) {
      this.loadPage('/messages/view', { messageId: id });
    },
    loadPageMessageTypes() {
      this.loadPage('/messageTypes');
    },
    loadPageOrderRefunds() {
      this.loadPage('/orderRefunds');
    },
    loadPageOrdersAddresses(shopId) {
      this.loadPage('/orders/addresses', { shopId: shopId });
    },
    loadPageOrders(active) {
      this.loadPage('/orders', { active: active });
    },
    loadPageOrdersView(id) {
      this.loadPage('/orders/view', { orderId: id });
    },
    loadPageOrdersCreateFromCart(cartShop, isRx) {
      this.loadPage_p('/orders/create/fromCart', {
        cartShop: cartShop,
        isRx: isRx
      });
    },
    loadPageOrdersCreateFromShop(shopDrugOrderDTO) {
      this.loadPage_p('/orders/create/fromShop', {
        shopDrugOrderDTO: shopDrugOrderDTO
      });
    },
    loadPageRepositories(title, repositoryTypeId) {
      this.loadPage('/repositories', {
        title: title,
        repositoryTypeId: repositoryTypeId
      });
    },
    loadPageRepositoriesHome() {
      this.loadPage('/repositories/home');
    },
    loadPageRepositoriesView(id) {
      this.loadPage('/repositories/view', { id: id });
    },
    loadPageRepositoryTypes() {
      this.loadPage('/repositoryTypes');
    },
    loadPageRxs() {
      this.loadPage('/rxs');
    },
    loadPageRxsView(id, hideButton) {
      this.loadPage('/rxs/view', { rxId: id, hideButton: hideButton });
    },
    loadPageRxsShops(rxId, hospitalId) {
      this.loadPage('/rxs/shops', { rxId: rxId, hospitalId: hospitalId });
    },
    loadPageRxsShopsDrugs(rxId, item) {
      this.loadPage('/rxs/shops/drugs', {
        rxId: rxId,
        shopId: item.id,
        shopName: item.name,
        type: item.type
      });
    },
    loadPageShopDrugs(id) {
      this.loadPage('/shopDrugs', { shopDrugId: id });
    },
    loadPageShops() {
      this.loadPage('/shops');
    },
    loadPageShopsInfo(id) {
      this.loadPage('/shops/info', { shopId: id });
    },
    loadPageShopsView(id) {
      this.loadPage('/shops/view', { shopId: id });
    },
    loadPageShopsDrugs(shopId, typeId) {
      this.loadPageDrugs(typeId, '', shopId, 'SHOP_DRUG');
    }
  }
};
