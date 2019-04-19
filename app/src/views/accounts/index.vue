<template>
  <div>
    <new-layout>
      <template slot="center"
        ><header-wrapper />
        <div class="cell-wrapper">
          <info-cell
            v-for="(item, index) in cells"
            :key="index"
            :title="item.name"
            :left-icon="item.icon"
            is-link
            @click.native="$router.push(item.url)"
          />
        </div>
      </template>
      <template slot="bottom">
        <new-footer-entry :value="4" />
      </template>
    </new-layout>
  </div>
</template>
<style type="text/scss" lang="scss">
.cell-wrapper {
  margin-top: 50px;
  .name {
    font-size: $size-small;
    color: $gray-light;
    margin-left: 10px;
  }
}
</style>

<script>
import infoCell from '@/components/accounts/infoCell';
import headerWrapper from '@/components/accounts/headerWrapper';
export default {
  components: {
    infoCell,
    headerWrapper
  },
  data() {
    return {
      cells: [
        {
          icon: 'wo-',
          name: '我的医保',
          url: '/accounts/info'
        },
        {
          icon: 'qian-',
          name: '医保账单',
          url: '/insurances/consume'
        },
        {
          icon: 'dingwei-',
          name: '我的地址',
          url: '/addresses'
        },
        {
          icon: 'shoucang-',
          name: '我的收藏',
          url: '/collects'
        },
        // {
        //   icon: 'dingdan-',
        //   name: '我的退单',
        //   url: '/orderRefunds'
        // },
        {
          icon: 'changjianwenti-',
          name: '常见问题',
          url: '/faqs'
        },
        {
          icon: 'yijianfankui-',
          name: '意见反馈',
          url: '/feedbacks'
        }
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
