


export default {

    bind(el, binding) {
        // 获取iview-ui定义好的scroll盒子
        const selectWrap = el.querySelector('.ivu-table-body')
        selectWrap.addEventListener('scroll', function () {
            /*
             * scrollHeight 元素标签内容高度
             * scrollTop 获取元素滚动的偏移值,
             * clientHeight 元素标签的可见高度
             * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
             * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
             */
            let sign = 100
            const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
            if (scrollDistance <= sign) {
                binding.value()
            }
        })
    }


}
