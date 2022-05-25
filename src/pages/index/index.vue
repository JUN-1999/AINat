<template>
  <div style="overflow: auto">
    <list :order_type="'大屏'" show="showItFalse"></list>
  </div>
</template>
<script>
import list from '@/pages/screen/index'

export default {
  name: 'screen',
  components: {
    list
  },
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
  },
  created () {
  }
}
</script>
<style scoped>
</style>