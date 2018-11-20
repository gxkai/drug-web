<template>
  <div class="version">
    <van-nav-bar
      :title="$route.name"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div
      class="version--content"
    >
      <div class="version--name">
        {{version.name}}
      </div>
      <div class="version--number">
        {{`版本:&nbsp;&nbsp;v${version.number}`}}
      </div>
    </div>
    <div
      class="version--footer">
      <div>{{projectInfo.copyright}}</div>
      <div>{{projectInfo.company}}</div>
    </div>
  </div>
</template>
<style scoped type="text/less" lang="less">
  .version {
    display: flex;
    flex-flow: column;
    height: 100vh;
    background-color: #f5f5f5;
    &--content {
      flex: 1;
      overflow: auto;
    }
    &--name {
      font-size:72px;
      font-family:HiraginoSansGB-W3;
      font-weight:normal;
      color:rgba(19,193,254,1);
      text-align: center;
      margin-top: 150px;
    }
    &--number {
      font-size:26px;
      font-family:HiraginoSansGB-W3;
      font-weight:normal;
      color:rgba(153,153,153,1);
      text-align: center;
    }
    &--footer {
      padding: 20px;
      &>div {
        text-align: center;
        font-size: 25px;
        color: #999999;
      }
    }
  }
</style>
<script>
  export default {
    data() {
      return {
        version: {
          name: '药品服务平台',
          number: '0.0'
        }
      };
    },
    computed: {
      projectInfo() {
        return this.$store.state.projectInfo;
      }
    },
    created() {
      this.$axios.get('/version')
        .then((res) => {
          this.version.number = res.data;
        })
        .catch(err => {
          this.exception(err);
        });
    }
  };
</script>
