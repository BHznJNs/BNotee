<script>
import { h } from "vue"
import getNodeEl from "../mixin/getNodeEl"

export default {
    data() {
        return {
            initialContent: this.content,
            editing: false,
        }
    },
    inject: ["note", "selectedEl"],
    props: ["tagName", "content", "location"],
    mixins: [getNodeEl],
    computed: {
        selected() {
            return this.content.includes("*")
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

                this.getNodeEl({
                    location: this.location,
                    callback: (nodeArray, index) => { // 注：nodeArray[index] 相当于当前节点
                        if (this.selected) {
                            // 如果节点已被选择，取消选择
                            this.selectedEl.pop()
                            nodeArray[index][1] = nodeArray[index][1].slice(0, -1)
                        } else {
                            // 如果已有节点被选择
                            if (this.selectedEl.length) {
                                // 选取已被选择节点并取消选择
                                this.getNodeEl({
                                    location: this.selectedEl.pop(),
                                    callback: (nodeArray, index) => {
                                        nodeArray[index][1] = nodeArray[index][1].split("*")[0]
                                    }
                                })
                            }

                            this.selectedEl.push(this.location)
                            nodeArray[index][1] += "*"
                        }
                    }
                })
            },
            onClick: (e) => {
                // 储存修改前节点内容
                this.initialContent = e.target.innerText
                this.editing = true
            },
            onBlur: (e) => {
                let resultContent = e.target.innerText
                // 若节点中文本发生改变
                if (resultContent != this.initialContent) {
                    // 修改 this.note 数据
                    this.getNodeEl({callback: (nodeEl) => {
                        nodeEl[1] = resultContent
                    }})
                }
                this.editing = false
            }
            // 去除内容末尾 * 号
        }, this.content.split("*")[0])
    }
}
</script>