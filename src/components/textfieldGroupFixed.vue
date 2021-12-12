<template>
    <div
        class="textfield-group fixed shadow-3"
        :class="{ 'disabled': !isInputting }"
    >
        <select class="selector">
            <option value="h">标题</option>
            <option value="p">段落</option>
            <option value="floor">层次</option>
        </select>
        <div class="textfield" contenteditable="true"></div>
        <div
            class="textfield-closer closer"
            @click="closeTextfield($event)"
        >
            <i class="material-icons">close</i>
        </div>
    </div>
</template>

<script>
import EventBus from "../common/EventBus"

export default {
    data() {
        return {
            isInputting: false,
            commandFrom: ""
        }
    },
    mounted() {
        EventBus.on("textfield-open", (from) => {
            this.commandFrom = from
            this.isInputting = true
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
        closeTextfield(e) {
            this.isInputting = false
            // 获取对应元素
            let el = e.target
            let selector = el.parentNode.children[0]
            let textfield = el.parentNode.children[1]

            let tagName = selector.value
            let content = textfield.innerText
            // 定义返回对象
            let returnObj = {
                NT: tagName,
                SL: false
            }
            if (["floor"].includes(tagName)) {
                returnObj.CTS = []
            } else if (!content) {
                returnObj = null
            } else {
                returnObj.CL = null
                returnObj.CT = textfield.innerText
            }
            // 传值
            EventBus.emit("textfield-return-" + this.commandFrom, returnObj)
            EventBus.emit("textfield-return")

            textfield.blur()
            textfield.innerText = ""
        }
    }
}
</script>
