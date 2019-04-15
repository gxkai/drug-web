<template>
  <div class="info-wrapper">
    <header>
          <span class="name">
            {{ rx.hospital }}
          </span>
      <span class="tag">
            普通处方
          </span>
    </header>
    <article>
      <div class="line">
        <span> NO：{{ rx.number }} </span>
        <span> 处方日期：{{ rx.rxDate | dateFmt("YYYY年MM月DD日") }} </span>
      </div>
      <div class="line">
        <span> 姓名：{{ account.name }} </span>
        <span> 电话：{{ rx.mobilePhone }} </span>
      </div>
      <div class="line">
        <span> 性别：{{ $t(account.gender) }} </span>
        <span> 年龄：{{ account.age }} </span>
      </div>
      <div class="line">
        <span> 门诊病历号：{{ rx.clinicNo }} </span>
        <span> 科别：{{ rx.office }} </span>
      </div>
      <div class="line1">
        <span> 地址：{{ rx.place }}111111111111111 </span>
      </div>
      <div class="line1">
        <span> 临床（初步）诊断：{{ rx.illness }} </span>
      </div>
    </article>
  </div>
</template>

<script>
  export default {
    props: {
      rx: {}
    },
    name: '',
    mixins: [],
    watch: {},
    computed: {},
    data() {
      return {};
    },
    created() {
    },
    mounted() {
    },
    methods: {}
  };
</script>

<style scoped type="text/scss" lang="scss">
  @mixin border {
    border-bottom: 1px solid #000000;
  }
  .info-wrapper {
    padding: 10px 15px;
    background-color: white;
    .line {
      display: flex;
      justify-content: space-between;
      margin-top: 50px;
      span {
        font-size: $size-small;
        color: $gray-light;
        @include border;
      }
    }

    .line1 {
      @include border;
      margin-top: 50px;
      span {
        font-size: $size-small;
        color: $gray-light;
      }
    }
    header {
      padding: 40px 0;
      position: relative;
      text-align: center;
      @include border;
      .name {
        letter-spacing: -2px;
        font-size: $size-large;
      }
      .tag {
        position: absolute;
        right: 18px;
        width: 60px;
        height: 51px;
        border: solid 1PX #ff0000;
        font-size: 22px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 24px;
        color: #ff0000;
      }
    }
  }
</style>
