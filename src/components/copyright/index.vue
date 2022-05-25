
<template>
  <GlobalFooter class="i-copyright" :links="links" :copyright="copyright" />
</template>
<script>
export default {
  name: 'i-copyright',
  data () {
    return {
      links: [
        {
          title: '',
          key: '官网',
          href: '',
          blankTarget: true
        },
        {
          title: '',
          key: '社区',
          href: '',
          blankTarget: true
        },
        {
          title: '',
          key: '文档',
          href: '',
          blankTarget: true
        }
      ],
      copyright: ''
    }
  },
  mounted () {
    this.getVersion();
  },
  methods: {
    getVersion () {
      // this.$store.dispatch('admin/db/get', {
      //     dbName: 'sys',
      //     path: 'user.info',
      //     user: true
      // }).then(res => {
      //     // this.copyright += res.version ? '  |  ' + res.version : '';
      //     return ''
      // })
      this.copyright += ""
    }
  }
}
</script>
<style lang="less">
.i-copyright {
  flex: 0 0 auto;
  z-index: 1;
}
</style>
