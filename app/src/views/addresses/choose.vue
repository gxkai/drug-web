<template>
  <new-layout>
    <template slot="center">
      <new-white-space />
      <location-container
        :center="center"
        @click-left="setPosition(center)"
        @click-right="resetLocation()"
      />
      <new-white-space />
      <rec-container @click-item="setPosition" />
      <new-white-space />
      <nearbyContainer
        :nearby-addresses="nearbyAddresses"
        @click-item="setPosition"
      />
    </template>
  </new-layout>
</template>
<style type="text/scss" lang="scss"></style>
<script>
import locationContainer from '@/components/addresses/locationContainer';
import recContainer from '@/components/addresses/recContainer';
import nearbyContainer from '@/components/addresses/nearbyContainer';

export default {
  name: '',
  components: {
    locationContainer,
    recContainer,
    nearbyContainer
  },
  mixins: [],
  data() {
    return {
      nearbyAddresses: [],
      center: {}
    };
  },
  computed: {},
  watch: {
    async center(n) {
      this.nearbyAddresses = await this.getNearbyPosition(n);
    }
  },
  created() {},
  mounted() {
    this.getLocation();
  },
  methods: {
    setPosition(item) {
      const position = {
        name: item.name,
        lat: item.lat || item.location.lat,
        lng: item.lng || item.location.lng
      };
      this.setCurrentAddress(position);
      this.loadPageHome();
    },
    async getLocation() {
      this.center = this.currentAddress;
    },
    async resetLocation() {
      this.$toast.loading({ forbidClick: true, duration: 0 });
      this.center = await this.getCurrentPosition();
    }
  }
};
</script>
