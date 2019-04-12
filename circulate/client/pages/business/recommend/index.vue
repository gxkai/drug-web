<template>
  <div class="recommend">
    <div class="recommend-wrap">
      <bread-crumb :path="$route.path"/>
      <div class="recommend-wrap__search">
        <el-input v-model="drugName" size="small" placeholder="药品名称" style="width: 200px;"></el-input>
        <!--选择厂商-->
        <el-button class="select-btn" v-if="originName" @click="originDialogVisible = true"size="small">{{ originName }}</el-button>
        <el-button class="select-btn" v-else @click="originDialogVisible = true" style="color: #C0C4CC;" size="small">请选择厂商</el-button>
        <!--当前状态-->
        <el-select v-model="stateValue" size="small" filterable placeholder="请选择" style="width: 200px">
          <el-option
            v-for="(item, index) in currentStateList"
            :key="index"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-date-picker
          size="small"
          :clearable="disClearable"
          style="width: 250px;margin:0 10px"
          v-model="dateValue"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="convertDate">
        </el-date-picker>
        <el-button type="primary" size="small">搜索</el-button>
        <el-button size="small" @click="clear">清空</el-button>

        <el-button type="primary" size="small" style="background:#108EE9" @click="addRecommend">添加</el-button>
        <el-button type="primary" size="small" style="background:#108EE9">批量添加</el-button>
      </div>

      <!--选择厂商-->
      <el-dialog
        title="厂商"
        :close-on-click-modal='isCloseOnClickModal'
        :visible.sync="originDialogVisible"
        width="50%">
        <drug-origin v-on:listenToChildEvent="getSelectedInfo"></drug-origin>
        <span slot="footer" class="dialog-footer">
        <el-button @click="originDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmSelectOrigin">确 定</el-button>
      </span>
      </el-dialog>

      <div class="recommend-wrap__list">
        <el-table :data="perPageData" border style="width: 100%">
          <el-table-column width="50px" label="序号">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>

          <el-table-column prop="drugName" label="药品名称"></el-table-column>
          <el-table-column prop="specName" label="药品规格"></el-table-column>
          <el-table-column prop="originName" label="生产厂商"></el-table-column>
          <el-table-column width="50px" prop="sales" label="销量"></el-table-column>
          <el-table-column width="65px" prop="price" label="销售价"></el-table-column>
          <el-table-column prop="applyDate" label="申请日期"></el-table-column>
          <el-table-column prop="startDate" label="展示开始时间"></el-table-column>
          <el-table-column prop="endDate"label="展示结束时间"></el-table-column>

          <el-table-column label="当前状态" width="80px">
            <template slot-scope="scope">
              <span>{{ $t(scope.row.applyState) }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="viewDetail(scope.$index, scope.row)" type="text">查看</el-button>

              <el-dropdown trigger="click"  v-if="scope.row.applyState==='PENDING'">
                <span class="el-dropdown-link">
                  更多
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <el-button type="text" @click="passAction(scope.$index, scope.row.id)">通过</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button type="text" @click="failAction(scope.$index, scope.row.id)">不通过</el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <el-dropdown trigger="click"  v-if="scope.row.applyState==='SUCCESS'">
                <span class="el-dropdown-link">
                  更多
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <el-button type="text" @click="moveShelf(scope.$index, scope.row.id)">提前下架</el-button>
                  </el-dropdown-item>

                </el-dropdown-menu>
              </el-dropdown>

              <el-dropdown trigger="click"  v-if="scope.row.applyState==='FAIL'">
                <span class="el-dropdown-link">
                  更多
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <el-button type="text" @click="failReason(scope.$index, scope.row.id)">查看不通过原因</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button type="text" @click="reSubmit(scope.$index, scope.row.id)">再次提交</el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <el-dropdown trigger="click" v-if="scope.row.applyState==='OVERDUE'">
                <span class="el-dropdown-link">
                  更多
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <el-button type="text" @click="deleteItem(scope.$index, scope.row.id)">删除</el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
          
        </el-table>

        <div class="pagination">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next, jumper, total"
            :total="totalPages">
          </el-pagination>
        </div>
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
  import Origin from '@/components/drugCheck/Origin'
  @Component({
    components: {
      BreadCrumb,
      'drug-origin': Origin
    }
  })
  export default class Recommend extends Vue {
    drugName = '' // 药品名称
  
    // 厂商
    originName = ''
    originId = ''
    isCloseOnClickModal = false
    originDialogVisible = false
    selectedInfo = '' // 子组件传过来的数据
    childData = [] // 暂存已选的数据

    // 状态
    stateValue = ''
    currentStateList = [
      {
        id: 'SUCCESS',
        name: '通过'
      },
      {
        id: 'FAIL',
        name: '不通过'
      },
      {
        id: 'OVERDUE',
        name: '过期'
      },
      {
        id: 'PENDING',
        name: '待审核'
      }
    ]
    dateValue = '' // 日期区间
    startDate = '' // 起始日期
    endDate = '' // 截止日期

    disClearable = false

    convertDate () {
      if (this.dateValue) {
        for (let i = 0, len = this.dateValue.length; i < len; i++) {
          this.dateValue[i] = moment(this.dateValue[i]).format('YYYY-MM-DD')
        }
        this.startDate = this.dateValue[0] + ' 00:00:00'
        this.endDate = this.dateValue[1] + ' 23:59:59'
      }
    }

    // 添加
    addRecommend () {
      this.$router.push('/business/recommend/create')
    }

    tableData = [] // 促销药品数据
    perPageData = [] // 存储每页显示的数据

    currentPage = 1 // 当前页
    pageSize = 15 // 每页显示条数
    totalPages = 0

    handleCurrentChange (page) {
      this.currentPage = page
      this.getRecommend()
    }

    beforeMount () {
      this.getRecommend()
    }

    // 获取每页数据
    getPerData () {
      this.perPageData = this.tableData
      this.perPageData = this.perPageData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    }

    async getRecommend () {
      let params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize
        // originName: this.produceName,
        // drugName: this.drugName.trim(),
        // state: this.stateValue,
        // startDate: this.startDate,
        // endDate: this.endDate
      }
      let {data: Recommend} = await axios.get(`/api/shop/drugRecommendApplies`, {params})
      console.log(Recommend)
      this.tableData = Recommend.list
      this.totalPages = Recommend.total
      this.tableData.forEach((item) => {
        item.applyDate = moment(item.applyDate).format('YYYY-MM-DD hh:mm:ss')
        item.startDate = moment(item.startDate).format('YYYY-MM-DD hh:mm:ss')
        item.endDate = moment(item.endDate).format('YYYY-MM-DD hh:mm:ss')
      })
      this.getPerData()
    }

    // 清空
    clear () {
      this.drugName = ''
      this.originName = ''
      this.stateValue = ''
      this.dateValue = ''
      this.startDate = ''
      this.endDate = ''
    }

    // 获取已选信息
    getSelectedInfo (data) {
      this.selectedInfo = data
    }
    // 选择厂商
    confirmSelectOrigin () {
      if (!this.selectedInfo) {
        this.originDialogVisible = false
        return
      }
      this.childData = this.selectedInfo
      this.originId = this.childData.id
      this.originName = this.childData.fullName
      this.originDialogVisible = false
    }
    //
  }
