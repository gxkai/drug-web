<template>
  <div class="hospital-view">
    <van-nav-bar
      :title="hospitalInfo.name"
      left-arrow
      @click-left="$router.go(-1)"
      ref="header"
    />
    <div class="hospital-view__content"
         ref="content">
        <img v-lazy="getImgURL(hospitalInfo.fileId,'LARGE_LOGO')"
        class="hospital-view__content__logo">
      <div class="hospital-view__content__title">
        <div>医院介绍</div>
      </div>
      <div class="hospital-view__content__introduction" v-text="hospitalInfo.introduction">
      </div>
      <van-cell icon="dianhua" :title="'电话:' + hospitalInfo.name"
                class="mt-l-20"/>
      <van-cell icon="weizhi" :title="'地址:' + hospitalInfo.address"
                class="mt-l-20"/>
    </div>
  </div>
</template>
<style scoped type="text/scss" lang="scss">
  .hospital-view {
    background-color: #f5f5f5;
    &__content {
      &__logo {
        width: 700px;
        height: 400px;
        margin: 20px 10px;
      }
      &__title {
        text-align: center;
        div {
          font-size: 30px;
          color: $themeColor;
          font-family:MicrosoftYaHei;
          font-weight:400;
          position: relative;
          &:before, &:after {
            background: #DCDCDC;
            content: "";
            height: 1PX;
            position: absolute;
            top: 50%;
            width: 166px;
          }
          &:before {
            left: 110px;
          }
          &:after {
            right: 110px;
          }
        }
      }
      &__introduction {
        background-color: white;
        margin: 20px 0;
        padding: 20px;
        color: #666666;
        font-family:MicrosoftYaHei;
        font-weight:400;
        word-wrap: break-word;
        font-size: 25px;
      }
    }
  }
</style>
<script>
  export default {
    name: 'about',
    data() {
      return {
        shopId: this.$route.params.shopId,
        hospitalInfo: {
          fileId: '',
          name: '',
          phone: '',
          address: ''
        }
      };
    },
    created() {
      this.$axios.get('/hospitals/' + this.shopId)
        .then(res => {
          this.hospitalInfo = res.data;
          console.log(res.data);
        })
        .catch(err => {
          this.exception(err);
        });
    },
    mounted() {
      this.$refs.content.style.height = (document.documentElement.clientHeight - this.$refs.header.$el.clientHeight
      ) + 'px';
      this.$refs.content.style.overflow = 'auto';
    }
  };
</script>
