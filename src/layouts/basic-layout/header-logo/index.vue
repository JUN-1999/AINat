<template>
  <i-link
    class="i-layout-header-logo"
    :class="[
      { 'i-layout-header-logo-stick': !isMobile },
      { small_logo: menuCollapse },
    ]"
    to="/admin/home/"
  >
    <img v-if="isMobile" />
    <img v-else-if="headerTheme === 'light'" />
    <img v-else-if="menuCollapse" alt="" />
    <img v-else />
  </i-link>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: 'iHeaderLogo',
  computed: {
    ...mapState('admin/layout', [
      'isMobile',
      'headerTheme',
      'menuCollapse'
    ])
  },
  data () {
    return {
      logo: require('@/assets/images/logo.png'),
      logoSmall: require('@/assets/images/logo-small.png')
    };
  },
  mounted () {
    this.getLogo();
  },
  methods: {
    getLogo () {
      this.$store.dispatch('admin/db/get', {
        dbName: 'sys',
        path: 'user.info',
        user: true
      }).then(res => {
        this.logo = res.logo ? res.logo : this.logo;
        console.log(this.logo)
        this.logoSmall = res.logoSmall ? res.logoSmall : this.logoSmall;
      });
    }
  }
}
</script>
<style scoped>
.i-layout-header-logo-stick.small_logo {
  width: 80px;
}
</style>
