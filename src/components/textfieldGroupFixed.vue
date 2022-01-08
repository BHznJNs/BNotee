<template>
    <div
        class="textfield-group fixed-component fixed"
        :class="{ 'disabled': !isInputting }"
    >
        <select class="selector" ref="selector">
            <option value="h">标题</option>
            <option value="p"
                v-show="commandFrom != 'list' && selectedNode.tagName != 'li'"
            >段落</option>
            <option value="hr">割线</option>
            <option value="floor"
                v-show="commandFrom != 'list' && selectedNode.tagName != 'li'"
            >层次</option>
            <option value="ol">序列</option>
            <option value="ul">乱列</option>
            <option value="li"
                v-show="commandFrom == 'list' || selectedNode.tagName == 'li'"
            >列项</option>
            <option value="table">表格</option>
        </select>
        <div
            class="textfield"
            contenteditable="true"
            ref="inputter"
        ></div>
        <div
            class="textfield-closer closer"
            @click="closeTextfield"
        >
            <i class="material-icons">close</i>
        </div>
    </div>
</template>

<script>
import EventBus from "../common/EventBus"
import nodeObjReturner from "./mixin/nodeObjReturner"

export default {
    data() {
        return {
            isInputting: false,
            commandFrom: ""
        }
    },
    inject: ["selectedNode"],
    mixins: [nodeObjReturner],
    mounted() {
        EventBus.on("textfield-open", (from) => {
            this.commandFrom = from
            this.isInputting = true
            this.$refs.inputter.focus()
            EventBus.emit("note-offset")
        })
        EventBus.on("textfield-close", this.close)
        EventBus.on("colors-open", this.close)
    },
    methods: {
        close() {
            this.isInputting = false
            EventBus.emit("textfield-return")
        },
        // 方法：关闭文本框，并将值返回给父节点
        closeTextfield() {
            this.isInputting = false
            // 获取对应数据
            const tagName = this.$refs.selector.value
            const content = this.$refs.inputter.innerText
            // 定义返回对象
            const returnObj = this.returnObj(tagName, content)
            // 传值
            EventBus.emit("textfield-return-" + this.commandFrom, returnObj)
            EventBus.emit("textfield-return")

            this.$refs.inputter.blur()
            this.$refs.inputter.innerText = ""
        }
    }
}
</script>
