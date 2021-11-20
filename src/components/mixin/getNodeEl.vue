<script>
export default {
    methods: {
        // 获取 节点所在数组 并执行回调函数
        getNodeEl({
                nodeEl=this.note,
                location,
                num=0,
                callback
        }) {
            if (num == location.length - 1) {
                // 调用回调函数返回节点节点所在数组 及 index
                if (callback) {
                    callback(nodeEl.contents, location[num])
                }
            }
            else {
                let num_ = num + 1
                this.getNodeEl({
                    nodeEl: nodeEl.contents[location[num]][1],
                    location: location,
                    num: num_,
                    callback: callback
                })
            }
        }
    }
}
</script>