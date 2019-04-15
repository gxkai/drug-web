﻿<template>
  <div>
    <new-layout>
      <template slot="center">
        <headerWrapper />
        <entry-wrapper />
        <notice-wrapper />
        <new-white-space />
        <discount-wrapper />
        <new-white-space />
        <horizon-wrapper />
        <new-white-space />
        <right-wrapper />
        <new-white-space />
        <left-wrapper />
        <recommend-wrapper />
        <new-white-space />
      </template>
      <template slot="bottom">
        <new-footer-entry :value="0" />
      </template>
    </new-layout>
    <new-consult />
  </div>
</template>
<style scoped type="text/scss" lang="scss"></style>

<script>
import leftTitle from '@/components/home/leftTitle';
import centralTitle from '@/components/home/centralTitle';
import noticeWrapper from '@/components/home/noticeWrapper';
import entryWrapper from '@/components/home/entryWrapper';
import headerWrapper from '@/components/home/headerWrapper';
import discountWrapper from '@/components/home/discountWrapper';
import horizonWrapper from '@/components/home/horizonWrapper';
import rightWrapper from '@/components/home/rightWrapper';
import leftWrapper from '@/components/home/leftWrapper';
import recommendWrapper from '@/components/home/recommendWrapper';

export default {
  name: 'Home',
  components: {
    leftTitle,
    centralTitle,
    noticeWrapper,
    entryWrapper,
    headerWrapper,
    discountWrapper,
    horizonWrapper,
    rightWrapper,
    leftWrapper,
    recommendWrapper
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
