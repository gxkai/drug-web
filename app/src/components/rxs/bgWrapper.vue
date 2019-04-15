<template>
  <header :style="{backgroundImage: `url(${backgroundImage})`}">
  <div class="wrapper">
    <img v-lazy="getImgURL(account.fileId, 'SMALL_LOGO')" />
    <div class="right">
      <div class="line1">
              <span class="name">
                {{ `${account.name}` }}
              </span>
        <span class="gender">
                {{ `${$t(account.gender)}` }}
              </span>
        <span class="age">
                {{ `${account.age}岁` }}
              </span>
      </div>
      <div class="line2">
              <span>
                {{ `${account.identityNumber}` }}
              </span>
      </div>
    </div>
  </div>
  </header>
</template>

<script>
  export default {
    name: '',
    mixins: [],
    watch: {},
    computed: {},
    data() {
      return {
        backgroundImage: require('@/assets/img/rxs/backgroundImage.png')
      };
    },
    created() {
    },
    mounted() {
    },
    methods: {}
  };
</script>

<style scoped type="text/scss" lang="scss">
  header {
    background-size: cover;
    height: 220px;
    position: relative;
    .wrapper {
      img {
        width: 112px;
        height: 112px;
        border-radius: 50%;
      }
      padding: 60px 95px;
      display: grid;
      grid-template-columns: auto 1fr;
      grid-column-gap: 20px;
      align-items: center;
      .right {
        .line1 {
          span {
            color: #fefefe;
          }
          .gender {
            margin-left: 10px;
          }
          .age {
            margin-left: 20px;
          }
        }
        .line2 {
          margin-top: 20px;
          span {
            color: #fefefe;
          }
        }
      }
    }
  }
</style>
