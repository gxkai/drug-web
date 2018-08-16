<template>
  <div class="refund-box is-flex flex-row flex-item p-lr-20 position-relative">
    <span class="toc-tip position-absolute all-center" v-if="isOtc === true">非</span>
    <span class="toc-tip position-absolute all-center bg-2BB292" v-else>处</span>
    <img class="is-200x200" :src="getImgURL(fileId, 'LOGO')">
    <div class="box-right pl-40 is-flex flex-column flex-sa">
      <span>{{ drugName }}</span>
      <span>规格：{{ spec }}</span>
      <div class="is-flex flex-sb mt-20">
        <span class="text-red">&yen; {{price}}</span>
        <span>x {{quantity}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'drugs',
    props: {
      drugName: {
        default: '甲個按胶囊 夸信制药有限股份公司'
      },
      spec: {
        default: '20g/2板/盒'
      },
      quantity: {
        default: '1'
      },
      isOtc: {
        default: true
      },
      fileId: {
        default: 1
      },
      price: {
        default: 58.5
      }
    }
  };
</script>

<style scoped>
  .mt-20 {
    margin-top: 20px !important;
  }

  .is-flex {
    display: flex !important;
  }

  .flex-row {
    flex-direction: row;
  }

  .flex-column {
    flex-direction: column;
  }

  .flex-sa {
    justify-content: space-around;
  }

  .flex-sb {
    justify-content: space-between;
  }

  .flex-item {
    align-items: center;
  }

  .is-200x200 {
    width: 200px;
    height: 200px;
  }

  .p-lr-20 {
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
  }

  .box-right {
    width: 450px;
    height: 100px;
  }

  .pl-40 {
    padding-left: 40px !important;
  }

  /*处方标识*/
  .toc-tip {
    left: 5px;
    top: 5px;
    width: 50px;
    height: 30px;
    background: #bfbfbf;
    color: #666666;
    border-radius: 100px / 50px;
  }

  .all-center {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .bg-2BB292 {
    background: #2BB292;
    color: white;
  }

  .refund-box {
    width: 720px;
    height: 215px;
    background: rgba(246, 246, 246, 1);
  }

</style>
