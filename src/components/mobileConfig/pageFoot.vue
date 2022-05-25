<template>
    <div class="mobile-config">
        <Form ref="formInline">
            <div v-for="(item,key) in rCom" :key="key">
                <component :is="item.components.name" ref="childData" :configObj="configObj"
                           :configNme="item.configNme"></component>
            </div>
        </Form>
    </div>
</template>

<script>
    import toolCom from '@/components/mobileConfigRight/index.js'
    import rightBtn from '@/components/rightBtn/index.vue';
    import {mapMutations} from 'vuex'

    export default {
        name: 'pageFoot',
        cname: '底部菜单',
        components: {
            ...toolCom,
            rightBtn
        },
        data() {
            return {
                hotIndex: 1,
                configObj: {

                }, // 配置对象
                rCom: [
                    {
                        components: toolCom.c_status,
                        configNme: 'status'
                    },
                    {
                        components: toolCom.c_foot,
                        configNme: 'menuList'
                    },
                    {
                        components: toolCom.c_bg_color,
                        configNme: 'txtColor'
                    },
                    {
                        components: toolCom.c_bg_color,
                        configNme: 'activeTxtColor'
                    },
                    {
                        components: toolCom.c_bg_color,
                        configNme: 'bgColor'
                    },
                ] // 当前页面组件
            }
        },
        mounted() {
            this.configObj = this.$store.state.admin.mobildConfig.pageFooter
        },
        methods: {}
    }
</script>

<style scoped lang="stylus">
    .title-tips
        padding-bottom 10px
        font-size 14px
        color #333

        span
            margin-right 14px
            color #999
</style>
