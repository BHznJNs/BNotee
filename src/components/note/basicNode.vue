<script>
import { h } from "vue"
import getNodeObj from "../mixin/getNodeObj"
import EventBus from "../../common/EventBus"

export default {
    data() {
        return {
            initialContent: this.content,
            editing: false,
        }
    },
    inject: ["note", "selectedNode"],
    props: [
        "tagName", "content",
        "location", "selected",
        "color"
    ],
    mixins: [getNodeObj],
    computed: {
        fontColor() {
            if (!this.color) {
                // 默认文字颜色
                return "#333"
            } else {
                return this.color
            }
        }
    },
    methods: {
        // 方法：右键节点时，触发选择节点事件
        selectEvent() {
            if (this.selected) {
                // 关闭全局输入组 及 改色器
                EventBus.emit("textfield-close")
                EventBus.emit("colors-close")
                // 如果节点已被选择，取消选择
                this.selectedNode.location = null
                this.selectedNode.type = null
                this.selectedNode.tagName = null

                this.getThisObj.SL = false
            } else {
                // 如果已有节点被选择
                if (this.selectedNode.location) {
                    // 选取已被选择节点并取消选择
                    this.getNodeObj({
                        location: this.selectedNode.location,
                        callback: (nodeArray, index) => {
                            nodeArray[index].SL = false
                        }
                    })
                }

                this.selectedNode.location = this.location
                this.selectedNode.type = "basic-node"
                this.selectedNode.tagName = this.tagName

                this.getThisObj.SL = true
            }
        }
    },
    render() {
        return h(this.tagName, {
            contentEditable: this.tagName != 'hr',
            class: {
                "selected": this.selected,
                "editing": this.editing,
                "empty": !this.content
            },
            style: {
                "color": this.fontColor
            },
            onContextmenu: (e) => {
                e.preventDefault()
                this.selectEvent()
            },
            onClick: (e) => {
                // 储存修改前节点内容
                this.initialContent = e.target.innerText
                this.editing = true
            },
            onchange: () => {
                console.log("changed")
            },
            onBlur: (e) => {
                const resultContent = e.target.innerText
                // 若节点中文本发生改变
                if (resultContent != this.initialContent) {
                    // 修改 this.note 中对应对象数据
                    this.getThisObj.CT = resultContent
                }
                this.editing = false
            }
            // 去除内容末尾 * 号
        }, this.content)
    }
}
</script>