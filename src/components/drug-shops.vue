<template>
  <div class="refund-box is-flex flex-row flex-item p-lr-20 position-relative">
    <span class="toc-tip position-absolute all-center" v-if="isOtc === true">非处</span>
    <span class="toc-tip position-absolute all-center bg-2BB292" v-else>处</span>
    <img class="is-200x200" :src="getImgURL(fileId, 'LOGO')">
    <div class="box-right pl-40 is-flex flex-column flex-sa">
      <span class="text-666666">{{ drugName }}</span>
      <span class="text-666666">{{ sfda }}</span>
      <div class="is-flex flex-sb mt-20">
        <div class="text-666666"><span class="text-red">&yen; {{price}}</span> 起</div>
        <div class="text-666666"><span class="text-13C1FE">{{count}}</span>个商家在售</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'drug-shops',
    props: {
      drugName: {
        default: '甲個按胶囊 夸信制药有限股份公司'
      },
      sfda: {
        default: '国药准字号H20051424'
      },
      count: {
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
  .mt-20{
    margin-top: 20px !important;
  }
  .is-flex{
    display: flex !important;
  }
  .flex-row{
    flex-direction: row;
  }
  .flex-column{
    flex-direction: column;
  }
  .flex-sa{
    justify-content: space-around;
  }
  .flex-sb{
    justify-content: space-between;
  }

  .flex-item{
    align-items: center;
  }
  .is-200x200{
    width: 200px;
    height: 200px;
  }
  .p-lr-20{
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
  }
  .box-right{
    width: 450px;
    height: 100px;
  }

  .pl-40{
    padding-left: 40px !important;
  }
  /*处方标识*/
  .toc-tip{
    left: 5px;
    top: 5px;
    width:50px;
    height:30px;
    background:#bfbfbf;
    color:#666666;
    border-radius:100px / 50px;
  }
  .all-center{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .bg-2BB292{
    background: #2BB292;
    color: white;
  }
  .refund-box{
    width:720px;
    height:215px;
    background: white;
  }

</style>
