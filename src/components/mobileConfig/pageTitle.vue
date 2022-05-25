<template>
    <div class="box">
        <div class="c_row-item">
            <Col class="label" span="4">
                页面标题
            </Col>
            <Col span="19" class="slider-box">
                <Input v-model="value" placeholder="选填不超过10个字" maxlength="10" @on-change="changVal" />
            </Col>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "pageTitle",
        data(){
            return {
                value:''
            }
        },
        created() {
            this.value = this.$store.state.admin.mobildConfig.pageTitle
        },
        methods:{
            changVal(val){
                this.$store.commit('admin/mobildConfig/UPTITLE',val.target.value)
            }
        }
    }
</script>

<style scoped>
.c_row-item{
    padding: 22px 15px;
}
</style>
