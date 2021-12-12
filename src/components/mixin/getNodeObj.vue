<script>
export default {
    mounted() {
        if (this.location) {
            this.getNodeObj({
                location: this.location,
                callback: (nodeArray, index) => {
                    this.nodeObj = nodeArray[index]
                }
            })
        }
    },
    methods: {
        // 获取 节点所在数组 并执行回调函数
        getNodeObj({
                parentObj=this.note,
                location,
                num=0,
                callback
        }) {
            if (num == location.length - 1) {
                // 调用回调函数返回 节点所在数组 及 index
                if (callback) {
                    callback(parentObj.CTS, location[num])
                    //       nodeArray   index
                    // 注：nodeArray[index] 相当于当前节点
                }
            }
            else {
                this.getNodeObj({
                    parentObj: parentObj.CTS[location[num]],
                    location: location,
                    num: num + 1,
                    callback: callback
                })
            }
        }
    }
}
</script>
