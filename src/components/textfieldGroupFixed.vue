<template>
    <div
        class="textfield-group fixed shadow-3"
        :class="{ 'disabled': !isInputting }"
        tabindex="999"
    >
        <select class="selector">
            <option value="h">标题</option>
            <option value="p">段落</option>
            <option value="floor">层次</option>
        </select>
        <div class="textfield" contenteditable="true"></div>
        <button
            class="textfield-closer"
            @click="closeTextfield($event)"
        >
            <i class="material-icons">close</i>
        </button>
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
        EventBus.on("open-textfield", (from) => {
            this.commandFrom = from
            this.isInputting = true
        })
    },
    methods: {
        // 关闭文本框，并将值返回给父节点
        closeTextfield(e) {
            this.isInputting = false
            // 获取对应元素
            let el = e.target
            let selector = el.parentNode.children[0]
            let textfield = el.parentNode.children[1]
            // 获取返回值
            let tagName = selector.value
            let content = textfield.innerText
            if (tagName == "floor") {
                content = {level: null, contents: []}
            }
            // 传值
            EventBus.emit(
                "textfield-return-" + this.commandFrom, {
                    NT: tagName,
                    CT: content,
                    CL: null,
                    SL: false
                }
            )
            EventBus.emit("textfield-return")

            textfield.blur()
            textfield.innerText = ""
        }
    }
}
</script>
