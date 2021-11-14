<script>
import { h } from "vue"

export default {
    data() {
        return {
            // tagName_: "",
            initialContent: this.content,
            editing: false,
        }
    },
    inject: ["note", "selectedEl"],
    props: ["tagName", "content", "location"],
    // created() {
    //     // 若输入标签名为 ‘h’，则与输入 level 组为标签名
    //     // if (this.tagName == "h") {
    //     //     if (this.level <= 6) {
    //     //         this.tagName_ = "h" + this.level
    //     //     } else {
    //     //         this.tagName_ = "h6"
    //     //     }
    //     // //         若元素被选中
    //     // } else 
    //     if (this.tagName.includes("*")) {
    //         this.tagName_ = this.tagName.split("*")[0]

    //     } else {
    //         this.tagName_ = this.tagName
    //     }
    // },
    computed: {
        selected() {
            return this.content.includes("*")
        }
    },
    methods: {
        // 函数：获取 节点元素 并执行回调函数
        getNodeEl({
                nodeEl=this.note,
                location=this.location,
                num=0,
                callback
        }) {
            if (num == location.length - 1) {
                // 调用回调函数返回节点元素
                if (callback) {
                    callback(nodeEl.contents[location[num]])
                }
            }
            else {
                let num_ = num + 1
                // 递归调用自身
                this.getNodeEl({
                    nodeEl: nodeEl.contents[location[num]][1],
                    location: location,
                    num: num_,
                    callback: callback
                })
            }
        }
    },
    render() {
        return h(this.tagName, {
            contentEditable: true,
            class: {
                "selected": this.selected,
                "editing": this.editing
            },
            onContextmenu: (e) => {
                e.preventDefault()

                this.getNodeEl({callback: (nodeEl) => {
                    if (this.selected) {
                        // 如果元素已被选择，取消选择
                        this.selectedEl.pop()
                        nodeEl[1] = nodeEl[1].split("*")[0]
                    } else {
                        // 如果已有元素被选择
                        if (this.selectedEl.length) {
                            // 选取已被选择元素并取消选择
                            this.getNodeEl({
                                location: this.selectedEl.pop(),
                                callback: (nodeEl_) => {
                                    nodeEl_[1] = nodeEl_[1].split("*")[0]
                                }
                            })
                        }

                        this.selectedEl.push(this.location)
                        nodeEl[1] += "*"
                    }
                }})
            },
            onClick: (e) => {
                // 储存修改前元素内容
                this.initialContent = e.target.innerText
                this.editing = true
            },
            onBlur: (e) => {
                let resultContent = e.target.innerText
                // 若元素中文本发生改变
                if (resultContent != this.initialContent) {
                    // 修改 this.note 数据
                    this.getNodeEl({callback: (nodeEl) => {
                        nodeEl[1] = resultContent
                    }})
                }
                this.editing = false
            }
        }, this.content.split("*")[0])
    }
}
</script>