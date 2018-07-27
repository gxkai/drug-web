<template>
  <div>
    <v-touch
      v-on:panstart="onPanStart(index)"
      v-on:panmove="onPanMove"
      v-on:panend="onPanEnd"
      v-for="(item, index) in list"
      :key="index"
    >
      <div class="wrap" :style="activeId === index ? swipe : ''">
        <div class="item">
          <div class="left">
            <input type="checkbox" :id="index">
            <label :for="index"></label>
            <img v-lazy="">
          </div>
          <div class="right">
            <p>{{item.shopName}}</p>
            <p>规格：{{item.spec}}</p>
            <div>
              <div>
                <span>¥{{item.price}}</span>
              </div>
              <div class="drug-num">
                <span>x{{item.quantity}}</span>
                <div class="drug-num-button">
                  <input  type="button" value="-" onclick="minus(index)">
                  <span>{{item.quantity}}</span>
                  <input type="button" value="+" onclick="plus(index)">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="remove" :ref="'remove' + index">
          <span>删除</span>
        </div>
      </div>
    </v-touch>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        swipe: '', // 滑动的样式
        wd: 0, // 编辑和删除按钮的宽度之和
        swipeWd: 0, // 已经滑动的距离
        activeId: '' // 实际是上一次的活动id,
      };
    },
    props: {
      list: {
        type: Array,
        default: []
      }
    },
    methods: {
      /**
       * 业务相关
       */
      minus(index) {
        this.list[index].quantity--;
      },
      /**
       * 滑动相关
       */
      onPanStart(id) {
        // 获取右侧按钮宽度
        let str = 'remove' + id;
        this.wd = this.$refs[str][0].offsetWidth;
        // 初始化
        if (this.activeId !== id) {
          this.swipe = 'transform:translateX(0px)';
          this.swipeWd = 0;
        }
        this.activeId = id;
      },
      onPanMove(event) {
        let deltaX = event.deltaX;
        // 组件向左移动直到最大距离
        if (deltaX < 0 && deltaX > -this.wd) { // 向左滑动
          this.swipe = 'transform:translateX(' + deltaX + 'px)';
          this.swipeWd = deltaX;
        }

        if (deltaX > 0 && deltaX <= this.wd && this.swipeWd < 0) { // 向右滑动
          let wx = deltaX + this.swipeWd;
          this.swipe = 'transform:translateX(' + wx + 'px)';
        }
      },
      onPanEnd(event) {
        // 判断向左移动的距离是否大于二分之一
        let deltaX = event.deltaX;
        if (deltaX < 0) {
          if (deltaX <= -this.wd) { // 向左滑动超过二分之一
            this.swipe = 'transform:translateX(' + (-this.wd) + 'px)';
            this.swipeWd = -this.wd;
          } else {
            this.swipe = 'transform:translateX(0px)';
            this.swipeWd = 0;
          }
        } else {
          if (this.swipeWd < 0 && deltaX >= this.wd) { // 向左滑动超过二分之一
            this.swipe = 'transform:translateX(0px)';
            this.swipeWd = 0;
          } else {
            this.swipe = 'transform:translateX(' + this.swipeWd + 'px)';
          }
        }
      }
    }
  };
</script>
<style scope>
  .wrap {
    width: 820px;
    transition: 0.2s ease 0s;
    display: flex;
    height: 215px;
  }

  .wrap .item {
    width: 720px;
    background-color: whitesmoke;
    display: flex;
  }

  .wrap .item .left {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 260px;
    height: 215px;
    justify-content: space-around;
    padding-right: 30px;
  }

  .wrap .item .left input {
    margin-right: 5px;
  }

  .wrap .item img {
    height: 200px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 1px 1px 1px rgba(102, 102, 102, 0.3);
  }

  input[type=checkbox] {
    visibility: hidden;
    clip: rect(0, 0, 0, 0);
  }
  input[type="checkbox"] + label::before {
    content: "\a0";
    display: inline-block;
    vertical-align: 22px;
    width: 29px;
    height: 29px;
    margin-right: 10px;
    border-radius: 20px;
    background-color: silver;
    text-indent: 9px;
    line-height: 19px;
  }
  input[type="checkbox"]:checked + label::before {
    content: "\2713";
    background-color: rgba(19,193,254,1);
    color: white;
  }


  .wrap .item .right {
    width: calc(720px - 260px);
    height: 215px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .wrap .item .right > p:nth-child(1) {
    font-size: 24px;
    font-family: HiraginoSansGB-W3;
    color: rgba(51, 51, 51, 1);
  }

  .wrap .item .right > p:nth-child(2) {
    font-size: 18px;
    font-family: HiraginoSansGB-W3;
    color: rgba(153, 153, 153, 1);
  }

  .wrap .item .right > div {
    display: flex;
    justify-content: space-between;
  }
  .wrap .item .right div:nth-child(1) {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    font-size: 24px;
    font-family: HiraginoSansGB-W3;
    color: rgba(255, 0, 0, 1);
  }

  .drug-num {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-right: 20px;
  }


  .drug-num-button {
    height: 30px;
  }
  .drug-num-button input {
    width: 50px;
    height:32px;
    background: white;
    border:1px solid #CCC;
    float: left;
  }
  .drug-num-button span {
    width: 50px;
    height: 30px;
    text-align: center;
    display:inline-block;
    border:1px solid #CCC;
    line-height: 30px;
    float: left;
  }

  .remove {
    width: 100px;
    height: 215px;
    background: rgba(19, 193, 254, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(255, 255, 255, 1);
    font-size: 24px;
    font-family: HiraginoSansGB-W3;
  }


</style>
