<template>
    <div>
        <div class="i-layout-page-header">
            <PageHeader class="product_tabs" title="附件管理" hidden-breadcrumb></PageHeader>
        </div>
        <Card :bordered="false" dis-hover class="ivu-mt">
            <div class="box">
                <upload-file></upload-file>
            </div>
        </Card>
    </div>
</template>
<script>
    import uploadFile from '@/components/uploadPictures/index'
    export default {
        components: { uploadFile },
        name: 'system_file',
        mounted () {

        },
        methods: {}
    }
</script>
<style scoped lang="stylus">
    .box {
        width :100%; background: #fff;
    }
</style>