</script>

<style lang="scss" scoped>
  /deep/.recommend{
    padding: 0 10px;
    margin-bottom: 30px;
    &-wrap{
      min-height: 850px;
      background: #FFF;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #E9E9E9;

      &__search{
        display: flex;
        align-items: center;
        border-bottom: 1px solid #EEE;
        padding:0 15px 15px 15px;
        margin-bottom: 15px;
        .select-btn{
          min-width: 200px;
          text-align: left;
          margin:0 10px
        }
      }

      &__list{
        padding: 0 15px;
        .el-table{
          th{
            background-color: #F4F4F4;
            color: #555;
          }
          &__body {
            td{
              padding: 6px 0;
            }
          }
        }
        .pagination{
          margin: 30px 0;
          .el-pagination__total{
            float: right;
          }
        }
      }

      .cell {
        .el-button {
          font-size: 13px;
        }
        button:last-child {
          /*margin-left: 8px;*/
          &:before {
            content: '|';
            color: #EEE;
            position: relative;
            left: -4px;
            top: -1px;
          }
        }

        button:first-child {
          /*margin-right: 8px;*/
          &:before {
            display: none;
          }
        }

        .el-dropdown {
          font-size: 12px;
          color: #409eff;

          &:before {
            content: '|';
            color: #EEE;
            position: relative;
            left: -4px;
            top: -1px;
          }

          &-link {
            cursor: pointer;
            font-size: 13px;
          }

          .el-icon--right {
            margin-left: 0;
            color: #409eff;
          }
        }
      }

    }
  }
</style>


