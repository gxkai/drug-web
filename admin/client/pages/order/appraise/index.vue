<template>
  <div class="appraise-wrap">
    <div class="appraise">
      <bread-crumb :path="$route.path"/>

      <div class="appraise-con">
        <el-tabs v-model="activeTab" type="card">
          <el-tab-pane label="药店评价" name="first" class="shop-appraise">
            <div class="filter">
              <el-row :gutter="20">
                <el-col :span="5">
                  <el-select v-model="shopIdOfShopAppraise" size="small" filterable placeholder="药房名称">
                    <el-option
                      v-for="(item, index) in shopNameListOfShopAppraise"
                      :key="index"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="4">
                  <el-input v-model="buyerNameOfShopAppraise" size="small" placeholder="买家姓名"></el-input>
                </el-col>
                <el-col :span="6">
                  <el-date-picker
                    size="small"
                    :clearable="isClearable"
                    v-model="dateOfShopAppraise"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-col>
                <el-col :span="6" class="action-col">
                  <el-button size="small" type="primary" @click="searchShopAppraise">搜索</el-button>
                  <el-button size="small" @click="clearShopCondition">清空</el-button>
                </el-col>
              </el-row>
            </div>

            <div class="shop-appraise__list">
              <d2-crud
                :columns="shopAppraiseColumn"
                :data="shopAppraiseList"
                :pagination="shopAppraisePagination"
                @pagination-current-change="pageChangeOfShopAppraise"
                :options="optionData"
                :rowHandle="shopRowHandle"
                @row-remove="removeShopAppraise"/>
            </div>
          </el-tab-pane>

          <el-tab-pane label="药品评价" name="second" class="drug-appraise">
            <div class="filter">
              <el-row :gutter="20">
                <el-col :span="5">
                  <el-select v-model="shopIdOfDrugAppraise" size="small" filterable placeholder="药房名称">
                    <el-option
                      v-for="(item, index) in shopNameListOfDrugAppraise"
                      :key="index"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                    </el-select>
                  </el-col>
                <el-col :span="4">
                  <el-input v-model="drugNameValue" size="small" placeholder="药品名称"></el-input>
                </el-col>
                <el-col :span="4">
                  <el-input v-model="buyerNameOfDrugAppraise" size="small" placeholder="买家姓名"></el-input>
                </el-col>
                <el-col :span="6">
                  <el-date-picker
                    size="small"
                    :clearable="isClearable"
                    v-model="dateOfDrugAppraise"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-col>
                <el-col :span="5" class="action-col">
                  <el-button size="small" type="primary" @click="searchDrugAppraise">搜索</el-button>
                  <el-button size="small" @click="clearDrugCondition">清空</el-button>
                </el-col>
              </el-row>
            </div>

            <div class="drug-appraise__list">
              <d2-crud
                :columns="drugAppraiseColumn"
                :data="drugAppraiseList"
                :pagination="drugAppraisePagination"
                @pagination-current-change="pageChangeOfDrugAppraise"
                :loading="loading"
                :options="optionData"

                :rowHandle="drugRowHandle"
                @row-remove="removeDrugAppraise"
                @viewDetail-emit="viewDetail"/>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Component from 'class-component'
  import BreadCrumb from '@/components/Breadcrumb'
  import axios from 'axios'
  import moment from 'moment'

  @Component({
    components: {
      BreadCrumb
    }
  })
  export default class Appraise extends Vue {
    activeTab = 'first';
    isClearable = false

    // 药店名称下拉列表
    shopNameListOfShopAppraise = [];
    shopNameListOfDrugAppraise = [];

    // 获取所有药店名称选项
    async getShopNames () {
      let {data: option} = await axios.post(`/api/supervise/shops/filter`)
      this.shopNameListOfShopAppraise = option
      this.shopNameListOfDrugAppraise = option
    }

    /**
     * 药店评价信息
     */
    shopIdOfShopAppraise = ''
    buyerNameOfShopAppraise = ''
    dateOfShopAppraise = ''
    shopAppraiseStartDate = ''
    shopAppraiseEndDate = ''

    optionData= {
      border: true
    };

    shopAppraiseColumn = [
      {
        title: '药店名称',
        key: 'shopName'
      },
      {
        title: '买家姓名',
        key: 'buyerName'
      },
      {
        title: '配送评分',
        key: 'deliveryScore'
      },
      {
        title: '服务态度',
        key: 'serviceScore'
      },
      {
        title: '描述相符',
        key: 'describeScore'
      },
      {
        title: '包装评分',
        key: 'packageScore'
      },
      {
        title: '评价时间',
        key: 'appraiseDate'
      }
    ];

    shopAppraiseList = [];

    shopAppraisePagination = {
      currentPage: 1,
      pageSize: 15,
      total: 0
    };

    shopRowHandle = {
      remove: {
        text: '删除',
        type: 'text'
      }
    };

    pageChangeOfShopAppraise (page) {
      this.shopAppraisePagination.currentPage = page
      this.getShopAppraises()
    }

    // 清空
    clearShopCondition () {
      this.shopIdOfShopAppraise = ''
      this.buyerNameOfShopAppraise = ''
      this.dateOfShopAppraise = ''
      this.shopAppraiseStartDate = ''
      this.shopAppraiseEndDate = ''
    }

    // 删除
    async removeShopAppraise ({ index, row }, done) {
      await axios.delete(`/api/supervise/shopAppraises/${row.id}`)
      this.shopAppraisePagination.total -= 1
      setTimeout(() => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        done()
      }, 300)
    }

    convertDate () {
      if (this.dateOfShopAppraise) {
        for (let i = 0, len = this.dateOfShopAppraise.length; i < len; i++) {
          this.dateOfShopAppraise[i] = moment(this.dateOfShopAppraise[i]).format('YYYY-MM-DD')
        }
        this.shopAppraiseStartDate = this.dateOfShopAppraise[0] + ' 00:00:00'
        this.shopAppraiseEndDate = this.dateOfShopAppraise[1] + ' 23:59:59'
      }
    }

    // 搜索
    searchShopAppraise () {
      this.convertDate()
      this.getShopAppraises()
    }

    // 获取所有药店评价信息
    async getShopAppraises () {
      let params = {
        pageNum: this.shopAppraisePagination.currentPage,
        pageSize: this.shopAppraisePagination.pageSize,
        shopId: this.shopIdOfShopAppraise,
        buyerName: this.buyerNameOfShopAppraise.trim(),
        start: this.shopAppraiseStartDate,
        end: this.shopAppraiseEndDate
      }

      let {data: shopRes} = await axios.get(`/api/supervise/shopAppraises`, {params})

      this.shopAppraiseList = shopRes.list
      this.shopAppraisePagination.total = shopRes.total

      this.shopAppraiseList.forEach(item => {
        item.appraiseDate = moment(item.appraiseDate).format('YYYY-MM-DD hh:mm:ss')
      })
    }

    /**
     * 药品评价信息
     */

    shopIdOfDrugAppraise = ''
    buyerNameOfDrugAppraise = ''
    drugNameValue = ''
    dateOfDrugAppraise = ''
    drugAppraiseStartDate = ''
    drugAppraiseEndDate = ''

    drugAppraiseColumn = [
      {
        title: '药房名称',
        key: 'shopName'
      },
      {
        title: '药品名称',
        key: 'drugName'
      },
      {
        title: '药品规格',
        key: 'spec'
      },
      {
        title: '买家姓名',
        key: 'buyerName'
      },
      {
        title: '药品评分',
        key: 'score'
      },
      {
        title: '评价内容',
        key: 'content'
      },
      {
        title: '评论时间',
        key: 'appraiseDate'
      }
    ];

    drugAppraiseList = [];

    loading = false;
    drugAppraisePagination = {
      currentPage: 1,
      pageSize: 15,
      total: 0
    };

    drugRowHandle = {
      custom: [
        {
          text: '查看详情',
          type: 'text',
          class: 'viewBtn',
          emit: 'viewDetail-emit'
        }
      ],
      remove: {
        text: '删除',
        type: 'text'
      }
    };

    pageChangeOfDrugAppraise (page) {
      this.drugAppraisePagination.currentPage = page
      this.getDrugAppraises()
    }

    // 清空
    clearDrugCondition () {
      this.shopIdOfDrugAppraise = ''
      this.buyerNameOfDrugAppraise = ''
      this.drugNameValue = ''
      this.dateOfDrugAppraise = ''
      this.drugAppraiseStartDate = ''
      this.drugAppraiseEndDate = ''
    }

    // 搜索
    searchDrugAppraise () {
      if (this.dateOfDrugAppraise) {
        for (let i = 0, len = this.dateOfDrugAppraise.length; i < len; i++) {
          this.dateOfDrugAppraise[i] = moment(this.dateOfDrugAppraise[i]).format('YYYY-MM-DD')
        }

        this.drugAppraiseStartDate = this.dateOfDrugAppraise[0] + ' 00:00:00'
        this.drugAppraiseEndDate = this.dateOfDrugAppraise[1] + ' 23:59:59'
      }

      this.getDrugAppraises()
    }

    // 删除
    async removeDrugAppraise ({ index, row }, done) {
      await axios.delete(`/api/supervise/drugAppraises/${row.id}`)
      this.drugAppraisePagination.total -= 1
      setTimeout(() => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        done()
      }, 300)
    }

    // 获取所有药品评价信息
    async getDrugAppraises () {
      let params = {
        pageNum: this.drugAppraisePagination.currentPage,
        pageSize: this.drugAppraisePagination.pageSize,
        shopId: this.shopIdOfDrugAppraise,
        drugName: this.drugNameValue.trim(),
        buyerName: this.buyerNameOfDrugAppraise.trim(),
        start: this.drugAppraiseStartDate,
        end: this.drugAppraiseEndDate
      }

      let {data: drugRes} = await axios.get(`/api/supervise/drugAppraises`, {params})
      console.log(drugRes)

      this.drugAppraiseList = drugRes.list
      this.drugAppraisePagination.total = drugRes.total

      this.drugAppraiseList.forEach(item => {
        item.appraiseDate = moment(item.appraiseDate).format('YYYY-MM-DD hh:mm:ss')
      })
    }

    // 查看详情处理方法
    viewDetail ({row}) {
      this.$router.push({
        path: '/order/appraise/detail',
        query: {
          id: row.id
        }
      })
    }

    mounted () {
      this.getShopAppraises()
      this.getDrugAppraises()
      this.getShopNames()
    }
  }
</script>

<style lang="scss">
  .appraise-wrap{
    padding: 20px;

    .el-table {
      th {
        background-color: #F4F4F4;
        color: #555;
      }
    }

    .appraise{
      min-height: 850px;
      background: #FFF;
      border-radius: 5px;
      border: 1px solid #E9E9E9;
      padding: 20px;

      .el-select{
        width: 100%;
      }

      .drug-appraise__list{
        .cell{
          button:last-child:before{
            content: '|';
            color: #EEE;
            position: relative;
            left: -6px;
            top: -1px;
          }
        }
      }
    }
  }
</style>
